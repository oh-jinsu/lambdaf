"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiGatewayProxyResponseMapper = void 0;
/**
 * Map `Res` to [`ApiGatewayProxyEvent`].
 *
 * The generic paramater `Res` must contain `statusCode` and `body` properties.
 */
function apiGatewayProxyResponseMapper(...[result]) {
    return {
        statusCode: result.statusCode,
        body: JSON.stringify(result.body),
    };
}
exports.apiGatewayProxyResponseMapper = apiGatewayProxyResponseMapper;
