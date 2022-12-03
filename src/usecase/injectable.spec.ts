import { injectable } from "./injectable";

describe("Injectable", () => {
    test("Should greet", async () => {
        /**
         * Set up a logger on the context.
         */
        const context = {
            greet: (name: string) => `Hello, ${name}!`,
        };

        /**
         * Create an usecase.
         */
        const usecase = injectable<string, string, typeof context>((params, context) => {
            return context.greet(params);
        }, context);

        /**
         * Execute the function with a name.
         */
        const result = await usecase("Jinsu");

        /**
         * The function should not throw
         */
        expect(result).toBe("Hello, Jinsu!");
    });
});
