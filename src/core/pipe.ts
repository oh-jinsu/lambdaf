import { PromiseOr } from "./common";

/**
 * A type of functon with multiple arguments and single result.
 */
type EntryFn<T extends any[], U> = (...arg: T) => U;

/**
 * A type of functon with single argument and single result.
 */
type Fn<T, U> = (arg: T) => U;

/**
 * A type of [`pipe`] function.
 */
export type Pipe<A extends any[], B, C, D> = (f1: EntryFn<A, PromiseOr<B>>, f2: Fn<B, PromiseOr<C>>, f3: Fn<C, PromiseOr<D>>) => EntryFn<A, Promise<D>>;

/**
 * Prepare for three layered functions that might operate as [`Promise`].
 * The returning function always operates as [`Promise`] though.
 */
export function pipe<A extends any[], B, C, D>(f1: EntryFn<A, PromiseOr<B>>, f2: Fn<B, PromiseOr<C>>, f3: Fn<C, PromiseOr<D>>): EntryFn<A, Promise<D>> {
    return async (...args) => {
        const a = await f1(...args);

        const b = await f2(a);

        const c = await f3(b);

        return c;
    };
}