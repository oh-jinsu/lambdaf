import { eventBridgeLambda } from "..";

describe("EventBridgeLambda", () => {
    type Request = {
        detailType: "Hello";
        detail: {
            name: string;
        };
    };

    test("should log", async () => {
        let output = "";

        const handler = eventBridgeLambda<Request>(({ detail, detailType }) => {
            output += detailType;

            output += ", ";

            output += detail.name;

            output += "!";
        });

        const event = {
            "detail-type": "Hello",
            detail: {
                name: "Jinsu",
            },
        };

        await handler(event as any, {} as any, () => null);

        expect(output).toBe("Hello, Jinsu!");
    });
});
