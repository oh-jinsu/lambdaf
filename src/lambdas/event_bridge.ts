import { EventBridgeHandler } from "aws-lambda";
import { lambda, Lambda, UseCase } from "../core";
import { EventBridgeRequest, eventBridgeRequestMapper, WithEventBridgeEvent } from "../request_mappers";

/**
 * A type of [`eventBridgeLambda`] function.
 */
export type EventBridgeLambda<Req extends EventBridgeRequest> = Lambda<EventBridgeHandler<Req["detailType"], Req["detail"], void>, Req, void>;

export type EventBridgeLambdaUseCase<Req extends EventBridgeRequest> = UseCase<WithEventBridgeEvent<Req>, void>;

export function eventBridgeLambda<Req extends EventBridgeRequest>(usecase: EventBridgeLambdaUseCase<Req>): ReturnType<EventBridgeLambda<Req>> {
    return lambda(eventBridgeRequestMapper, usecase, () => {});
}
