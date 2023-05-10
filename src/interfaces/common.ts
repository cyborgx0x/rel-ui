export interface Meta {
  nextCursor: string;
  totalDetails: number;
}

export type HttpResponseResult<D> = {
  error: boolean;
  status: number;
  msg?: string;
  data: D;
};

export type HttpResponseAuth<D> = {
  jsonrpc: string;
  id: number | null;
  result: HttpResponseResult<D>;
};

export type HttpResponseWithMetaData<D> = {
  meta: Meta;
  data: D;
};
