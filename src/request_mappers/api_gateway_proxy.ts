import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { RequestMapper } from "../core/request_mapper";

/**
 * Should provide `body`, `queryStringParameters`, `pathParameters` from the event.
 */
export type ApiGatewayProxyRequest = {
    body: any;
    queryStringParameters: any;
    pathParameters: any;
};

/**
 * A type of [`apiGatewayProxyRequestMapper`] function.
 */
export type ApiGatewayProxyRequestMapper<Req extends ApiGatewayProxyRequest> = RequestMapper<
    APIGatewayProxyHandler,
    Omit<APIGatewayProxyEvent, keyof Req> & Req
>;

/**
 * Map [`ApiGatewayProxyEvent`] to `Req`.
 *
 * Provides default `body`, `queries`, `paths` from the event.
 */
export function apiGatewayProxyRequestMapper<Req extends ApiGatewayProxyRequest>(
    ...[event]: Parameters<ApiGatewayProxyRequestMapper<Req>>
): ReturnType<ApiGatewayProxyRequestMapper<Req>> {
    const { body: eventBody, queryStringParameters: eventQueryStringParameters, pathParameters: pathParamters, ...others } = event;

    const body = eventBody ? JSON.parse(eventBody) : {};

    const queryStringParameters = eventQueryStringParameters ? eventQueryStringParameters : {};

    const pathParameters = pathParamters ? pathParamters : {};

    return {
        ...others,
        body,
        queryStringParameters,
        pathParameters,
    } as any;
}
