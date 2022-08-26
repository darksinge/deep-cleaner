import { isArray, isPlainObject, cloneDeep } from 'lodash'
import type { PartialDeep } from 'type-fest'
import { isEmptyLike } from './utils'

type DeepPartial<T> = PartialDeep<T, { recurseIntoArrays: false }>

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
  root: any,
  visited: WeakSet<object>,
  skipEmpty: boolean,
  target?: string,
): void => {
  if (visited.has(root)) {
    return void 0
  }

  if (isPlainObject(root)) {
    visited.add(root)
    for (const key in root) {
      const empty = !skipEmpty && isEmptyLike(root[key])
      if (target === key || empty) {
        delete root[key]
        continue
      }

      recursiveClean(root[key], visited, skipEmpty, target)
    }
  } else if (isArray(root)) {
    visited.add(root)
    for (const child of root) {
      recursiveClean(child, visited, skipEmpty, target)
    }
  } else {
    return void 0
  }

  // preform an extra pass over to check if the root object became empty after
  // cleaning it's children
  if (!skipEmpty && isPlainObject(root)) {
    for (const key in root) {
      if (isEmptyLike(root[key])) {
        delete root[key]
      }
    }
  }

  return void 0
}

export function cleanBy<T>(
  value: T,
  targets: string | string[],
  options?: CleanOptions,
): DeepPartial<T> {
  if (!isArray(targets)) {
    targets = [targets]
  }

  if (options?.clone) {
    value = cloneDeep(value)
  }

  const skipEmpty = !!options?.skipEmpty
  for (const target of targets) {
    recursiveClean(value, new WeakSet(), skipEmpty, target)
  }

  return value as DeepPartial<T>
}

export function clean<T>(value: T, options?: CleanOptions): DeepPartial<T> {
  if (options?.clone) {
    value = cloneDeep(value)
  }

  const skipEmpty = !!options?.skipEmpty
  recursiveClean(value, new WeakSet(), skipEmpty)
  return value as DeepPartial<T>
}
