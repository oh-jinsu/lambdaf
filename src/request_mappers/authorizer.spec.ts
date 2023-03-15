import { authorizerRequestMapper } from "./authorizer";

describe("AuthorizerRequestMapper", () => {
    test("should succeed", () => {
        const event = {};

        const context = {};

        const result = authorizerRequestMapper(event as any, context as any, () => "");

        expect(result).toStrictEqual({});
    });
});
