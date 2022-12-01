import { APIGatewayProxyHandler } from "aws-lambda";
import { ResponseMapper } from "../core/response_mapper";

export type ApiGatewayProxyResponse = {
    statusCode: number;
    body: any;
};

export type ApiGatewayProxyResponseMapper<Res extends ApiGatewayProxyResponse> = ResponseMapper<APIGatewayProxyHandler, Res>;

/**
 * Map `Res` to [`ApiGatewayProxyEvent`].
 *
 * The generic paramater `Res` must contain `statusCode` and `body` properties.
 */
export function apiGatewayProxyResponseMapper<Res extends ApiGatewayProxyResponse>(
    ...[result]: Parameters<ApiGatewayProxyResponseMapper<Res>>
): ReturnType<ApiGatewayProxyResponseMapper<Res>> {
    return {
        statusCode: result.statusCode,
        body: JSON.stringify(result.body),
    };
}
