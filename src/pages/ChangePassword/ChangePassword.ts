import { InputWithLabel, Button, Form, Link } from '@/shared/components';
import { Block } from '@/shared/framework';
import { validationInput, validationRules, validationForm, passwordErrorMsg } from '@/shared/helpers/validation';
import { changePage, changeUserPassword } from '@/shared/actions';
import { EPages } from '@/types';

const onBlur = (e: Event) => {
  if (e?.target && e.target instanceof HTMLInputElement) {
    validationInput(e.target, validationRules[e.target.name as keyof typeof validationRules]);
  }
};

export class ChangePasswordPage extends Block {
  constructor() {
    super({
      Link: new Link({
        content: 'Вернуться',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.messenger);
        },
      }),
      ChangePasswordForm: new Form({
        fields: [
          new InputWithLabel({
            name: 'oldPassword',
            type: 'password',
            label: 'Текущий пароль',
            placeholder: 'Введите&#32;пароль',
            required: true,
            error: passwordErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'newPassword',
            type: 'password',
            label: 'Новый пароль',
            placeholder: 'Введите&#32;пароль',
            required: true,
            error: passwordErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'newPassword_repeat',
            type: 'password',
            label: 'Новый пароль (ещё раз)',
            placeholder: 'Введите&#32;пароль',
            required: true,
            error: passwordErrorMsg,
            onBlur,
          }),
        ],
        submitButton: new Button({
          text: 'Сохранить настройки',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          validationForm(e.target, data => {
            changeUserPassword(data);
          });
        },
      }),
    });
  }

  override render() {
    return `
    <main class="page">
      <div class="form-wrapper">
        <h1>Изменить пароль</h1>
        <form class="form">
          {{{ ChangePasswordForm}}}
          {{{ Link }}}
        </form>
      </div>
    </main>`;
  }
}
