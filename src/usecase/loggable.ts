import { PromiseOr } from "../common/promise";
import { UseCase } from "../core";

export type Logger<T> = (err: unknown, arg: T) => PromiseOr<void>;

export type Loggable<T, U> = (usecase: UseCase<T, U>, logger: Logger<T>) => UseCase<T, U>;

export function loggable<T, U>(...[usecase, logger]: Parameters<Loggable<T, U>>): ReturnType<Loggable<T, U>> {
  return async (arg) => {
    try {
      return await usecase(arg);

    } catch (err) {
      await logger(err, arg);

      throw err;
    }
  }
};