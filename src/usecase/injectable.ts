import { UseCase } from "../core";

/**
 * It is the type of [`UseCase`],
 * but it has an additional property `context`.
 */
export type InjectableUseCase<T, U, V> = (arg: Parameters<UseCase<T, U>>[0], context: V) => ReturnType<UseCase<T, U>>;

/**
 * A type of [`injectable`].
 */
export type Injectable<T, U, V> = (usecase: InjectableUseCase<T, U, V>, context: V) => UseCase<T, U>;

/**
 * Capture the context in order to access it in the usecase.
 */
export function injectable<T, U, V>(...[usecase, context]: Parameters<Injectable<T, U, V>>): ReturnType<Injectable<T, U, V>> {
    return (arg) => usecase(arg, context);
}
