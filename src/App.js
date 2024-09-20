import Handlebars from "handlebars";
import { Authorization, Registration, Error, Chat, Settings } from "./pages";

import { Input, Button, Link } from "./partials";

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Link", Link);

export default class App {
  constructor() {
    this.app = document.getElementById("app");
  }
  render() {
    let template;
    let templateParams;

    switch (window.location.pathname) {
      case "/":
      case "/authorization":
        template = Handlebars.compile(Authorization);
        break;
      case "/registration":
        template = Handlebars.compile(Registration);
        break;
      case "/chat":
        template = Handlebars.compile(Chat);
        break;
      case "/settings":
        template = Handlebars.compile(Settings);
        break;
      case "/500":
        template = Handlebars.compile(Error);
        templateParams = {
          code: 500,
          description: "Скоро всё точно заработает"
        };
        break;
      case "/404":
      default:
        template = Handlebars.compile(Error);
        templateParams = {
          code: 404,
          description: "Страница не найдена"
        };
        break;
    }
    this.app.innerHTML = template(templateParams);
    this.attachEventListeners();
  }

  changePage(page) {
    window.location.href = `${window.location.origin}/${page}`;
  }

  attachEventListeners() {
    switch (window.location.pathname) {
      case "/authorization": {
        this.createEntryBtnEvent();
        break;
      }
      case "/registration": {
        this.createEntryBtnEvent();
        break;
      }
    }
  }

  createEntryBtnEvent() {
    const entryButton = document.getElementById("entry-button");
    entryButton.addEventListener("click", () => {
      this.changePage("chat");
    });
  }
}
