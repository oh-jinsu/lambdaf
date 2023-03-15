import { SQSBatchResponse, SQSHandler } from "aws-lambda";
import { lambda, Lambda, UseCase } from "../core";
import { sqsRequestMapper, WithSqsRecord } from "../request_mappers/sqs";

export type SQSLambda<Req> = Lambda<SQSHandler, WithSqsRecord<Req>[], SQSBatchResponse>;

export type SQSLambdaUseCase<Req> = UseCase<WithSqsRecord<Req>, void>;

export function sqsLambda<Req>(usecase: SQSLambdaUseCase<Req>): ReturnType<SQSLambda<Req>> {
    return lambda(
        sqsRequestMapper,
        (arg) => Promise.all(arg.map(usecase as any)),
        () => 0,
    );
}
