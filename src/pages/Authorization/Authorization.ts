import { Link, InputWithLabel, Button, Form } from '../../components';
import { Block, store } from '../../framework';
import { validationInput, loginPattern, passwordPattern, validationForm, loginErrorMsg, passwordErrorMsg } from '../../helpers/validation';
import { BlockProps, EPages } from '../../types';

interface AuthorizationPageProps extends BlockProps {
  changePage: (page: EPages) => void;
}

const validationRules = {
  login: loginPattern,
  password: passwordPattern,
};

const onBlur = (e: Event) => {
  if (e?.target) {
    validationInput(e.target, validationRules);
  }
};
export class AuthorizationPage extends Block {
  constructor({ changePage }: AuthorizationPageProps) {
    super({
      Link: new Link({
        content: 'Впервые?',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.registration);
        },
      }),
      AuthorizationForm: new Form({
        fields: [
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
            name: 'password',
            type: 'password',
            label: 'Пароль',
            placeholder: 'Введите&nbsp;пароль',
            required: true,
            error: passwordErrorMsg,
            onBlur,
          }),
        ],
        submitButton: new Button({
          id: 'entry-button',
          text: 'Войти',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          validationForm(e.target, validationRules, async data => {
            await store
              .dispatch({
                type: 'SIGNIN',
                data,
              })
              .then(() => {
                changePage(EPages.chat);
              }).catch(() => {
                changePage(EPages.registration);
              });
          });
        },
      }),
    });
  }

  override render() {
    return `
    <main class="page">
      <div class="form-wrapper">
        <h1>Вход</h1>
        {{{ AuthorizationForm }}}
        {{{ Link }}}
      </div>
    </main>`;
  }
}
