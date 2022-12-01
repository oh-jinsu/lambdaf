import { Handler } from "aws-lambda";
import { PromiseOr } from "./promise";

/**
 * Map the passed result to be matched with a response from one of the AWS Lambda handlers.
 */
export type ResponseMapper<T extends Handler, Result> = (arg: Result) => PromiseOr<Awaited<ReturnType<T>>>;
