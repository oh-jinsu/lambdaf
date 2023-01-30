import { EventBridgeHandler } from "aws-lambda";
import { lambda, Lambda, UseCase } from "../core";
import { eventBridgeRequestMapper, WithEventBridgeEvent } from "../request_mappers";

/**
 * A type of [`eventBridgeLambda`] function.
 */
export type EventBridgeLambda<DetailType extends string, Detail> = Lambda<
    EventBridgeHandler<DetailType, Detail, void>,
    WithEventBridgeEvent<DetailType, Detail>,
    void
>;

export type EventBridgeLambdaUseCase<DetailType extends string, Detail> = UseCase<WithEventBridgeEvent<DetailType, Detail>, void>;

export function eventBridgeLambda<DetailType extends string, Detail>(
    usecase: EventBridgeLambdaUseCase<DetailType, Detail>,
): ReturnType<EventBridgeLambda<DetailType, Detail>> {
    return lambda(eventBridgeRequestMapper, usecase, () => 0);
}
