import { Link, Button, Form } from '@/components';
import { Block } from '@/framework';
import { HTTPTransport } from '@/helpers/request';
import { validationForm } from '@/helpers/validation';
import { getInputForForm } from '@/helpers/getInputForForm';
import { ENDPOINTS } from '@/constants';
import { BlockProps, EPages } from '@/types';

interface RegistrationPageProps extends BlockProps {
  changePage: (page: EPages) => void;
}

export class RegistrationPage extends Block {
  constructor({ changePage }: RegistrationPageProps) {
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

          validationForm(e.target, async data => {
            //@ts-expect-error ругается на тип data
            await new HTTPTransport().post(ENDPOINTS.signup, { data });
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
