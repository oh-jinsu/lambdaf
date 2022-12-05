"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
class CustomException {
    constructor(code, message, statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
test('test lambda', async () => {
    const handler = (0, src_1.lambda)(src_1.apiGatewayProxyRequestMapper, ({ id, store_id }) => {
        throw new CustomException(1, "에러입니다.", 500);
    }, ({ id }) => {
        return { statusCode: 200, body: JSON.stringify({ id }) };
    });
    const response = await handler({ body: '' }, {}, () => { });
    expect(response.statusCode).toBe(500);
});
