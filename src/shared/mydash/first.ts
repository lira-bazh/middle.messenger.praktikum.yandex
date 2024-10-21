export function first<T>(array: T[]): T | undefined {
  if (array.length) {
    return array[0];
  }

  return;
}
