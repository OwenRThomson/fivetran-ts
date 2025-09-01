import { NetworkResult } from "../../utils/networkFetch";
import { FivetranApiRequest } from "../FivetranClient";
import {
  ConnectionCardConfig,
  NetworkingMethod,
  ScheduleType,
  DataDelaySensitivity,
  SyncFrequency,
} from "./types";

export interface UpdateConnectionRequest {
  config?: Record<string, any>;
  auth?: Record<string, any>;
  paused?: boolean;
  trust_certificates?: boolean;
  trust_fingerprints?: boolean;
  networking_method?: NetworkingMethod;
  daily_sync_time?: string;
  run_setup_tests?: boolean;
  sync_frequency?: SyncFrequency;
  data_delay_threshold?: number;
  pause_after_trial?: boolean;
  is_historical_sync?: boolean;
  data_delay_sensitivity?: DataDelaySensitivity;
  schema_status?: "blocked_on_capture" | "ready";
  destination_configuration?: { virtual_warehouse?: string };
  schedule_type?: ScheduleType;
  private_link_id?: string;
  proxy_agent_id?: string;
  hybrid_deployment_agent_id?: string;
}

export interface UpdateConnectionResponse {
  code: string;
  message?: string;
  data: {
    id: string;
    service: string;
    schema: string;
    paused: boolean;
    status: Record<string, any>;
    schema_status?: string;
    update_state: "on_schedule" | "delayed";
    setup_state: "incomplete" | "connected" | "broken";
    sync_state: "scheduled" | "syncing" | "paused" | "rescheduled";
    is_historical_sync: boolean;
    rescheduled_for?: string;
    daily_sync_time?: string;
    succeeded_at?: string;
    sync_frequency: SyncFrequency;
    group_id: string;
    connected_by?: string;
    setup_tests?: Array<Record<string, any>>;
    source_sync_details?: Record<string, any>;
    service_version: number;
    created_at: string;
    failed_at?: string;
    private_link_id?: string;
    proxy_agent_id?: string;
    networking_method?: NetworkingMethod;
    connect_card?: { token?: string; uri?: string };
    pause_after_trial: boolean;
    data_delay_threshold?: number;
    data_delay_sensitivity?: DataDelaySensitivity;
    destination_configuration?: { virtual_warehouse?: string };
    schedule_type: ScheduleType;
    connect_card_config?: ConnectionCardConfig;
    hybrid_deployment_agent_id?: string;
    config?: Record<string, any>;
  };
}

export async function updateConnection(
  makeRequest: FivetranApiRequest,
  connectionId: string,
  params: UpdateConnectionRequest
): Promise<NetworkResult<UpdateConnectionResponse>> {
  return makeRequest<UpdateConnectionResponse>(`/connections/${connectionId}`, {
    method: "PATCH",
    body: JSON.stringify(params),
  });
}
