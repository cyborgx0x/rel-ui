export type IResponse<T> = {
  data: T | null;
  errors?: {
    code: string;
    message: string;
    extends: { field: string; message: string }[];
  };
};
