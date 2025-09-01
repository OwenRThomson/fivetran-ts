import { fetchWithErrorHandling, NetworkResult } from "../utils/networkFetch";
import { FivetranClientOptions } from "../types/ClientOptions";
import { Base64 } from "js-base64";
import { connections } from "./connections";

export class FivetranAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "FivetranAPIError";
  }
}

export type FivetranApiRequest = <T>(
  endpoint: string,
  options?: RequestInit
) => Promise<NetworkResult<T>>;

export class FivetranClient {
  private apiKey: string;
  private apiSecret: string;
  private baseURL: string;
  private credentials: string;

  constructor(options: FivetranClientOptions) {
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
    this.baseURL = options.baseURL || "https://api.fivetran.com/v1";

    if (!this.apiKey || !this.apiSecret) {
      throw new Error("Fivetran API key and secret are required");
    }

    this.credentials = Base64.encode(`${this.apiKey}:${this.apiSecret}`);
  }

  private getHeaders(): Record<string, string> {
    return {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Basic ${this.credentials}`,
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<NetworkResult<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    const result = await fetchWithErrorHandling<any>(url, requestOptions);

    if (result.error) {
      return {
        data: null,
        error: result.error,
      };
    }

    // If there's no data portion, just return nothing
    if (!result.data) {
      return {
        data: undefined as unknown as T,
        error: null,
        status: result.status,
      };
    }

    // Extract the data portion from the Fivetran response
    const responseData = result.data;
    const actualData = responseData?.data ?? responseData;
    const code = responseData?.code;
    const message = responseData?.message;

    return {
      data: actualData as T,
      error: null,
      status: result.status,
      code,
      message,
    };
  }

  /**
   * @link https://fivetran.com/docs/rest-api/api-reference/connections
   */
  connection = connections(this.makeRequest.bind(this));
}
