/**
 * Receive a key and value pair and transform it.
 */
type KeyValueMapper<K extends string | number | symbol = string, V = unknown> = (params: [key: K, value: V]) => [key: K, value: V];

/**
 * Map a value. If the value is an object,
 * It converts the key value pair by the passed mapper.
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
