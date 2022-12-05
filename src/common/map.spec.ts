import { toSnakeCase } from "./case";
import { map } from "./map";

describe("Map", () => {
    test("object with key in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [toSnakeCase(key), value]);

        const result = mapBySnakeCase({
            lastName: "Oh",
            firstName: "Jinsu",
        });

        expect(result).toStrictEqual({
            last_name: "Oh",
            first_name: "Jinsu",
        });
    });

    test("null in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [toSnakeCase(key), value]);

        const result = mapBySnakeCase(null);

        expect(result).toBeUndefined();
    });

    test("value with key in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [toSnakeCase(key), value]);

        const result = mapBySnakeCase("OhJinsu");

        expect(result).toBe("OhJinsu");
    });

    test("null array with key in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [toSnakeCase(key), value]);

        const result = mapBySnakeCase([null, null, null]);

        expect(result).toStrictEqual([undefined, undefined, undefined]);
    });

    test("number array with key in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [toSnakeCase(key), value]);

        const result = mapBySnakeCase([1, 2, 3]);

        expect(result).toStrictEqual([1, 2, 3]);
    });

    test("object array with key in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [toSnakeCase(key), value]);

        const result = mapBySnakeCase([
            {
                lastName: "Oh",
                firstName: "Jinsu",
            },
            {
                lastName: "Kim",
                firstName: "Soohyeok",
            },
        ]);

        expect(result).toStrictEqual([
            {
                last_name: "Oh",
                first_name: "Jinsu",
            },
            {
                last_name: "Kim",
                first_name: "Soohyeok",
            },
        ]);
    });

    test("object with value in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [key, toSnakeCase(value)]);

        const result = mapBySnakeCase({
            lastName: "Oh",
            firstName: "Jinsu",
            job: "FullStackDeveloper",
        });

        expect(result).toStrictEqual({
            lastName: "oh",
            firstName: "jinsu",
            job: "full_stack_developer",
        });
    });

    test("null with value in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [key, toSnakeCase(value)]);

        const result = mapBySnakeCase(null);

        expect(result).toBeUndefined();
    });

    test("value with value in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [key, toSnakeCase(value)]);

        const result = mapBySnakeCase("OhJinsu");

        expect(result).toBe("oh_jinsu");
    });

    test("null array with value in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [key, toSnakeCase(value)]);

        const result = mapBySnakeCase([null, null, null]);

        expect(result).toStrictEqual([undefined, undefined, undefined]);
    });

    test("number array with double value", () => {
        const mapBySnakeCase = map<any, number>(([key, value]) => [key, value * 2]);

        const result = mapBySnakeCase([1, 2, 3]);

        expect(result).toStrictEqual([2, 4, 6]);
    });

    test("object array with value in snake case", () => {
        const mapBySnakeCase = map<string, string>(([key, value]) => [key, toSnakeCase(value)]);

        const result = mapBySnakeCase([
            {
                lastName: "Oh",
                firstName: "Jinsu",
                job: "FullStackDeveloper",
            },
            {
                lastName: "Kim",
                firstName: "Soohyeok",
                job: "FullStackDeveloper",
            },
        ]);

        expect(result).toStrictEqual([
            {
                lastName: "oh",
                firstName: "jinsu",
                job: "full_stack_developer",
            },
            {
                lastName: "kim",
                firstName: "soohyeok",
                job: "full_stack_developer",
            },
        ]);
    });
});
