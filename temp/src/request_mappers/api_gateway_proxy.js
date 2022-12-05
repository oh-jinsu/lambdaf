"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiGatewayProxyRequestMapper = void 0;
/**
 * Map [`ApiGatewayProxyEvent`] to `Req`.
 *
 * Provides additional `body`, `queries`, `paths` from the event.
 */
function apiGatewayProxyRequestMapper(...[event]) {
    const body = event.body ? JSON.parse(event.body) : {};
    const queries = event.queryStringParameters ? event.queryStringParameters : {};
    const paths = event.pathParameters ? event.queryStringParameters : {};
    return {
        ...event,
        body,
        queries,
        paths,
    };
}
exports.apiGatewayProxyRequestMapper = apiGatewayProxyRequestMapper;
