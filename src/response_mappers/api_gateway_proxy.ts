import { APIGatewayProxyHandler } from "aws-lambda";
import { ResponseMapper } from "../core/response_mapper";
import { Ok, Result } from "../common/result";

/**
 * The previous fuction must provide `statusCode` and `body`
 * properties with [`Ok`] result.
 */
export type ApiGatewayProxyResponse = {
    statusCode: number;
    body: any;
};

/**
 * The previous function must provide `statusCode` and
 * `code` and `message` properties with [`Err`] result.
 */
export type ApiGatewayProxyException = {
    statusCode: number;
    code: number;
    message: string;
}

/**
 * A type of [`apiGatewayProxyResponseMapper`] function.
 */
export type ApiGatewayProxyResponseMapper<Res extends ApiGatewayProxyResponse, E extends ApiGatewayProxyException> = ResponseMapper<APIGatewayProxyHandler, Result<Res, E>>;

/**
 * Map `Res` to [`ApiGatewayProxyEvent`].
 *
 * The generic paramater `Res` must contain `statusCode` and `body` properties.
 */
export function apiGatewayProxyResponseMapper<Res extends ApiGatewayProxyResponse, E extends ApiGatewayProxyException>(
    ...[result]: Parameters<ApiGatewayProxyResponseMapper<Res, E>>
): ReturnType<ApiGatewayProxyResponseMapper<Res, E>> {
    if (result instanceof Ok) {
        return {
            statusCode: result.value.statusCode,
            body: JSON.stringify(result.value.body),
        };
    }

    return {
        statusCode: result.value.statusCode,
        body: JSON.stringify({
            code: result.value.code,
            message: result.value.message,
        }),
    };
}
