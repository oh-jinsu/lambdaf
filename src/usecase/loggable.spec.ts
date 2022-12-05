import { loggable } from "./loggable"

describe("Loggable", () => {
  test("should not log anything", async () => {
    let output = "";

    const logger = (e: any) => {
      output += e?.message?.toString();
    }

    const usecase = loggable(() => "Hello world!", logger);

    expect(() => usecase({})).not.toThrow();

    expect(output).toBe("")
  })

  test("should log an error message", async () => {
    let output = "";

    const logger = (e: any) => {
      output += e?.message?.toString();
    }

    const usecase = loggable(() => { throw new Error("unexpected error") }, logger);

    expect(() => usecase({})).rejects.toThrow();

    expect(output).toBe("unexpected error");
  })
})