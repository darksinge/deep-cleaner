import { isArray, isPlainObject, isEmpty, cloneDeep } from 'lodash'

type Cleanable<T> = T | Array<Cleanable<T>>

export interface CleanOptions {
  /**
   * Skip over and do not clean empty values. A value is considered empty if
   * it's a falsey value, an empty object (`{}`), or an empty array (`[]`).
   *
   * Use this option when you only want to remove properties specified by the
   * `target` option. This can be useful when you want to discard certain values
   * but retain the overall shape of the original object.
   *
   * @example
   * ```
   * > const user = {
   * ...   name: 'fred',
   * ...   friends: [],
   * ...   password: 'soopersekritssshhhh',
   * ... }
   * > cleanBy({ ...user }, 'password', { skipEmpty: true,  })
   * { name: 'fred', friends: [] }
   * > cleanBy({ ...user }, 'password', { skipEmpty: false })
   * { name: 'fred' }
   * ```
   *
   * @default {false}
   */
  skipEmpty?: boolean

  /**
   * Deep clones the original object when `true`. Use this if you don't want to
   * mutate the original object.
   * @default {false}
   */
  clone?: boolean
}

const recursiveClean = (
  obj: any,
  visited: WeakSet<any>,
  skipEmpty: boolean,
  target?: string,
): void => {
  if (visited.has(obj)) {
    return void 0
  }
  visited.add(obj)

  if (isPlainObject(obj)) {
    for (const key in obj) {
      const shouldDelete = target == null ? isEmpty(obj[key]) : key === target
      if (shouldDelete) {
        delete obj[key]
        continue
      }

      recursiveClean(obj[key], visited, skipEmpty, target)
    }
  } else if (isArray(obj)) {
    for (const i in obj) {
      recursiveClean(obj[i], visited, skipEmpty, target)
    }
  }

  return void 0
}

export function cleanBy<T>(
  obj: Cleanable<T>,
  targets: string | string[],
  options?: CleanOptions,
): Cleanable<Partial<T>> {
  if (typeof targets === 'string') {
    targets = [targets]
  }

  if (options?.clone) {
    obj = cloneDeep(obj)
  }

  const skipEmpty = !!options?.skipEmpty
  for (const t of targets) {
    recursiveClean(obj, new WeakSet(), skipEmpty, t)
  }

  return obj
}

export function clean<T>(obj: Cleanable<T>, options?: CleanOptions) {
  if (options?.clone) {
    obj = cloneDeep(obj)
  }

  const skipEmpty = !!options?.skipEmpty
  return recursiveClean(obj, new WeakSet(), skipEmpty)
}
