interface IApiError {
  path: string;
  timestamp: Date;
  name: string;
  // Message is JSON
  message: string;
}

type ApiResponse<T> = T | IApiError;

export { IApiError, ApiResponse };
