import { Block } from '@/shared/framework';
import { Button, ProfileImg, Form, Link, FileLoader } from '@/shared/components';
import { validationForm } from '@/shared/helpers/validation';
import { getInputForForm } from '@/shared/helpers/getInputForForm';
import { getUser, changePage, changeUserAvatar, changeUserInfo } from '@/shared/actions';
import { EPages } from '@/types';

export class SettingsPage extends Block {
  constructor() {
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

            changeUserAvatar(e.target.files[0]);
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
            changeUserInfo(data);
          });
        },
      }),
    });

    getUser();
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
