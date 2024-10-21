import { Block } from './Block';
import { BlockProps } from '@/types';

function render(id: string, block: Block | undefined): Element | null {
  const root = document.getElementById(id);
  if (root && block) {
    root.replaceChildren(block.getContent());
  }
  return root;
}

class Route {
  private _pathname: string;

  private _blockClass: typeof Block;

  private _block: Block | undefined;

  private _props: BlockProps;

  constructor(pathname: string, view: typeof Block, props: BlockProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    }

    render(this._props.rootID, this._block);

    this._block?.show();
  }
}

export class Router {
  routes: Route[] = [];

  history: History = window.history;

  private _currentRoute: Route | undefined;

  private _rootID: string = 'app';

  private static __instance: Router;

  constructor(rootID: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootID = rootID;
    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block, props: BlockProps = {}) {
    const route = new Route(pathname, block, { rootID: this._rootID, ...props });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}
