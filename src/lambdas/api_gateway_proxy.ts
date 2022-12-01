import { APIGatewayProxyHandler } from "aws-lambda";
import { Result } from "../common/result";
import { lambda, Lambda } from "../core/lambda";
import { apiGatewayProxyRequestMapper } from "../request_mappers";
import { ApiGatewayProxyException, ApiGatewayProxyResponse, apiGatewayProxyResponseMapper } from "../response_mappers";

/**
 * A type of [`apiGatewayProxyLambda`] function.
 */
export type ApiGatewayProxyLambda<Req, Res, E> = Lambda<APIGatewayProxyHandler, Result<Req, E>, Result<Res, E>>;

export function apiGatewayProxyLambda<Req, Res extends ApiGatewayProxyResponse, E extends ApiGatewayProxyException>(
    usecase: Parameters<ApiGatewayProxyLambda<Req, Res, E>>[1],
): ReturnType<ApiGatewayProxyLambda<Req, Res, E>> {
    return lambda(apiGatewayProxyRequestMapper, usecase, apiGatewayProxyResponseMapper);
}
