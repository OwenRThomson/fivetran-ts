export type ConnectionCardConfig = {
  redirect_uri: string;
  hide_setup_guide: boolean;
};

export interface ConnectionData {
  id: string;
  service: string;
  schema: string;
  group_id: string;
  status: ConnectionStatus;
  service_version?: number;
  created_at: string;
  failed_at?: string | null;
  succeeded_at?: string | null;
  sync_frequency: number;
  paused?: boolean;
  daily_sync_time?: string;
  connected_by?: string;
  setup_tests?: Array<SetupTest>;
  source_sync_details?: Record<string, any>;
  private_link_id?: string;
  proxy_agent_id?: string;
  networking_method?: NetworkingMethod;
  connect_card?: { token?: string; uri?: string };
  pause_after_trial?: boolean;
  data_delay_threshold?: number;
  data_delay_sensitivity?: DataDelaySensitivity;
  destination_configuration?: { virtual_warehouse?: string };
  schedule_type?: ScheduleType;
  connect_card_config?: ConnectionCardConfig;
  hybrid_deployment_agent_id?: string;
  config?: Record<string, any>;
}

export type NetworkingMethod =
  | "Directly"
  | "PrivateLink"
  | "SshTunnel"
  | "ProxyAgent";

export interface ConnectionCard {
  token: string; // Connect-card auth token
  uri: string; // Connect Card URI for UI
}

export type UpdateState = "delayed" | "on_schedule";

export type ScheduleType = "auto" | "manual";

export type SetupState = "incomplete" | "connected" | "broken";

export type SyncState = "paused" | "scheduled" | "syncing" | "rescheduled";

export type SyncFrequency =
  | 1
  | 5
  | 15
  | 30
  | 60
  | 120
  | 180
  | 360
  | 480
  | 720
  | 1440;

export type DataDelaySensitivity =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "CUSTOM"
  | "SYNC_FREQUENCY";

export interface ConnectionStatus {
  tasks?: Array<{
    code: string;
    message: string;
    details?: string;
  }>;
  warnings?: Array<{
    code: string;
    message: string;
    details?: string;
  }>;
  schema_status?: string;
  update_state: UpdateState;
  setup_state: SetupState;
  sync_state: SyncState;
  is_historical_sync: boolean;
  rescheduled_for?: string;
}

export interface SetupTest {
  title: string;
  status: "PASSED" | "SKIPPED" | "WARNING" | "FAILED" | "JOB_FAILED";
  message?: string;
  details?: Record<string, any>;
}
