"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
test("test lambda", async () => {
    /**
     * Set up your API Gateway Proxy Lambda handler.
     */
    const handler = (0, src_1.apiGatewayProxyLambda)(({ body }) => {
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
    const result = await handler(event, {}, () => null);
    /**
     * The `body` should be a JSON string contains a proper `message`.
     */
    expect(result?.body).toBe(JSON.stringify({
        message: "Hello, Jinsu!",
    }));
});
