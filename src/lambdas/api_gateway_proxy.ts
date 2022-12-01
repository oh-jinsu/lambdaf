import { APIGatewayProxyHandler } from "aws-lambda";
import { lambda, Lambda } from "../core/lambda";
import { apiGatewayProxyRequestMapper } from "../request_mappers";
import { ApiGatewayProxyResponse, apiGatewayProxyResponseMapper } from "../response_mappers";

export type ApiGatewayProxyLambda<Req, Res> = Lambda<APIGatewayProxyHandler, Req, Res>;

export function apiGatewayProxyLambda<Req, Res extends ApiGatewayProxyResponse>(
    usecase: Parameters<ApiGatewayProxyLambda<Req, Res>>[1],
): ReturnType<ApiGatewayProxyLambda<Req, Res>> {
    return lambda(apiGatewayProxyRequestMapper, usecase, apiGatewayProxyResponseMapper);
}
