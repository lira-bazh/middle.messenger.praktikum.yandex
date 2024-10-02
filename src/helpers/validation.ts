export const loginPattern = /^[a-zA-Z][a-zA-Z0-9-_]{2,20}$/;
export const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,40}$/;
export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.+.[a-zA-Z]{2,4}$/;
export const namePattern = /^[А-ЯA-Z][a-zA-Zа-яА-Я]*/;
export const phonePattern = /^\+?\d{10,15}$/;

type ValidationFormRules = Record<string, RegExp>;

export const validationInput = (field: EventTarget | RadioNodeList | null, rules: ValidationFormRules): boolean => {
  if (field instanceof HTMLInputElement) {
    if (rules[field.name] && rules[field.name].test(field.value)) {
      field.classList.remove('invalid');
      return true;
    }

    field.classList.add('invalid');
  }

  return false;
};

export const validationForm = (form: EventTarget | null, rules: ValidationFormRules, success: () => void): void => {
  if (form instanceof HTMLFormElement) {
    const results = Object.keys(rules).map(key => validationInput(form.elements.namedItem(key), rules));

    if (results.every(result => result)) {
      success();
    }
  }
};
