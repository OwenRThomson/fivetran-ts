import { FivetranClient } from "./FivetranClient";
import { FivetranClientOptions } from "../types/ClientOptions";
export * from "./connections/types";

export function createFivetranClient(
  options: FivetranClientOptions
): FivetranClient {
  return new FivetranClient(options);
}
