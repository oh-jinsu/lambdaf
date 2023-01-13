import { eventBridgeRequestMapper } from "./event_bridge";

describe("EventBridgeRequestMapper", () => {
    test("should return empty", async () => {
        /**
         * Set up empty event.
         */
        const event = {};

        const result = await eventBridgeRequestMapper(event as any, {} as any, () => null);

        expect(result.detailType).toBeUndefined();

        expect(result.detail).toBeUndefined();
    });

    test("should return detail and detail type", async () => {
        /**
         * Set up empty event.
         */
        const event = {
            "detail-type": "hello",
            detail: "world",
        };

        const result = await eventBridgeRequestMapper(event as any, {} as any, () => null);

        expect(result.detailType).toBe("hello");

        expect(result.detail).toBe("world");
    });
});
