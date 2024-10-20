import { Block, store } from '@/framework';
import { Button, ProfileImg, Form, Link, FileLoader } from '@/shared/components';
import { validationForm } from '@/shared/helpers/validation';
import { getInputForForm } from '@/shared/helpers/getInputForForm';
import { getUser, changeProfile, changeProfileAvatar } from '@/shared/api';
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

            void changeProfileAvatar(e.target.files[0]).then((data) => {
              store.dispatch({
                type: 'CHANGE_PROFILE_IMG',
                data,
              });
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

          validationForm(e.target, data => {
            void changeProfile(data).then(result => {
              store.dispatch({
                type: 'CHANGE_PROFILE',
                data: result,
              });
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
