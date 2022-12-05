import { exception, response } from "./api_gateway_proxy_response";

describe("Response", () => {
    test("should parse arguments to an object", () => {
        /**
         * Execute the function with parameters
         */
        const result = response(200, "Jinsu", {});

        /**
         * Should return a expected object.
         */
        expect(result).toStrictEqual({
            statusCode: 200,
            body: "Jinsu",
            headers: {},
        });
    });

    test("should omit headers", () => {
        /**
         * Execute the function with parameters
         */
        const result = response(200, "Jinsu");

        /**
         * Should return a expected object.
         */
        expect(result).toStrictEqual({
            statusCode: 200,
            body: "Jinsu",
            headers: undefined,
        });
    });
});

describe("Exception", () => {
    test("should parse arguments to an object", () => {
        /**
         * Execute the function with parameters
         */
        const result = exception(400, "BAD_REQUEST", 0, {});

        /**
         * Should return a expected object.
         */
        expect(result).toStrictEqual({
            statusCode: 400,
            code: 0,
            message: "BAD_REQUEST",
            headers: {},
        });
    });

    test("should omit the headers", () => {
        /**
         * Execute the function with parameters
         */
        const result = exception(400, "BAD_REQUEST", 0);

        /**
         * Should return a expected object.
         */
        expect(result).toStrictEqual({
            statusCode: 400,
            code: 0,
            message: "BAD_REQUEST",
            headers: undefined,
        });
    });

    test("should omit the code", () => {
        /**
         * Execute the function with parameters
         */
        const result = exception(400, "BAD_REQUEST");

        /**
         * Should return a expected object.
         */
        expect(result).toStrictEqual({
            statusCode: 400,
            code: undefined,
            message: "BAD_REQUEST",
            headers: undefined,
        });
    });
});
