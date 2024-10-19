import { Link, Button, Form } from '@/components';
import { Block } from '@/framework';
import { HTTPTransport } from '@/helpers/request';
import { validationForm } from '@/helpers/validation';
import { getInputForForm } from '@/helpers/getInputForForm';
import { ENDPOINTS } from '@/constants';
import { BlockProps, EPages } from '@/types';

interface AuthorizationPageProps extends BlockProps {
  changePage: (page: EPages) => void;
}

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
        fields: [getInputForForm('login'), getInputForForm('password')],
        submitButton: new Button({
          text: 'Войти',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          validationForm(e.target, async data => {
            await new HTTPTransport()
              //@ts-expect-error ругается на тип data
              .post(ENDPOINTS.signin, { data })
              .then(() => {
                changePage(EPages.messenger);
              })
              .catch(error => {
                try {
                  const message = JSON.parse(error.message).reason;
                  if (message === 'User already in system') {
                    changePage(EPages.messenger);
                  }
                } catch {
                  changePage(EPages.registration);
                }
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
