import { Handler } from "aws-lambda";
import { Pipe, pipe } from "./pipe";

/**
 * A type of [`lambda`] function.
 */
export type Lambda<T extends Handler, Params, Result> = Pipe<Parameters<T>, Params, Result, Awaited<ReturnType<T>>>;

/**
 * A generic type wrapper for the [`pipe`] function.
 *
 * The first generic parameter `T` receives one of [`Handler`] in AWS Lambda.
 * Then the paramter type of the first function is forced to be [`Parameters<T>`],
 * and the return type of the last function is forced to be [`ReturnType<T>`].
 *
 * Parse the passed event to be matched with the second generic paramter `Params`.
 * Return an object that has the type of `Result` in the second function.
 * Last, Parse the object to be matched with the given return type of the handler.
 */
export function lambda<T extends Handler, Params, Result>(...args: Parameters<Lambda<T, Params, Result>>): ReturnType<Lambda<T, Params, Result>> {
    return pipe(...args);
}
