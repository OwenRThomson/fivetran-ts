import { NetworkResult } from "../../utils/networkFetch";
import { FivetranApiRequest } from "../FivetranClient";

type DeleteConnectionResponse = {
  code: string;
  message?: string;
  data: {
    id: string;
  };
};

export async function deleteConnection(
  makeRequest: FivetranApiRequest,
  connectionId: string
): Promise<NetworkResult<DeleteConnectionResponse>> {
  return makeRequest<DeleteConnectionResponse>(`/connections/${connectionId}`, {
    method: "DELETE",
  });
}
