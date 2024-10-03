import { Link, InputWithLabel, Button, Form } from '../../components';
import { Block } from '../../framework';
import {
  validationInput,
  loginPattern,
  passwordPattern,
  validationForm,
  emailPattern,
  namePattern,
  phonePattern,
  loginErrorMsg,
  passwordErrorMsg,
  emailErrorMsg,
  nameErrorMsg,
  phoneErrorMsg,
} from '../../helpers/validation';
import { collectionFormData } from '../../helpers/formCollector';
import { BlockProps, EPages } from '../../types';

interface RegistrationPageProps extends BlockProps {
  onLogin: () => void;
  onLinkClick: (page: EPages) => void;
}

const validationRules = {
  login: loginPattern,
  password: passwordPattern,
  email: emailPattern,
  first_name: namePattern,
  second_name: namePattern,
  phone: phonePattern,
};

const onBlur = (e: Event) => {
  if (e?.target) {
    validationInput(e.target, validationRules);
  }
};

export class RegistrationPage extends Block {
  constructor({ onLogin, onLinkClick }: RegistrationPageProps) {
    super({
      RegistrationForm: new Form({
        fields: [
          new InputWithLabel({
            name: 'email',
            type: 'text',
            label: 'Почта',
            placeholder: 'Введите&nbsp;почту',
            required: true,
            error: emailErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'login',
            type: 'text',
            label: 'Логин',
            placeholder: 'Введите&nbsp;логин',
            required: true,
            error: loginErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'first_name',
            type: 'text',
            label: 'Имя',
            placeholder: 'Введите&nbsp;имя',
            required: true,
            error: nameErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'second_name',
            type: 'text',
            label: 'Фамилия',
            placeholder: 'Введите&nbsp;фамилию',
            required: true,
            error: nameErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'phone',
            type: 'text',
            label: 'Телефон',
            placeholder: 'Введите&nbsp;телефон',
            required: true,
            error: phoneErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'password',
            type: 'password',
            label: 'Пароль',
            placeholder: 'Введите&nbsp;пароль',
            required: true,
            error: passwordErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'password_repeat',
            type: 'password',
            label: 'Пароль (ещё раз)',
            placeholder: 'Введите&nbsp;пароль',
            required: true,
            error: passwordErrorMsg,
            onBlur,
          }),
        ],
        submitButton: new Button({
          id: 'entry-button',
          text: 'Зарегистрироваться',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          console.log(collectionFormData(e.target));

          validationForm(e.target, validationRules, onLogin);
        },
      }),
      Link: new Link({
        content: 'Уже зарегистрированы?',
        onClick: (e: Event) => {
          e.preventDefault();
          onLinkClick(EPages.authorization);
        },
      }),
    });
  }

  override render() {
    return `
    <main class="page">
      <div class="form-wrapper">
        <h1>Вход</h1>
        {{{ RegistrationForm}}}
        {{{ Link }}}
      </div>
    </main>`;
  }
}
