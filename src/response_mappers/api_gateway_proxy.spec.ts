import { apiGatewayProxyResponseMapper } from "./api_gateway_proxy";

describe("ApiGatewayProxyResponseMapper", () => {
    test("should stringify a body", async () => {
        /**
         * Set up a result that has an object.
         */
        const result = {
            statusCode: 200,
            body: {},
        };

        /**
         * Execute the function.
         */
        const response = await apiGatewayProxyResponseMapper(result);

        /**
         * The body should be a stringified empty object.
         */
        expect(response?.body).toBe("{}");
    });
});
