import { SQSRecord, SQSHandler } from "aws-lambda";
import { toCamelCase } from "../common/case";
import { map } from "../common/map";
import { RequestMapper } from "../core";

export type WithSqsRecord<Req> = Omit<SQSRecord, "body"> & {
    body: Req;
};

export type SQSRequestMapper<Req> = RequestMapper<SQSHandler, WithSqsRecord<Req>[]>;

export function sqsRequestMapper<Req>(...[event]: Parameters<SQSRequestMapper<Req>>): ReturnType<SQSRequestMapper<Req>> {
    return event.Records.map(({ body, ...record }) => {
        const mapByCamelCase = map(([key, value]) => [toCamelCase(key), value]);

        return {
            ...record,
            body: mapByCamelCase(body ? JSON.parse(body) : {}),
        };
    });
}
