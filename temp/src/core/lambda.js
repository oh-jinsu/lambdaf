"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambda = void 0;
const pipe_1 = require("./pipe");
/**
 * A generic type wrapper for the [`pipe`] function.
 *
 * The first generic parameter `T` receives one of [`Handler`] in AWS Lambda.
 * Then the paramter type of the first function is forced to be [`Parameters<T>`],
 * and the return type of the last function is forced to be [`ReturnType<T>`].
 *
 * Parse the passed event to be matched with the second generic paramter `U`.
 * Return an object that has the type of `V` in the second function.
 * Last, Parse the object to be matched with the given return type of the handler.
 */
function lambda(...args) {
    return (0, pipe_1.pipe)(...args);
}
exports.lambda = lambda;
