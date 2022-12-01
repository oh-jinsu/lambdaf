export type Result<T, U> = Ok<T> | Err<U>

export class Ok<T> {
    constructor(readonly value: T) {}
}

export class Err<T> {
    constructor(readonly value: T) {}
}
