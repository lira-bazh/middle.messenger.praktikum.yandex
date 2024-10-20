import { InputWithLabel, Button, Form, Link } from '@/shared/components';
import { Block, store } from '@/framework';
import { validationInput, validationRules, validationForm, passwordErrorMsg } from '@/shared/helpers/validation';
import { getUser, changePassword } from '@/shared/api';
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

          validationForm(e.target, data => {
            void changePassword(data).then(() => {
              changePage(EPages.messenger);
            });
          });
        },
      }),
    });

    void getUser()
      .then(data => {
        void store.dispatch({
          type: 'GET_USER',
          data,
        });
      })
      .catch(() => {
        changePage(EPages.default);
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
