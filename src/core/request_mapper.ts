import { Handler } from "aws-lambda";
import { PromiseOr } from "./promise";

/**
 * Map the passed arguments which are parameters from one of the AWS Lambda handler
 * to be matched with the second generic parameter `Params`.
 */
export type RequestMapper<T extends Handler, Params> = (...args: Parameters<T>) => PromiseOr<Params>;
