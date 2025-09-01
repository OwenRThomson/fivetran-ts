import { ConnectionData } from "./types";
import { NetworkResult } from "../../utils/networkFetch";
import { FivetranApiRequest } from "../FivetranClient"; //

export interface ListConnectionsResponse {
  code: string;
  message: string;
  data: {
    items: ConnectionData[];
    next_cursor?: string;
  };
}

export async function listConnections(
  makeRequest: FivetranApiRequest
): Promise<NetworkResult<ListConnectionsResponse>> {
  return makeRequest<ListConnectionsResponse>(`/connections`, {
    method: "GET",
  });
}
