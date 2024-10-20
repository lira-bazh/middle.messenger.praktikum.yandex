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

export const validationRules = {
  login: loginPattern,
  password: passwordPattern,
  password_repeat: passwordPattern,
  email: emailPattern,
  first_name: namePattern,
  second_name: namePattern,
  phone: phonePattern,
  oldPassword: passwordPattern,
  newPassword: passwordPattern,
  newPassword_repeat: passwordPattern,
  title: namePattern,
};

export const validationInput = (field: EventTarget | RadioNodeList | null, rule: RegExp | undefined): string | undefined => {
  if (field instanceof HTMLInputElement) {
    if (rule && rule.test(field.value)) {
      field.classList.remove('invalid');
      return field.value;
    }

    field.classList.add('invalid');
  }

  return undefined;
};

export const validationForm = (
  form: EventTarget | null,
  success?: (data: Record<string, any>) => Promise<void> | void,
): void => {
  const data: Record<string, any> = {};

  if (form instanceof HTMLFormElement) {
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
      const field = elements[i];
      if (field instanceof HTMLInputElement) {
        data[field.name] = validationInput(field, validationRules[field.name as keyof typeof validationRules]);

        if (!data[field.name]) {
          return;
        }
      }
    }

    if (success) {
      void success(data);
    }
  }
};
