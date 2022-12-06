import { loggable } from "./loggable";

describe("Loggable", () => {
    test("should not log the error on the output", async () => {
        /**
         * Create a loggable usecase.
         */
        const usecase = loggable(() => "Hello world!");

        /**
         * The usecase should not throw.
         */
        expect(() => usecase({})).not.toThrow();
    });

    test("should not log the error on the output", async () => {
        /**
         * Mock an output.
         */
        let output = "";

        /**
         * Mock a logger.
         */
        const logger = (e: any) => {
            output += e.message?.toString();
        };

        /**
         * Create a loggable usecase.
         */
        const usecase = loggable(() => "Hello world!", logger);

        /**
         * The usecase should not throw.
         */
        expect(() => usecase({})).not.toThrow();

        /**
         * The logger should not log the error on the output.
         */
        expect(output).toBe("");
    });

    test("should log the error on the output", async () => {
        /**
         * Mock an output.
         */
        let output = "";

        /**
         * Mock a logger.
         */
        const logger = (e: any) => {
            output += e.message?.toString();
        };

        /**
         * Create a loggable usecase.
         */
        const usecase = loggable(() => {
            throw new Error("unexpected error");
        }, logger);

        /**
         * The usecase should throw.
         */
        expect(() => usecase({})).rejects.toThrow();

        /**
         * The logger should log the error on the output.
         */
        expect(output).toBe("unexpected error");
    });
});
