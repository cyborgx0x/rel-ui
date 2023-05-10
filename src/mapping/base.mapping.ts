import { BaseQueryFn, BaseQueryMeta, BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import { HttpResponseData } from '@/configs/Api/common';
import { ApiVersion } from '@/configs/Enums/api';

export type BaseBaseQueryResult<A, B> = BaseQueryResult<BaseQueryFn<A, HttpResponseData<B>>>;

/**
 * Base class for mapping
 * P = params type
 * D = Raw response data type
 * O = Processed response data type (output data type)
 */
export abstract class BaseMapping<P, D, O> {
  /**
   * List your mapping support version here
   * Eg: ["v1","v2"]
   * Unless parsing will failed
   */
  protected abstract readonly supportApiVersions: ApiVersion[];
  // Internal only
  // You can use apiVersion to check for mapping
  protected abstract processMapping<F>(data: HttpResponseData<D> | D, arg: P, apiVersion?: ApiVersion): O | F;

  /**
   * Transform response to entities
   * @param baseQueryReturnValue the data returned from the API call
   * @param meta
   * @param arg the arguments passed to the API call
   */
  public transformRTKResponse = (
    baseQueryReturnValue: BaseBaseQueryResult<P, D>,
    meta: BaseQueryMeta<BaseQueryFn<P, HttpResponseData<D>>>,
    arg: P,
  ): O => {
    return this.processMapping(baseQueryReturnValue, arg);
  };
}
