/**
 * Attach the promise type for the generic parameter `T`.
 */
export type PromiseOr<T> = T | Promise<T>;

