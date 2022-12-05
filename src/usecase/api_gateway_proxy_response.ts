/**
 * Convert passed argumnets to an object
 */
export function response<T = unknown, U = unknown, V = unknown>(statusCode: T, body: U, headers?: V) {
    return {
        statusCode,
        headers,
        body,
    };
}

/**
 * Convert passed argumnets to an object.
 */
export function exception<T = unknown, U = unknown>(statusCode: T, message: string, code?: number | string, headers?: U) {
    return {
        statusCode,
        code,
        message,
        headers,
    };
}
