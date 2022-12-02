import { pipe } from "./pipe";

describe("Pipe", () => {
    test("should return 4", async () => {
        /**
         * Set up a pipe handler.
         */
        const handler = pipe<number[], number, number, number>(
            (...[value]) => value + 1,
            (value) => value + 1,
            (value) => value + 1,
        );

        /**
         * Execute a handler.
         */
        const result = await handler(1);

        /**
         * The result should be 4.
         */
        expect(result).toBe(4);
    });

    test("should say 'Hello world!'", async () => {
        /**
         * Set up a pipe handler.
         */
        const handler = pipe<string[], string, string, string>(
            (...[value]) => value + " ",
            (value) => value + "world",
            (value) => value + "!",
        );

        /**
         * Execute a handler.
         */
        const result = await handler("Hello");

        /**
         * The result should say "Hello world!".
         */
        expect(result).toBe("Hello world!");
    });
});
