import { Link, Input, Button } from '../../partials';
import { Block } from '../../framework';

export class AnswerPage extends Block {
  constructor() {
    super({
      Link: new Link({
        id: 'to-registration',
        content: 'Впервые?',
        onClick: e => {
          e.preventDefault();
        },
      }),
      InputLogin: new Input({
        name: 'login',
        type: 'text',
        label: 'Логин',
        placeholder: 'Введите логин',
      }),
      InputPassword: new Input({
        name: 'password',
        type: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль',
      }),
      ButtonEntry: new Button({
        id: 'entry-button',
        text: 'Войти',
      }),
    });
  }

  override render() {
    return `
    <main class="page">
      <div class="form-wrapper">
        <h1>Вход</h1>
        <form class="form">
          <div class="fields">
            {{{ InputLogin }}}
            {{{ InputPassword }}}
          </div>
          {{{ ButtonEntry }}}
        </form>
        {{{ Link }}}
      </div>
    </main>`;
  }
}