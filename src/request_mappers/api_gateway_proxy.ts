import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { RequestMapper } from "../core/request_mapper";

export type ApiGatewayProxyEventMapper<Req> = RequestMapper<APIGatewayProxyHandler, Omit<APIGatewayProxyEvent, keyof Req> & Req>;

/**
 * Map [`ApiGatewayProxyEvent`] to `Req`.
 *
 * Provides additional `body`, `queries`, `paths` from the event.
 */
export function apiGatewayProxyRequestMapper<Req>(...[event]: Parameters<ApiGatewayProxyEventMapper<Req>>): ReturnType<ApiGatewayProxyEventMapper<Req>> {
    const body = event.body ? JSON.parse(event.body) : {};

    const queries = event.queryStringParameters ? event.queryStringParameters : {};

    const paths = event.pathParameters ? event.queryStringParameters : {};

    return {
        ...event,
        body,
        queries,
        paths,
    } as any;
}
