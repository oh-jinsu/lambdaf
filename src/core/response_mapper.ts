import { Handler } from "aws-lambda";
import { Lambda } from "./lambda";

/**
 * Map the passed result to be matched with a response from one of the AWS Lambda handlers.
 */
export type ResponseMapper<T extends Handler, U> = Parameters<Lambda<T, unknown, U>>[2];
