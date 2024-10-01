import { Link, InputWithLabel, Button, Form } from '../../components';
import { Block } from '../../framework';
import { validationInput, loginPattern, passwordPattern, validationForm } from '../../helpers/validation';
import { collectionFormData } from '../../helpers/formCollector';

interface AuthorizationPageProps {
  onLogin: () => void;
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
  constructor({ onLogin }: AuthorizationPageProps) {
    super({
      Link: new Link({
        id: 'to-registration',
        content: 'Впервые?',
      }),
      AuthorizationForm: new Form({
        fields: [
          new InputWithLabel({
            name: 'login',
            type: 'text',
            label: 'Логин',
            placeholder: 'Введите&nbsp;логин',
            required: true,
            onBlur,
          }),
          new InputWithLabel({
            name: 'password',
            type: 'password',
            label: 'Пароль',
            placeholder: 'Введите&nbsp;пароль',
            required: true,
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

          console.log(collectionFormData(e.target));

          validationForm(e.target, validationRules, onLogin);
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