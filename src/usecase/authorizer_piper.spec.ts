import { authorizerPiper } from "./authorizer_piper";

describe("AuthorizerPiper", () => {
    test("should throw", async () => {
        const event = {
            methodArn: "methodArn",
        };

        const usecase = () => {
            throw "something";
        };

        try {
            await authorizerPiper(usecase)(event as any);
        } catch (e: any) {
            expect(e.message).toBe("Unauthorized");
        }
    });

    test("should succeed", async () => {
        const event = {
            methodArn: "methodArn",
        };

        const usecase = () => ({
            id: "string",
        });

        const result = await authorizerPiper(usecase)(event as any);

        expect(result.methodArn).toBe("methodArn");
    });
});
