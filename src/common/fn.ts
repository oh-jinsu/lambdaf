/**
 * A type of functon with multiple arguments and single result.
 */
export type EntryFn<T extends any[], U> = (...arg: T) => U;

/**
 * A type of functon with single argument and single result.
 */
export type Fn<T, U> = (arg: T) => U;
