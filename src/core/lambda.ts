import { Handler } from "aws-lambda";
import { Pipe, pipe } from "./pipe";

/**
 * A type of [`lambda`] function.
 */
export type Lambda<T extends Handler, U, V> = Pipe<Parameters<T>, U, V, Awaited<ReturnType<T>>>;

/**
 * A generic type wrapper for the [`pipe`] function.
 *
 * The first generic parameter `T` receives one of [`Handler`] in AWS Lambda.
 * Then the paramter type of the first function is forced to be [`Parameters<T>`],
 * and the return type of the last function is forced to be [`ReturnType<T>`].
 *
 * Parse the passed event to be matched with the second generic paramter `U`.
 * Return an object that has the type of `V` in the second function.
 * Last, Parse the object to be matched with the given return type of the handler.
 */
export function lambda<T extends Handler, U, V>(...args: Parameters<Lambda<T, U, V>>): ReturnType<Lambda<T, U, V>> {
    return pipe(...args);
}
