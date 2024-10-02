export function isEmpty(arg: unknown): boolean {
  if (
    arg === null ||
    typeof arg === 'undefined' ||
    typeof arg === 'boolean' ||
    typeof arg === 'number'
  ) {
    return true;
  }

  if (Array.isArray(arg) || typeof arg === 'string') {
    return !arg.length;
  }

  if (arg instanceof Map || arg instanceof Set) {
    return !arg.size;
  }

  return !Object.keys(arg).length;
}
