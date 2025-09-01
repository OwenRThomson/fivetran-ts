import { FivetranApiRequest } from "../FivetranClient";
import { NetworkResult } from "../../utils/networkFetch";

export interface ResyncConnectionDataRequest {
  scope?: {
    schema?: string[];
  };
}

export async function resyncConnectionData(
  makeRequest: FivetranApiRequest,
  connectionId: string,
  params?: ResyncConnectionDataRequest
): Promise<NetworkResult<ResyncConnectionDataRequest>> {
  return makeRequest<ResyncConnectionDataRequest>(
    `/connections/${connectionId}/resync`,
    {
      method: "POST",
      ...(params && { body: JSON.stringify(params) }), //must be non-empty if provided. If not provided, all schemas and tables of the connection are re-synced.
    }
  );
}
