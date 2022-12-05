import { APIGatewayProxyHandler } from "aws-lambda";
import { toSnakeCase } from "../common/case";
import { map } from "../common/map";
import { ResponseMapper } from "../core/response_mapper";

/**
 * The previous usecase must provide `statusCode` and `body` properties.
 */
export type ApiGatewayProxyResponse = {
    statusCode: number;
    body: any;
    headers?: Record<string, string | number | boolean>;
};

/**
 * A type of [`apiGatewayProxyResponseMapper`] function.
 */
export type ApiGatewayProxyResponseMapper<Res extends ApiGatewayProxyResponse> = ResponseMapper<APIGatewayProxyHandler, Res>;

/**
 * Map `Res` to [`ApiGatewayProxyEvent`].
 *
 * The generic paramater `Res` must contain `statusCode` and `body` properties.
 */
export function apiGatewayProxyResponseMapper<Res extends ApiGatewayProxyResponse>(
    ...[result]: Parameters<ApiGatewayProxyResponseMapper<Res>>
): ReturnType<ApiGatewayProxyResponseMapper<Res>> {
    const mapBySnakeCase = map(([key, value]) => [toSnakeCase(key), value]);

    return {
        statusCode: result.statusCode,
        body: JSON.stringify(mapBySnakeCase(result.body)),
    };
}
