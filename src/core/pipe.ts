import { PromiseOr } from "./promise";

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
export function pipe<A extends any[], B, C, D>(...[f1, f2, f3]: Parameters<Pipe<A, B, C, D>>): ReturnType<Pipe<A, B, C, D>> {
    return async (...a) => {
        const b = await f1(...a);

        const c = await f2(b);

        const d = await f3(c);

        return d;
    };
}
