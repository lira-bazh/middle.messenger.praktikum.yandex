import { Link, Button, Form } from '@/shared/components';
import { Block } from '@/shared/framework';
import { validationForm } from '@/shared/helpers/validation';
import { getInputForForm } from '@/shared/helpers/getInputForForm';
import { createUser, changePage } from '@/shared/actions';
import { EPages } from '@/types';

export class RegistrationPage extends Block {
  constructor() {
    super({
      RegistrationForm: new Form({
        fields: [
          getInputForForm('email'),
          getInputForForm('login'),
          getInputForForm('first_name'),
          getInputForForm('second_name'),
          getInputForForm('phone'),
          getInputForForm('password'),
          getInputForForm('password_repeat'),
        ],
        submitButton: new Button({
          text: 'Зарегистрироваться',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          validationForm(e.target, data => {
            createUser(data);
          });
        },
      }),
      Link: new Link({
        content: 'Уже зарегистрированы?',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.default);
        },
      }),
    });
  }

  override render() {
    return `
    <main class="page">
      <div class="form-wrapper">
        <h1>Регистрация</h1>
        {{{ RegistrationForm}}}
        {{{ Link }}}
      </div>
    </main>`;
  }
}
