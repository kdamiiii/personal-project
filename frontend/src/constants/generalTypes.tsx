export type RequestErrorType = {
  status?: number;
  statusText?: string;
};

export class RequestError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  status?: number;
}
