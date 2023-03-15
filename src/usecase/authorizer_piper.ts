import { APIGatewayRequestAuthorizerEvent } from "aws-lambda";
import { UseCase } from "../core/usecase";
import { AuthorizerResponse } from "../response_mappers/authorizer";

export type AuthorizerPiperUseCase = UseCase<APIGatewayRequestAuthorizerEvent, Omit<AuthorizerResponse, "methodArn">>;

export type AuthorizerPiper = (usecase: AuthorizerPiperUseCase) => UseCase<APIGatewayRequestAuthorizerEvent, AuthorizerResponse>;

export function authorizerPiper(...[usecase]: Parameters<AuthorizerPiper>): ReturnType<AuthorizerPiper> {
    return async (arg) => {
        try {
            const result = await usecase(arg);

            return {
                ...result,
                methodArn: arg.methodArn,
            };
        } catch (error: any) {
            throw new Error("Unauthorized");
        }
    };
}
