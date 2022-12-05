import { APIGatewayProxyHandler } from "aws-lambda";
import { UseCase } from "../core";
import { lambda, Lambda } from "../core/lambda";
import { ApiGatewayProxyRequest, apiGatewayProxyRequestMapper } from "../request_mappers";
import { ApiGatewayProxyResponse, apiGatewayProxyResponseMapper } from "../response_mappers";
import { apiGatewayProxyCatcher } from "../usecase";

/**
 * A type of [`apiGatewayProxyLambda`] function.
 */
export type ApiGatewayProxyLambda<Req extends ApiGatewayProxyRequest, Res extends ApiGatewayProxyResponse> = Lambda<APIGatewayProxyHandler, Req, Res>;

/**
 * Return a function that is compatible with [`ApiGatewayProxyHandler`].
 *
 * The first generic paramenter `Req` extends [`ApiGatewayProxyRequest`].
 * So the type should contain special properties
 * `body`, `queryStringParameters` and `pathParameters`.
 * It follows the implementation of `apiGatewayProxyRequestMapper`.
 *
 * The second generic paramenter `Res` extends [`ApiGatewayProxyResponse`].
 * So the type should contain special properties `statusCode`, `body`,
 * and might contain `headers` property as well.
 * It follows the implementation of `apiGatewayProxyResponseMapper`.
 *
 * Put the type of dependencies in the last generic parameter `Context`.
 * It is able to access it by the second parameter of `usecase`.
 * For details, see `injectable`. This function extends it.
 *
 * This function also extends `apiGatewayProxyCatcher`
 * so that the usecase can be dealt with safely.
 *
 * @param usecase Put your business logic.
 * @param context Access your dependencies.
 * @returns [`ApiGatewayProxyHandler`]
 *
 * ## Example
 * ```ts
 * type Request = {
 *   body: {
 *     name: string;
 *   };
 *   queryStringParameters: never;
 *   pathParameters: never;
 * };
 *
 * type Response = {
 *   statusCode: 200;
 *   body: {
 *     message: string;
 *   };
 * };
 *
 * const context = {
 *   greet: (name: string) => `Hello, ${name}!`,
 * };
 *
 * const handler = apiGatewayProxyLambda<Request, Response, typeof context>(({ body }, context) => {
 *   return response(200, {
 *     message: context.greet(body.name),
 *   });
 * }, context);
 *
 * const event = {
 *   body: JSON.stringify({
 *     name: "Jinsu",
 *   }),
 * };
 *
 * const result = await handler(event as any, {} as any, () => null);
 *
 * expect(result?.body).toBe(
 *   JSON.stringify({
 *     message: "Hello, Jinsu!",
 *   }),
 * );
 * ```
 */
export function apiGatewayProxyLambda<Req extends ApiGatewayProxyRequest, Res extends ApiGatewayProxyResponse>(
    usecase: UseCase<Req, Res>,
): ReturnType<ApiGatewayProxyLambda<Req, Res>> {
    return lambda(apiGatewayProxyRequestMapper, apiGatewayProxyCatcher(usecase), apiGatewayProxyResponseMapper);
}
