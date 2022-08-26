import { isArrayLike, isPlainObject } from 'lodash'

export const isNullish = (value: unknown): boolean => value == null

export const isEmptyArrayLike = (value: unknown): boolean =>
  isArrayLike(value) && value.length === 0

export const isEmptyObjectLike = (value: any): boolean =>
  isPlainObject(value) && Object.keys(value).length === 0

/**
 * A value is considered empty if it's an empty object (`{}`), empty array
 * (`[]`), or nullish.
 */
export const isEmptyLike = (value: any): boolean => {
  return [isNullish, isEmptyObjectLike, isEmptyArrayLike].some((fn) =>
    fn(value),
  )
}
