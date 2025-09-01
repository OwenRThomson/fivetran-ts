import { FivetranApiRequest } from "../FivetranClient";
import { getConnectionState } from "./getConnectionState";
import {
  createConnection,
  type CreateConnectionRequest,
} from "./createConnection";
import { deleteConnection } from "./deleteConnection";
import { listConnections } from "./listConnections";
import { getConnectionDetails } from "./getConnectionDetails";
import {
  createConnectionCard,
  type CreateConnectionCardRequest,
} from "./createConnectionCard";
import { SyncConnectionDataRequest } from "./syncConnectionData";

import { syncConnectionData } from "./syncConnectionData";
import { updateConnectionState } from "./updateConnectionState";

import {
  runConnectionSetupTests,
  type RunConnectionSetupTestsRequest,
} from "./runConnectionSetupTests";

import {
  updateConnection,
  type UpdateConnectionRequest,
} from "./updateConnection";
import {
  resyncConnectionData,
  ResyncConnectionDataRequest,
} from "./resyncConnectionData";

export const connections = (makeRequest: FivetranApiRequest) => ({
  // POST

  /**
   * Creates a new connection within a specified group in your Fivetran account. Runs setup tests and returns testing results.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/create-connection
   */
  createConnection: (params: CreateConnectionRequest) =>
    createConnection(makeRequest, params),

  /**
   * Generates the Connect Card URI for the connection
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/connect-card
   */
  createConnectionCard: (
    connectionId: string,
    params: CreateConnectionCardRequest
  ) => createConnectionCard(makeRequest, connectionId, params),

  /**
   * Runs the setup tests for an existing connection within your Fivetran account.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/run-setup-tests
   */
  runConnectionSetupTests: (
    connectionId: string,
    params: RunConnectionSetupTestsRequest
  ) => runConnectionSetupTests(makeRequest, connectionId, params),

  /**
   * Triggers a data sync for an existing connection within your Fivetran account without waiting for the next scheduled sync.
   * This action does not override the standard sync frequency you defined in the Fivetran dashboard.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/sync-connection
   */
  syncConnectionData: (
    connectionId: string,
    params: SyncConnectionDataRequest
  ) => syncConnectionData(makeRequest, connectionId, params),

  /**
   * Triggers a full historical sync of a connection or multiple schema tables within a connection.
   * If the connection is paused, the table sync will be scheduled to be performed when the connection
   * is re-enabled. If there is a data sync already in progress, we will try to complete it.
   * If it fails, the request will be declined and the HTTP 409 Conflict error will be returned.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/resync-connection
   */
  resyncConnectionData: (
    connectionId: string,
    params: ResyncConnectionDataRequest
  ) => resyncConnectionData(makeRequest, connectionId, params),

  // GET

  /**
   * Returns a connection configuration and status details if a valid identifier was provided.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/connection-details
   */
  getConnectionDetails: (connectionId: string) =>
    getConnectionDetails(makeRequest, connectionId),

  /**
   * Returns a list of all accessible connections within your Fivetran account.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/list-connections
   */
  listConnections: () => listConnections(makeRequest),

  /**
   * Returns the connection state. This endpoint is only supported for Function and Connection SDK connectors.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/connection-state
   */
  getConnectionState: (connectionId: string) =>
    getConnectionState(makeRequest, connectionId),

  // PATCH

  /**
   * Updates connection parameters for an existing connection within your Fivetran account.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/modify-connection
   */
  updateConnection: (connectionId: string, params: UpdateConnectionRequest) =>
    updateConnection(makeRequest, connectionId, params),

  /**
   * Updates the connection state. To update the state, you should pause your connection first.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/modify-connection-state
   */
  updateConnectionState: (connectionId: string, params: { state: object }) =>
    updateConnectionState(makeRequest, connectionId, params),

  // DELETE

  /**
   * Deletes a connection from your Fivetran account.
   * @link https://fivetran.com/docs/rest-api/api-reference/connections/delete-connection
   */
  deleteConnection: (connectionId: string) =>
    deleteConnection(makeRequest, connectionId),
});
