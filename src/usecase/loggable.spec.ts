import { loggable, LogType } from "./loggable";

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
        const logger = (logType: LogType, ...args: any) => {
            if (logType === "error") {
                output += args[0].message.toString();
            }
        };

        /**
         * Create a loggable usecase.
         */
        const usecase = loggable(() => "Hello world!", logger);

        try {
            await usecase({});
        } catch {}

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
        const logger = (logType: LogType, ...args: any) => {
            if (logType === "error") {
                output += args[0].message;
            }
        };

        /**
         * Create a loggable usecase.
         */
        const usecase = loggable(() => {
            throw new Error("unexpected error");
        }, logger);

        try {
            await usecase({});
        } catch {}

        /**
         * The logger should log the error on the output.
         */
        expect(output).toBe("unexpected error");
    });
});
