import { sqsRequestMapper } from "./sqs";

describe("SQSRequestMapper", () => {
    test("should succeed", async () => {
        const event = {
            Records: [
                {
                    body: JSON.stringify({
                        message: "hi",
                    }),
                },
            ],
        };

        const context = {};

        const result = await sqsRequestMapper(event as any, context as any, () => "");

        expect(result).toStrictEqual([
            {
                body: {
                    message: "hi",
                },
            },
        ]);
    });
});
