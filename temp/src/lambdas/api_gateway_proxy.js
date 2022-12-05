"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiGatewayProxyLambda = void 0;
const lambda_1 = require("../core/lambda");
const request_mappers_1 = require("../request_mappers");
const response_mappers_1 = require("../response_mappers");
function apiGatewayProxyLambda(usecase) {
    return (0, lambda_1.lambda)(request_mappers_1.apiGatewayProxyRequestMapper, usecase, response_mappers_1.apiGatewayProxyResponseMapper);
}
exports.apiGatewayProxyLambda = apiGatewayProxyLambda;
