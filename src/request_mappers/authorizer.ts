import { APIGatewayRequestAuthorizerEvent, APIGatewayRequestAuthorizerHandler } from "aws-lambda";
import { RequestMapper } from "../core/request_mapper";

/**
 * A type of [`apiGatewayProxyRequestMapper`] function.
 */
export type AuthorizerRequestMapper = RequestMapper<APIGatewayRequestAuthorizerHandler, APIGatewayRequestAuthorizerEvent>;

/**
 * Map [`ApiGatewayProxyEvent`] to `Req`.
 *
 * Provides default `body`, `queries`, `paths` from the event.
 */
export function authorizerRequestMapper(...[event]: Parameters<AuthorizerRequestMapper>): ReturnType<AuthorizerRequestMapper> {
    return event;
}
