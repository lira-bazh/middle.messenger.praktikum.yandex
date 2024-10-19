import { Block, store } from '@/framework';
import { Button, ProfileImg, Form, Link, FileLoader } from '@/components';
import { validationForm } from '@/helpers/validation';
import { getInputForForm } from '@/helpers/getInputForForm';
import { BlockProps, EPages, IUser } from '@/types';

interface SettingsPageProps extends BlockProps {
  changePage: (page: EPages) => void;
  user: IUser;
}

export class SettingsPage extends Block {
  constructor({ changePage }: SettingsPageProps) {
    super({
      Link: new Link({
        content: 'Вернуться',
        onClick: (e: Event) => {
          e.preventDefault();
          changePage(EPages.messenger);
        },
      }),
      ProfileImgSelector: new FileLoader({
        content: new ProfileImg(),
        onChange: (e: Event) => {
          e.preventDefault();
          if (e.target instanceof HTMLInputElement && e.target.files?.length) {
            console.log('e.target.files[0]', e.target.files[0]);
            void store.dispatch({
              type: 'CHANGE_PROFILE_IMG',
              avatar: e.target.files[0],
            });
          }
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
          {{{ ProfileImgSelector }}}
          {{{ SettingsForm}}}
          {{{ ButtonSave }}}
           {{{ Link }}}
        </form>
      </div>
    </main>`;
  }
}
