import { UseCase } from "../core/usecase";
import { ApiGatewayProxyResponse } from "../response_mappers";
import { exception } from "./api_gateway_proxy_response";

/**
 * A type of the [apiGatewayProxyCatcher].
 */
export type ApiGatewayProxyCatcher<T, U extends ApiGatewayProxyResponse> = (usecase: UseCase<T, U>) => UseCase<T, ApiGatewayProxyResponse>;

/**
 * Catch errors that occurs in usecases and
 * map them to be compatible with the [`ApiGatewayProxyResponse`]
 */
export function apiGatewayProxyCatcher<T, U extends ApiGatewayProxyResponse>(
    ...[usecase]: Parameters<ApiGatewayProxyCatcher<T, U>>
): ReturnType<ApiGatewayProxyCatcher<T, U>> {
    return async (arg) => {
        try {
            return await usecase(arg);
        } catch (error: any) {
            if ("statusCode" in error && "body" in error && "message" in error.body) {
                return exception(error.statusCode, error.body.message, error.body.code, error.body.headers);
            }

            return exception(500, "예기치 못한 오류입니다.");
        }
    };
}
