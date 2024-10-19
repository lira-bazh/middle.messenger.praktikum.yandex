import { InputWithLabel, Button, Form, Link } from '@/components';
import { Block, store } from '@/framework';
import { validationInput, validationRules, validationForm, passwordErrorMsg } from '@/helpers/validation';
import { HTTPTransport } from '@/helpers/request';
import { ENDPOINTS } from '@/constants';
import { BlockProps, EPages } from '@/types';

interface ChangePasswordPageProps extends BlockProps {
  changePage: (page: EPages) => void;
}

const onBlur = (e: Event) => {
  if (e?.target && e.target instanceof HTMLInputElement) {
    validationInput(e.target, validationRules[e.target.name as keyof typeof validationRules]);
  }
};

export class ChangePasswordPage extends Block {
  constructor({ changePage }: ChangePasswordPageProps) {
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
            placeholder: 'Введите&nbsp;пароль',
            required: true,
            error: passwordErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'newPassword',
            type: 'password',
            label: 'Новый пароль',
            placeholder: 'Введите&nbsp;пароль',
            required: true,
            error: passwordErrorMsg,
            onBlur,
          }),
          new InputWithLabel({
            name: 'newPassword_repeat',
            type: 'password',
            label: 'Новый пароль (ещё раз)',
            placeholder: 'Введите&nbsp;пароль',
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

          validationForm(e.target, async data => {
            //@ts-expect-error ругается на тип data
            await new HTTPTransport().put(ENDPOINTS.changePassword, { data }).then(() => {
              changePage(EPages.messenger);
            });
          });
        },
      }),
    });

    void store.dispatch({
      type: 'GET_USER',
      changePage,
    });
  }

  override render() {
    return `
    <main class="page">
      <div class="form-wrapper">
        <h1>Изменить пароль</h1>
        <form class="form">
          {{{ ChangePasswordForm}}}
          {{{ ButtonSave }}}
          {{{ Link }}}
        </form>
      </div>
    </main>`;
  }
}
