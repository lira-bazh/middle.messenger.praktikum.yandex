export function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (let i = 0; i < aKeys.length; i++) {
    if (aKeys[i] !== bKeys[i]) {
      return false;
    }

    if (typeof a[aKeys[i]] === 'object' && typeof b[bKeys[i]] === 'object') {
      if (Array.isArray(a[aKeys[i]]) && Array.isArray(b[bKeys[i]])) {
        if (a[aKeys[i]].length !== a[aKeys[i]].length) {
          return false;
        }
        for (let k = 0; k < a[aKeys[i]].length; k++) {
          if (!isEqual(a[aKeys[i]][k], b[bKeys[i]][k])) {
            return false;
          }
        }
      }

      if (
        (!Array.isArray(a[aKeys[i]]) && Array.isArray(b[bKeys[i]])) ||
        (Array.isArray(a[aKeys[i]]) && !Array.isArray(b[bKeys[i]]))
      ) {
        return false;
      }

      if (!isEqual(a[aKeys[i]], b[bKeys[i]])) {
        return false;
      }
    } else if (a[aKeys[i]] !== b[bKeys[i]]) {
      return false;
    }
  }

  return true;
}