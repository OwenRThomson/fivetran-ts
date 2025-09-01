import { ConnectionData } from "./types";
import { NetworkResult } from "../../utils/networkFetch";
import { FivetranApiRequest } from "../FivetranClient";

export type RunConnectionSetupTestsRequest = {
  trust_certificates: true;
  trust_fingerprints: true;
};

export interface RunConnectionSetupTestsResponse {
  code: string;
  message?: string;
  data: ConnectionData;
}

export async function runConnectionSetupTests(
  makeRequest: FivetranApiRequest,
  connectionId: string,
  params: RunConnectionSetupTestsRequest
): Promise<NetworkResult<RunConnectionSetupTestsResponse>> {
  return makeRequest<RunConnectionSetupTestsResponse>(
    `/connections/${connectionId}/test`,
    {
      method: "POST",
      body: JSON.stringify(params),
    }
  );
}
