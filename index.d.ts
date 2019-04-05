/**
 * Deletes nested key, value pairs on an object with the provided key, empty objects, empty strings, null, and undefined values.
 * 
 * @param obj - The object being cleaned.
 * @param target - A string or array of strings of key(s) for key-value pair(s) to be cleaned from `obj`.
 * @returns - The cleaned object.
 */
declare function deepCleaner(obj: any, target?: string | string[]): any;

export = deepCleaner;
