export const loginPattern = /^[a-zA-Z][a-zA-Z0-9-_]{3,20}$/;
export const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,40}$/;
export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+.+.[a-zA-Z]{2,4}$/;
export const namePattern = /^[А-ЯA-Z][a-zA-Zа-яА-Я]*/;
export const phonePattern = /^\+?\d{10,15}$/;

export const loginErrorMsg =
  'Логин должен быть написан латиницей, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание), от 3 до 20 символов';
export const passwordErrorMsg =
  'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
export const emailErrorMsg =
  'Email должен быть написан латиницей, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы';
export const nameErrorMsg =
  'Может содержать латиницу или кириллицу, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
export const phoneErrorMsg = 'Номер телефона должен содержать от 10 до 15 символов, состоит из цифр, может начинается с плюса';


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

export const validationForm = (form: EventTarget | null, rules: ValidationFormRules, success?: () => void): void => {
  if (form instanceof HTMLFormElement) {
    const results = Object.keys(rules).map(key => validationInput(form.elements.namedItem(key), rules));

    if (results.every(result => result) && success) {
      success();
    }
  }
};
