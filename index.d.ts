/**
 * Deletes nested key-value pairs by a specified key(s) or remove null, undefined, and empty objects, strings, and arrays from an object.
 * 
 * @param obj - The object being cleaned.
 * @param target - A string or array of strings of key(s) for key-value pair(s) to be cleaned from `obj`.
 * @returns - The cleaned object.
 */
declare function deepCleaner(obj: any, target?: string | string[]): any;

export = deepCleaner;
