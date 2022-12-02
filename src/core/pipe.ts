import { EntryFn, Fn } from "../common/fn";
import { PromiseOr } from "../common/promise";

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
