export enum ResponseStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface Response<T> {
  data: T;
  status: ResponseStatus;
  message: string;
}

