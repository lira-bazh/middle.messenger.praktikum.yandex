import { Button, DefaultProfileImg, Form, Link } from '../../components';
import { Block, store } from '../../framework';
import { validationForm } from '../../helpers/validation';
import { getInputForForm } from '../../helpers/getInputForForm';
import { BlockProps, EPages, IUser } from '../../types';

interface SettingsPageProps extends BlockProps {
  changePage: (page: EPages) => void;
  user: IUser;
}

export class SettingsPage extends Block {
  constructor({ changePage }: SettingsPageProps) {
    super({
      ProfileImg: new DefaultProfileImg(),
      Link: new Link({
        content: 'Вернуться',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.messenger);
        },
      }),
      SettingsForm: new Form({
        fields: [
          getInputForForm('email'),
          getInputForForm('login'),
          getInputForForm('first_name'),
          getInputForForm('second_name'),
          getInputForForm('phone'),
        ],
        submitButton: new Button({
          text: 'Сохранить настройки',
          type: 'submit',
        }),
        onSubmit: e => {
          e.preventDefault();
          e.stopPropagation();

          validationForm(e.target, async data => {
            await store
              .dispatch({
                type: 'CHANGE_PROFILE',
                data,
              })
              .then(() => {
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
        <h1>Профиль</h1>
        <form class="form">
          {{{ ProfileImg }}}
          {{{ SettingsForm}}}
          {{{ ButtonSave }}}
           {{{ Link }}}
        </form>
      </div>
    </main>`;
  }
}
