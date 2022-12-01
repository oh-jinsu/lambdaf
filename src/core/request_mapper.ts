import { Handler } from "aws-lambda";
import { Lambda } from "./lambda";

/**
 * Map the passed arguments which are parameters from one of the AWS Lambda handler
 * to be matched with the second generic parameter `Params`.
 */
export type RequestMapper<T extends Handler, U> = Parameters<Lambda<T, U, unknown>>[0];
