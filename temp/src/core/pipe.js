"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipe = void 0;
/**
 * Prepare for three layered functions that might operate as [`Promise`].
 * The returning function always operates as [`Promise`] though.
 */
function pipe(...[f1, f2, f3]) {
    return async (...a) => {
        const b = await f1(...a);
        const c = await f2(b);
        const d = await f3(c);
        return d;
    };
}
exports.pipe = pipe;
