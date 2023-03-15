import { sqsLambda, SQSLambdaUseCase } from "./sqs";

describe("SQSLambda", () => {
    test("should succeed", async () => {
        const context = {};

        const event = {
            Records: [
                {
                    body: JSON.stringify({
                        name: "oh",
                    }),
                },
                {
                    body: JSON.stringify({
                        name: "john",
                    }),
                },
            ],
        };

        let output = "";

        const usecase: SQSLambdaUseCase<{ name: string }> = (event) => {
            output += event.body.name;
        };

        await sqsLambda(usecase)(event as any, context as any, () => "");

        expect(output).toBe("ohjohn");
    });
});
