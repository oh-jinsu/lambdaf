import { APIGatewayProxyHandler } from "aws-lambda";
import { lambda, Lambda } from "../core/lambda";
import { UseCase } from "../core/usecase";
import { ApiGatewayProxyRequest, apiGatewayProxyRequestMapper } from "../request_mappers";
import { ApiGatewayProxyResponse, apiGatewayProxyResponseMapper } from "../response_mappers";
import { apiGatewayProxyCatcher } from "../usecase";

/**
 * A type of [`apiGatewayProxyLambda`] function.
 */
export type ApiGatewayProxyLambda<Req extends ApiGatewayProxyRequest, Res extends ApiGatewayProxyResponse> = Lambda<APIGatewayProxyHandler, Req, Res>;

export function apiGatewayProxyLambda<Req extends ApiGatewayProxyRequest, Res extends ApiGatewayProxyResponse>(
    usecase: UseCase<Req, Res>,
): ReturnType<ApiGatewayProxyLambda<Req, Res>> {
    return lambda(apiGatewayProxyRequestMapper, apiGatewayProxyCatcher(usecase), apiGatewayProxyResponseMapper);
}
