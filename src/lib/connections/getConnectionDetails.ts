import { NetworkResult } from "../../utils/networkFetch";
import { FivetranApiRequest } from "../FivetranClient"; // Import the type for the makeRequest function
import * as ConnectionTypes from "./types";

export interface GetConnectionDetailsResponse {
  code: string;
  message: string;
  data: ConnectionTypes.ConnectionData;
}

export async function getConnectionDetails(
  makeRequest: FivetranApiRequest,
  connectionId: string
): Promise<NetworkResult<GetConnectionDetailsResponse>> {
  return makeRequest<GetConnectionDetailsResponse>(
    `/connections/${connectionId}`,
    { method: "GET" }
  );
}
