import { EventBridgeEvent, EventBridgeHandler } from "aws-lambda";
import { RequestMapper } from "../core";

export type WithEventBridgeEvent<DetailType extends string, Detail> = Omit<EventBridgeEvent<DetailType, Detail>, "detail-type"> & {
    detailType: DetailType;
};

/**
 * A type of [`EventBridgeRequestMapper`] function.
 */
export type EventBridgeRequestMapper<DetailType extends string, Detail> = RequestMapper<
    EventBridgeHandler<DetailType, Detail, void>,
    WithEventBridgeEvent<DetailType, Detail>
>;

/**
 * Map [`ApiGatewayProxyEvent`] to `Req`.
 *
 * Provides default `body`, `queries`, `paths` from the event.
 */
export function eventBridgeRequestMapper<DetailType extends string, Detail>(
    ...[event]: Parameters<EventBridgeRequestMapper<DetailType, Detail>>
): ReturnType<EventBridgeRequestMapper<DetailType, Detail>> {
    const { detail, "detail-type": detailType } = event;

    return {
        ...event,
        detailType,
        detail,
    };
}
