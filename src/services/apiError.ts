export class ApiError extends Error {
  status?: number;
  data?: unknown;
  isNetworkError: boolean;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.isNetworkError = !status;
  }
}
