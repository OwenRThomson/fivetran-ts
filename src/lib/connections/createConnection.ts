import * as ConnectionTypes from "./types";
import { FivetranApiRequest } from "../FivetranClient";
import { NetworkResult } from "../../utils/networkFetch";

export type CreateConnectionRequest = {
  group_id: string;
  service: string;
  trust_certificates?: boolean;
  trust_fingerprints?: boolean;
  run_setup_tests?: boolean;
  paused?: boolean;
  pause_after_trial?: boolean;
  sync_frequency?: ConnectionTypes.SyncFrequency;
  data_delay_sensitivity?: ConnectionTypes.DataDelaySensitivity;
  data_delay_threshold?: number;
  daily_sync_time?: string;
  schedule_type: ConnectionTypes.ScheduleType;
  local_processing_agent_id?: string;
  hybrid_deployment_agent_id?: string;
  connect_card_config: ConnectionTypes.ConnectionCardConfig;
  proxy_agent_id?: string;
  private_link_id?: string;
  networking_method?: ConnectionTypes.NetworkingMethod;

  config: Record<string, any>; // This is different depending on the service
  destination_configuration?: Record<string, any>; // This is different depending on the service
};

export interface CreateConnectionResponse {
  code: string;
  message?: string;
  data: ConnectionTypes.ConnectionData;
}

export async function createConnection(
  makeRequest: FivetranApiRequest,
  params: CreateConnectionRequest
): Promise<NetworkResult<CreateConnectionResponse>> {
  return makeRequest<CreateConnectionResponse>(`/connections`, {
    method: "POST",
    body: JSON.stringify({ params }),
  });
}
