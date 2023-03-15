import { APIGatewayRequestAuthorizerHandler } from "aws-lambda";
import { ResponseMapper } from "../core/response_mapper";

export type AuthorizerResponse = {
    id: string;
    methodArn: string;
};

export type AuthorizerResponseMapper<T extends AuthorizerResponse> = ResponseMapper<APIGatewayRequestAuthorizerHandler, T>;

export function authorizerResponseMapper<T extends AuthorizerResponse>(
    ...[result]: Parameters<AuthorizerResponseMapper<T>>
): ReturnType<AuthorizerResponseMapper<T>> {
    const { methodArn, ...context } = result;

    return {
        principalId: context.id,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: "Allow",
                    Resource: methodArn,
                },
            ],
        },
        context: context as any,
    };
}
