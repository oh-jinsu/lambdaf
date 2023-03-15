import { authorizerLambda } from "./authorizer";

describe("AuthorizerLambda", () => {
    test("", async () => {
        const event = {
            methodArn: "methodArn",
        };

        const context = {};

        const usecase = () => ({ id: "oh", name: "jinsu" });

        const result = await authorizerLambda(usecase)(event as any, context as any, () => "");

        if (!result) {
            fail();
        }

        expect(result.principalId).toBe("oh");

        expect(result.context).toStrictEqual({
            id: "oh",
            name: "jinsu",
        });
    });
});
