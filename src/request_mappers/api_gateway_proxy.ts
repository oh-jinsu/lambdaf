import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { toCamelCase } from "../common/case";
import { map } from "../common/map";
import { RequestMapper } from "../core/request_mapper";

/**
 * Should provide `body`, `queryStringParameters`, `pathParameters` from the event.
 */
export type ApiGatewayProxyRequest = {
    body: any;
    queryStringParameters: any;
    pathParameters: any;
};

export type WithApiGatewayProxyEvent<Req extends ApiGatewayProxyRequest> = Omit<APIGatewayProxyEvent, keyof Req> & Req;

/**
 * A type of [`apiGatewayProxyRequestMapper`] function.
 */
export type ApiGatewayProxyRequestMapper<Req extends ApiGatewayProxyRequest> = RequestMapper<APIGatewayProxyHandler, WithApiGatewayProxyEvent<Req>>;

/**
 * Map [`ApiGatewayProxyEvent`] to `Req`.
 *
 * Provides default `body`, `queries`, `paths` from the event.
 */
export function apiGatewayProxyRequestMapper<Req extends ApiGatewayProxyRequest>(
    ...[event]: Parameters<ApiGatewayProxyRequestMapper<Req>>
): ReturnType<ApiGatewayProxyRequestMapper<Req>> {
    const { body: eventBody, queryStringParameters: eventQueryStringParameters, pathParameters: pathParamters, ...others } = event;

    const mapByCamelCase = map(([key, value]) => [toCamelCase(key), value]);

    const body = mapByCamelCase(eventBody ? JSON.parse(eventBody) : {});

    const queryStringParameters = mapByCamelCase(eventQueryStringParameters ? eventQueryStringParameters : {});

    const pathParameters = mapByCamelCase(pathParamters ? pathParamters : {});

    return {
        ...others,
        body,
        queryStringParameters,
        pathParameters,
    } as any;
}
