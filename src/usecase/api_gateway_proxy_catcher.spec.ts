import { apiGatewayProxyCatcher } from "./api_gateway_proxy_catcher";
import { exception } from "./api_gateway_proxy_response";

describe("ApiGatewayProxyCatcher", () => {
    test("should return an exception", async () => {
        /**
         * Create a usecase that throws an exception.
         */
        const usecase = apiGatewayProxyCatcher(() => {
            throw exception(400, "잘못된 요청입니다.");
        });

        /**
         * Execute the usecase.
         */
        const result = await usecase({});

        /**
         * The status code should be 400.
         */
        expect(result.statusCode).toBe(400);

        /**
         * The message in the body should say "잘못된 요청입니다".
         */
        expect(result.body.message).toBe("잘못된 요청입니다.");
    });

    test("should return an unexpected error", async () => {
        /**
         * Create a usecase that throws an [`Error`].
         */
        const usecase = apiGatewayProxyCatcher(() => {
            throw new Error();
        });

        /**
         * Execute the usecase.
         */
        const result = await usecase({});

        /**
         * The status code should be 500.
         */
        expect(result.statusCode).toBe(500);

        /**
         * The message in the body should say "예기치 못한 오류입니다".
         */
        expect(result.body.message).toBe("예기치 못한 오류입니다.");
    });
});
