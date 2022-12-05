/**
 * It receives a key and value pair and map it.
 */
type KeyValueMapper<K extends string | number | symbol = string, V = unknown> = (params: [key: K, value: V]) => [key: K, value: V];

/**
 * Converts all the keys of an object in a string to camelcase.
 */
export const map =
    <K extends string | number | symbol = string, V = unknown>(mapper: KeyValueMapper<K, V>) =>
    (value: any): any => {
        if (value === null || value === undefined) {
            return undefined;
        }

        if (Array.isArray(value)) {
            return value.map(map(mapper));
        }

        if (value.constructor === Object) {
            return Object.entries(value).reduce((prev, [k, v]: any) => {
                const [key, value] = mapper([k, v]);

                return {
                    ...prev,
                    [key]: value,
                };
            }, {});
        }

        return mapper(["" as any, value])[1];
    };
