import { Handler } from "aws-lambda";
import { Lambda } from "./lambda";

/**
 * Execute business logics.
 */
export type UseCase<T, U> = Parameters<Lambda<Handler, T, U>>[1];
