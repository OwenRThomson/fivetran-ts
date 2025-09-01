import { NetworkResult } from "../../utils/networkFetch";
import { FivetranApiRequest } from "../FivetranClient";

export interface SyncConnectionDataRequest {
  force?: boolean;
}

export interface SyncConnectionDataResponse {
  code: string;
  message?: string;
}

export async function syncConnectionData(
  makeRequest: FivetranApiRequest,
  connectionId: string,
  params: SyncConnectionDataRequest = {}
): Promise<NetworkResult<SyncConnectionDataResponse>> {
  return makeRequest<SyncConnectionDataResponse>(
    `/connections/${connectionId}/sync`,
    {
      method: "POST",
      headers: {
        accept: "application/json;version=2",
        "content-type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
}
