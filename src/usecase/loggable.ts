import { PromiseOr } from "../common/promise";
import { UseCase } from "../core";

/**
 * Log an error and a context argument.
 */
export type Logger<T> = (err: unknown, arg: T) => PromiseOr<void>;

/**
 * Receive an usecase and a logger.
 * Return an usecase.
 */
export type Loggable<T, U> = typeof loggable<T, U>;

/**
 * If an error occurs while executing the passed usecase,
 * log the error and the arguments of the usecase.
 */
export function loggable<T, U>(usecase: UseCase<T, U>, logger: Logger<T> = console.log): UseCase<T, U> {
    return async (arg) => {
        try {
            return await usecase(arg);
        } catch (err) {
            await logger(err, arg);

            throw err;
        }
    };
}
