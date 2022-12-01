import { Err, Result } from ".";
import { Fn } from "./fn";
import { PromiseOr } from "./promise";

export function then<T, U, V>(fn: Fn<T, PromiseOr<Result<U, V>>>): Fn<Result<T, V>, PromiseOr<Result<U, V>>> {
    return async (result) => {
        if (result instanceof Err) {
            return result;
        }

        return fn(result.value);
    };
}
