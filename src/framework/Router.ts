import { Block } from './Block';
import { BlockProps } from '../types';

function render(query: string, block: Block | undefined): Element | null {
  const root = document.querySelector(query);
  if (root && block instanceof Block) {
    root.replaceChildren(block.getContent());
  }
  return root;
}

class Route {
  private _pathname: string;

  private _blockClass: Block | undefined;

  private _block: Block | undefined;

  private _props: BlockProps;

  constructor(pathname: string, view: Block, props: BlockProps) {
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
    if (!this._block && this._blockClass instanceof Block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block?.show();
  }
}

export class Router {
  routes: Route[] = [];

  history: History = window.history;

  private _currentRoute: Route | undefined;

  private _rootQuery: string = '.app';

  private static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute(event.currentTarget?.location?.pathname);
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
