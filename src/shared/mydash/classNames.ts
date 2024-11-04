type SimpleTypes = string | number | null | undefined | boolean;
type ArrItem = SimpleTypes | ArrItem[];

const valueToString = (value: SimpleTypes | Record<string, boolean> | ArrItem[]): string => {
  let result = '';

  if (typeof value === 'string' && value) {
    result += ' ';
    result += value;
  }

  if (typeof value === 'number' && value && value > 0) {
    result += ' ';
    result += value.toString();
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      for (const val of value) {
        result += valueToString(val);
      }
    } else if (value) {
      Object.keys(value).forEach(key => {
        if (value[key]) {
          result += ' ';
          result += key;
        }
      });
    }
  }

  return result;
};

export function classNames(...args: (SimpleTypes | Record<string, boolean> | ArrItem[])[]): string {
  let result = '';

  for (const arg of args) {
    result += valueToString(arg);
  }

  return result;
}
