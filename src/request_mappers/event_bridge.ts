import { EventBridgeEvent, EventBridgeHandler } from "aws-lambda";
import { RequestMapper } from "../core";

/**
 * Should provide `detail`, `detailType` from the event.
 */
export type EventBridgeRequest<T = any> = {
    detailType: string;
    detail: T;
};

export type WithEventBridgeEvent<Req extends EventBridgeRequest> = Omit<EventBridgeEvent<string, Req["detail"]>, "detail-type"> & {
    detailType: string;
};

/**
 * A type of [`EventBridgeRequestMapper`] function.
 */
export type EventBridgeRequestMapper<Req extends EventBridgeRequest> = RequestMapper<
    EventBridgeHandler<Req["detailType"], Req["detail"], void>,
    WithEventBridgeEvent<Req>
>;

/**
 * Map [`ApiGatewayProxyEvent`] to `Req`.
 *
 * Provides default `body`, `queries`, `paths` from the event.
 */
export function eventBridgeRequestMapper<Req extends EventBridgeRequest>(
    ...[event]: Parameters<EventBridgeRequestMapper<Req>>
): ReturnType<EventBridgeRequestMapper<Req>> {
    const { detail, "detail-type": detailType } = event;

    return {
        ...event,
        detailType,
        detail,
    };
}
