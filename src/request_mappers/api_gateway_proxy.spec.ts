import { apiGatewayProxyRequestMapper } from "./api_gateway_proxy";

describe("ApiGatewayProxy", () => {
    test("should return empty body", async () => {
        /**
         * Set up empty event.
         */
        const event = {};

        /**
         * Execute the function.
         */
        const result = await apiGatewayProxyRequestMapper(event as any, {} as any, () => null);

        /**
         * The body should be an empty object.
         */
        expect(result.body).toStrictEqual({});
    });

    test("should return parsed body", async () => {
        /**
         * Set up empty event.
         */
        const event = {
            body: JSON.stringify({
                name: "Jinsu",
            }),
        };

        /**
         * Execute the function.
         */
        const result = await apiGatewayProxyRequestMapper(event as any, {} as any, () => null);

        /**
         *  The body should contain the name.
         */
        expect(result.body).toStrictEqual({
            name: "Jinsu",
        });
    });

    test("should return empty querystring paramters", async () => {
        /**
         * Set up empty event.
         */
        const event = {};

        /**
         * Execute the function.
         */
        const result = await apiGatewayProxyRequestMapper(event as any, {} as any, () => null);

        /**
         * The querystring parameters should be an empty object.
         */
        expect(result.queryStringParameters).toStrictEqual({});
    });

    test("should return parsed querystring parameters", async () => {
        /**
         * Set up empty event.
         */
        const event = {
            queryStringParameters: {
                name: "Jinsu",
            },
        };

        /**
         * Execute the function.
         */
        const result = await apiGatewayProxyRequestMapper(event as any, {} as any, () => null);

        /**
         * The querystring parameters should contain the name
         */
        expect(result.queryStringParameters).toStrictEqual({
            name: "Jinsu",
        });
    });

    test("should return empty path parameters", async () => {
        /**
         * Set up empty event.
         */
        const event = {};

        /**
         * Execute the function.
         */
        const result = await apiGatewayProxyRequestMapper(event as any, {} as any, () => null);

        /**
         * The path parameters should be an empty object.
         */
        expect(result.pathParameters).toStrictEqual({});
    });

    test("should return parsed path parameters", async () => {
        /**
         * Set up empty event.
         */
        const event = {
            pathParameters: {
                name: "Jinsu",
            },
        };

        /**
         * Execute the function.
         */
        const result = await apiGatewayProxyRequestMapper(event as any, {} as any, () => null);

        /**
         * The path parameters should contain the name
         */
        expect(result.pathParameters).toStrictEqual({
            name: "Jinsu",
        });
    });
});
