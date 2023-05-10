export interface HttpResponseData<T> {
  map(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    toCamelCase: <T>(obj: T) => Camelize<T>,
  ): Camelize<T>[];
  error: boolean;
  status: number;
  data: T;
  totalDetails?: number;
  nextCursor?: string;
}

type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T
    ? string
    : T extends `${infer F}_${infer R}`
    ? `${F}${Capitalize<CamelizeString<R>>}`
    : T
  : T;

export type Camelize<T> = { [K in keyof T as CamelizeString<K>]: T[K] };

export function toCamelCase<T>(obj: T): Camelize<T> {
  const result: Record<string, any> = {};
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    const newKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    result[newKey] = obj[key];
  }
  return result as Camelize<T>;
}
