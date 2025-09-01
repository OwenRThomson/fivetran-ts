import { FivetranApiRequest } from "../FivetranClient";
import { ConnectionCardConfig, ConnectionCard } from "./types";
import { NetworkResult } from "../../utils/networkFetch";

export type CreateConnectionCardRequest = {
  connect_card_config: ConnectionCardConfig;
};

export interface CreateConnectionCardResponse {
  code: string;
  message?: string;
  data: {
    connect_card: ConnectionCard;
    connector_id: string;
    connect_card_config: ConnectionCardConfig;
  };
}

export async function createConnectionCard(
  makeRequest: FivetranApiRequest,
  connectionId: string,
  params: CreateConnectionCardRequest
): Promise<NetworkResult<CreateConnectionCardResponse>> {
  return makeRequest<CreateConnectionCardResponse>(
    `/connections/${connectionId}/card`,
    { method: "POST", body: JSON.stringify({ params }) }
  );
}
