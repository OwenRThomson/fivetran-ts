export type NetworkSuccess<T> = {
  data: T;
  error: null;
  status: number;
  code?: string;
  message?: string;
};

export type NetworkErrorDetails = {
  status: number;
  statusText: string;
  message: string;
  details?: unknown;
};

export type NetworkError = {
  data: null;
  error: NetworkErrorDetails;
};

export type NetworkResult<T> = NetworkSuccess<T> | NetworkError;

export async function fetchWithErrorHandling<T>(
  url: string,
  options?: RequestInit
): Promise<NetworkResult<T>> {
  try {
    console.log(`[fetchWithErrorHandling] Fivetran call for ${url}`);
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return {
        data: data as T,
        error: null,
        status: response.status,
      };
    }

    let errorDetails: unknown;
    try {
      errorDetails = await response.json();
    } catch {
      errorDetails = { message: response.statusText };
    }

    return {
      data: null,
      error: {
        status: response.status,
        statusText: response.statusText,
        message: `Request failed with status ${response.status}: ${response.statusText}`,
        details: errorDetails,
      },
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: {
        status: 0,
        statusText: "Network Error",
        message:
          error instanceof Error ? error.message : "Unknown network error",
        details: error,
      },
    };
  }
}
