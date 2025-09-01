import { FivetranApiRequest } from "../FivetranClient";
import { NetworkResult } from "../../utils/networkFetch";

export interface GetConnectionStateResponse {
  code: string;
  message?: string;
  data: {
    state: Record<string, any>;
  };
}

export async function getConnectionState(
  makeRequest: FivetranApiRequest,
  connectionId: string
): Promise<NetworkResult<GetConnectionStateResponse>> {
  return makeRequest<GetConnectionStateResponse>(
    `/connections/${connectionId}/state`,
    { method: "DELETE" }
  );
}
