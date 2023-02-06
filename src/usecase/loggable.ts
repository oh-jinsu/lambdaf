import { PromiseOr } from "../common/promise";
import { UseCase } from "../core";

export type LogType = "arguments" | "result" | "error";

/**
 * Log an error and a context argument.
 */
export type Logger = (logType: LogType, ...args: any[]) => PromiseOr<void>;

/**
 * Receive an usecase and a logger.
 * Return an usecase.
 */
export type Loggable<T, U> = typeof loggable<T, U>;

/**
 * If an error occurs while executing the passed usecase,
 * log the error and the arguments of the usecase.
 */
export function loggable<T, U>(usecase: UseCase<T, U>, logger: Logger = console.log): UseCase<T, U> {
    return async (arg) => {
        try {
            await logger("arguments", arg);

            const result = await usecase(arg);

            await logger("result", result);

            return result;
        } catch (err) {
            await logger("error", err, arg);

            throw err;
        }
    };
}
