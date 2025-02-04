export type CustomErrorData = {
  error: string;
  message: string;
  statusCode: number;
};
export type ErrorFormData = {
  error: string;
  message: string[];
  statusCode: number;
};

export interface ErrorData<T> {
  data: T;
  message: string;
  statusCode: number;
}
