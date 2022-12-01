import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { RequestMapper } from "../core/request_mapper";
import { Ok, Result } from "../common/result";

/**
 * A type of [`apiGatewayProxyRequestMapper`] function.
 */
export type ApiGatewayProxyEventMapper<Req, E> = RequestMapper<APIGatewayProxyHandler, Result<Omit<APIGatewayProxyEvent, keyof Req> & Req, E>>;

/**
 * Map [`ApiGatewayProxyEvent`] to `Req`.
 *
 * Provides additional `body`, `queries`, `paths` from the event.
 */
export function apiGatewayProxyRequestMapper<Req, E>(...[event]: Parameters<ApiGatewayProxyEventMapper<Req, E>>): ReturnType<ApiGatewayProxyEventMapper<Req, E>> {
    const body = event.body ? JSON.parse(event.body) : {};

    const queries = event.queryStringParameters ? event.queryStringParameters : {};

    const paths = event.pathParameters ? event.queryStringParameters : {};

    return new Ok({
        ...event,
        body,
        queries,
        paths,
    }) as any;
}
