import { apiGatewayProxyLambda } from "..";
import { exception, response } from "../usecase/api_gateway_proxy_response";

describe("ApiGatewayProxyLambda", () => {
    /**
     * Declare a request.
     * This request contains a `body` which has a `name` property.
     */
    type Request = {
        body: {
            name: string;
        };
        queryStringParameters: never;
        pathParameters: never;
    };

    /**
     * Declare a response.
     * This response returns status code 200 with a `body`
     * which has a `message` property when it succeeds.
     */
    type Response = {
        statusCode: 200;
        body: {
            message: string;
        };
    };

    test("should say 'Hello, Jinsu!'", async () => {
        /**
         * Set up the API Gateway Proxy Lambda handler.
         */
        const handler = apiGatewayProxyLambda<Request, Response>(({ body }) => {
            return response(200, {
                message: `Hello, ${body.name}!`,
            });
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
         * The `body` should be a JSON string contains the expected `message`.
         */
        expect(result?.body).toBe(
            JSON.stringify({
                message: "Hello, Jinsu!",
            }),
        );
    });

    test("should return 'The name is empty!", async () => {
        /**
         * Set up the API Gateway Proxy Lambda handler.
         */
        const handler = apiGatewayProxyLambda<Request, Response>(({ body }) => {
            if (body.name.length === 0) {
                throw exception(400, "The name is empty!");
            }

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
                name: "",
            }),
        };

        /**
         * Execute the handler with parameters.
         */
        const result = await handler(event as any, {} as any, () => null);

        /**
         * The `body` should be a JSON string contains the expected `message`.
         */
        expect(result?.body).toBe(
            JSON.stringify({
                message: "The name is empty!",
            }),
        );
    });
});
