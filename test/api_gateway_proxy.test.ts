import { apiGatewayProxyLambda } from "../src";

test("test lambda", async () => {
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
     * Set up your API Gateway Proxy Lambda handler.
     */
    const handler = apiGatewayProxyLambda<Request, Response>(({ body }) => {
        return {
            statusCode: 200,
            body: {
                message: `Hello, ${body.name}!`,
            },
        };
    });

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
