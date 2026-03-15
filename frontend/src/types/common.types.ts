export type AsyncState = {
  loading: boolean
  error: string | null
}

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message: string;
};