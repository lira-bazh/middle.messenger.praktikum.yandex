import { Link, Button, Form } from '@/shared/components';
import { Block } from '@/framework';
import { validationForm } from '@/shared/helpers/validation';
import { getInputForForm } from '@/shared/helpers/getInputForForm';
import { signin } from '@/shared/api';
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

          validationForm(e.target, data => {
            void signin(data)
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
