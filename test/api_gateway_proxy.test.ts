import { apiGatewayProxyLambda } from "../src";
import { Err, Ok } from "../src/common/result";

describe("apiGatewayProxyLambda", async () => {
    /**
     * Declare your request.
     * This request contains a `body` which has a `name` property.
     */
    type Request = {
        body: {
            name: string;
        };
    };

    /**
     * Declare your response.
     * This response returns status code 200 with a `body`
     * which has a `message` property when it succeeds.
     */
    type Response = {
        statusCode: 200;
        body: {
            message: string;
        };
    };

    /**
     * Declare your exception.
     * This exception explain itself by the `message` property
     * with `statusCode` and `code`.
     */
    type Exception = {
        statusCode: 400,
        code: 1,
        message: string;
    }

    /**
     * Set up your API Gateway Proxy Lambda handler.
     */
    const handler = apiGatewayProxyLambda<Request, Response, Exception>((result) => {
        if (result instanceof Err) {
            return result;
        }

        if (result.value.body.name.length === 0) {
            return new Err({
                statusCode: 400,
                code: 1,
                message: "The name is empty!",
            })
        }

        return new Ok({
            statusCode: 200,
            body: {
                message: `Hello, ${result.value.body.name}!`,
            },
        });
    });

    test("should return 'Hello, Jinsu!'", async () => {
        /**
         * Set up an event.
         */
        const event = {
            body: JSON.stringify({
                name: "Jinsu",
            }),
        };

        /**
         * Execute the handler with parameters.
         */
        const result = await handler(event as any, {} as any, () => null);

        /**
         * The `body` should be a JSON string contains a proper `message`.
         */
        expect(result?.body).toBe(
            JSON.stringify({
                message: "Hello, Jinsu!",
            }),
        );
    });

    test("should return 'The name is empty!'", async () => {
        /**
         * Set up an event.
         */
        const event = {
            body: JSON.stringify({
                name: "",
            }),
        };

        /**
         * Execute the handler with parameters.
         */
        const result = await handler(event as any, {} as any, () => null);

        /**
         * The `body` should be a JSON string contains a proper `message`.
         */
        expect(result?.body).toBe(
            JSON.stringify({
                message: "The name is empty!",
            }),
        );
    });
});
