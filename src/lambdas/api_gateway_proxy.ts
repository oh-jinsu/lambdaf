import { APIGatewayProxyHandler } from "aws-lambda";
import { lambda, Lambda } from "../core/lambda";
import { UseCase } from "../core/usecase";
import { apiGatewayProxyRequestMapper } from "../request_mappers";
import { ApiGatewayProxyResponse, apiGatewayProxyResponseMapper } from "../response_mappers";

/**
 * A type of [`apiGatewayProxyLambda`] function.
 */
export type ApiGatewayProxyLambda<Req, Res> = Lambda<APIGatewayProxyHandler, Req, Res>;

export function apiGatewayProxyLambda<Req, Res extends ApiGatewayProxyResponse>(usecase: UseCase<Req, Res>): ReturnType<ApiGatewayProxyLambda<Req, Res>> {
    return lambda(apiGatewayProxyRequestMapper, usecase, apiGatewayProxyResponseMapper);
}
