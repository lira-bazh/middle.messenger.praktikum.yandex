import Handlebars from "handlebars";
import {
  Authorization,
  Registration,
  Error,
  Chat,
  Settings,
  Links
} from "./pages";

import { Input, Button, Link } from "./partials";

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Link", Link);

export default class App {
  constructor() {
    this.state = {
      currentPage: "links"
    };
    this.app = document.getElementById("app");
  }
  render() {
    let template;
    let templateParams;

    switch (this.state.currentPage) {
      case "links":
        template = Handlebars.compile(Links);
        break;
      case "authorization":
        template = Handlebars.compile(Authorization);
        break;
      case "registration":
        template = Handlebars.compile(Registration);
        break;
      case "chat":
        template = Handlebars.compile(Chat);
        break;
      case "settings":
        template = Handlebars.compile(Settings);
        break;
      case "500":
        template = Handlebars.compile(Error);
        templateParams = {
          code: 500,
          description: "Скоро всё точно заработает"
        };
        break;
      case "404":
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
    this.state.currentPage = page;
    this.render();
  }

  attachEventListeners() {
    switch (this.state.currentPage) {
      case "links": {
        this.createLinkEvent("authorization");
        this.createLinkEvent("registration");
        this.createLinkEvent("chat");
        this.createLinkEvent("settings");
        this.createLinkEvent("404");
        this.createLinkEvent("500");
        break;
      }
      case "authorization": {
        this.createEntryBtnEvent();
        this.createLinkEvent("registration");
        break;
      }
      case "registration": {
        this.createEntryBtnEvent();
        this.createLinkEvent("authorization");
        break;
      }
      case "chat": {
        this.createLinkEvent("settings");
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

  createLinkEvent(page) {
    const link = document.getElementById(`to-${page}`);
    link.addEventListener("click", (e) => {
      e.preventDefault();
      this.changePage(page);
    });
  }
}
