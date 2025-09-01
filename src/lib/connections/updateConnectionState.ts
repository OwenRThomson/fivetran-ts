import { NetworkResult } from "../../utils/networkFetch";
import { FivetranApiRequest } from "../FivetranClient";

type UpdateConnectionRequest = {
  state: object;
};

type UpdateConnectionResponse = {
  code: string; // Response status code, e.g., "Success"
  message?: string; // Response status text, e.g., "Operation performed."
  data: {
    state: object; // Connection state as a JSON object
  };
};

export async function updateConnectionState(
  makeRequest: FivetranApiRequest,
  connectionId: string,
  params: UpdateConnectionRequest
): Promise<NetworkResult<UpdateConnectionResponse>> {
  return makeRequest<UpdateConnectionResponse>(
    `/connections/${connectionId}/state`,
    {
      method: "PATCH",
      body: JSON.stringify(params),
    }
  );
}
