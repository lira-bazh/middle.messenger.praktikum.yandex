type Indexed<T = unknown> = Record<string, T>;

export function merge(left: Indexed, right: Indexed): Indexed {
  const keys = new Set([...Object.keys(left), ...Object.keys(right)]);

  const result: Indexed = {};

  keys.forEach(key => {
    if (typeof left[key] !== 'object' && left[key]) {
      result[key] = left[key];
    }

    if (typeof right[key] !== 'object' && right[key]) {
      result[key] = right[key];
    }

    if (typeof left[key] === 'object' && typeof right[key] === 'object') {
      result[key] = merge(left[key] as Indexed, right[key] as Indexed);
    }
  });

  return result;
}
