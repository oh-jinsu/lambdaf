import { APIGatewayRequestAuthorizerEvent, APIGatewayRequestAuthorizerHandler } from "aws-lambda";
import { lambda, Lambda } from "../core";
import { authorizerRequestMapper } from "../request_mappers/authorizer";
import { AuthorizerResponse, authorizerResponseMapper } from "../response_mappers/authorizer";
import { authorizerPiper, AuthorizerPiperUseCase } from "../usecase/authorizer_piper";

/**
 * A type of [`apiGatewayProxyLambda`] function.
 */
export type AuthorizerLambda = Lambda<APIGatewayRequestAuthorizerHandler, APIGatewayRequestAuthorizerEvent, AuthorizerResponse>;

export type AuthorizerUseCase = AuthorizerPiperUseCase;

export function authorizerLambda(usecase: AuthorizerUseCase): ReturnType<AuthorizerLambda> {
    return lambda(authorizerRequestMapper, authorizerPiper(usecase), authorizerResponseMapper);
}
