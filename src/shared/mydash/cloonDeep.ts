export const cloonDeep = <T>(value: T): T => JSON.parse(JSON.stringify(value));
