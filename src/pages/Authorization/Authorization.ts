import { Link, Button, Form } from '@/shared/components';
import { Block } from '@/shared/framework';
import { validationForm } from '@/shared/helpers/validation';
import { getInputForForm } from '@/shared/helpers/getInputForForm';
import { authorization, changePage } from '@/shared/actions';
import { EPages } from '@/types';

export class AuthorizationPage extends Block {
  constructor() {
    super({
      Link: new Link({
        content: 'Впервые?',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.registration);
        },
      }),
      AuthorizationForm: new Form({
        fields: [getInputForForm('login'), getInputForForm('password')],
        submitButton: new Button({
          text: 'Войти',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          validationForm(e.target, data => {
            authorization(data);
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
