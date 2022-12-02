import { APIGatewayProxyHandler } from "aws-lambda";
import { lambda } from "./lambda";

describe("Lambda", () => {
    test("should return a result", async () => {
        const handler = lambda<APIGatewayProxyHandler, string, string>(
            (event) => event.body || "",
            (value) => value,
            (value) => ({
                statusCode: 200,
                body: value,
            }),
        );

        /**
         * Set up an event.
         */
        const event = {
            body: "Jinsu",
        };

        /**
         * Execute the handler with parameters.
         */
        const result = await handler(event as any, {} as any, () => null);

        /**
         * The status Code shoude be 200.
         */
        expect(result?.statusCode).toBe(200);

        /**
         * The body should be "Jinsu".
         */
        expect(result?.body).toBe("Jinsu");
    });
});
