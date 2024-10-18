import { InputWithLabel, InputWithLabelProps } from '../components';
import {
  validationInput,
  loginErrorMsg,
  loginPattern,
  emailErrorMsg,
  emailPattern,
  nameErrorMsg,
  namePattern,
  phoneErrorMsg,
  phonePattern,
  passwordErrorMsg,
  passwordPattern,
} from '../helpers/validation';

export const getInputForForm = (name: 'login' | 'email' | 'first_name' | 'second_name' | 'phone' | 'password' | 'password_repeat'): InputWithLabel => {
  const commonProps: Pick<InputWithLabelProps, 'name' | 'type' | 'required' | 'getValueFromState'> = {
    name,
    type: 'text',
    required: true,
    getValueFromState:
      name === 'password' || name === 'password_repeat'
        ? undefined
        : state => {
          if (state.user) {
            return state.user[name];
          }
          return undefined;
        },
  };

  const handleBlur = (pattern: RegExp) => (e: Event) => {
    if (e?.target) {
      validationInput(e.target, pattern);
    }
  };

  switch (name) {
    case 'login':
      return new InputWithLabel({
        ...commonProps,
        label: 'Логин',
        placeholder: 'Введите&nbsp;логин',
        error: loginErrorMsg,
        onBlur: handleBlur(loginPattern),
      });
    case 'email':
      return new InputWithLabel({
        ...commonProps,
        label: 'Почта',
        placeholder: 'Введите&nbsp;почту',
        error: emailErrorMsg,
        onBlur: handleBlur(emailPattern),
      });
    case 'first_name':
      new InputWithLabel({
        ...commonProps,
        label: 'Имя',
        placeholder: 'Введите&nbsp;имя',
        error: nameErrorMsg,
        onBlur: handleBlur(namePattern),
      });
    case 'second_name':
      return new InputWithLabel({
        ...commonProps,
        label: 'Фамилия',
        placeholder: 'Введите&nbsp;фамилию',
        error: nameErrorMsg,
        onBlur: handleBlur(namePattern),
      });
    case 'phone':
      return new InputWithLabel({
        ...commonProps,
        label: 'Телефон',
        placeholder: 'Введите&nbsp;телефон',
        error: phoneErrorMsg,
        onBlur: handleBlur(phonePattern),
      });
    case 'password':
      return new InputWithLabel({
        ...commonProps,
        type: 'password',
        label: 'Пароль',
        placeholder: 'Введите&nbsp;пароль',
        error: passwordErrorMsg,
        onBlur: handleBlur(passwordPattern),
      });
    case 'password_repeat':
      return new InputWithLabel({
        ...commonProps,
        type: 'password',
        label: 'Пароль (ещё раз)',
        placeholder: 'Введите&nbsp;пароль',
        error: passwordErrorMsg,
        onBlur: handleBlur(passwordPattern),
      });
  }
};