/* eslint-disable @typescript-eslint/no-explicit-any */


export interface ArrayObject<T extends object> {
    ids: (string | number)[],
    data: Record<string | number, T>
}

export function normalizeArray<T extends object>(items: T[], normalizedData: ArrayObject<T> = { ids: [], data: {} } as ArrayObject<T>, keyName: string = "id") {
    items.map((item: any) => {
        if (!normalizedData.ids.includes(item[keyName])) {
            normalizedData.ids.push(item[keyName]);
            normalizedData.data[item[keyName] as (string | number)] = item;
        }
    });
    return normalizedData;
}

export function denormalizeObject<T extends object>(normalizedData: ArrayObject<T>): T[] {
    return normalizedData.ids.map((id) => normalizedData.data[id]);
}