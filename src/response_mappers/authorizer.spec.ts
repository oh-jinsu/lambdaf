import { authorizerResponseMapper } from "./authorizer";

describe("AuthorizerResponseMapper", () => {
    test("should success", () => {
        const arg = {
            id: "oh",
            name: "jinsu",
            methodArn: "methodArn",
        };

        const result = authorizerResponseMapper(arg);

        expect(result).toStrictEqual({
            principalId: "oh",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "execute-api:Invoke",
                        Effect: "Allow",
                        Resource: "methodArn",
                    },
                ],
            },
            context: {
                id: "oh",
                name: "jinsu",
            },
        });
    });
});
