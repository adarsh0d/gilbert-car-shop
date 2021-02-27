import {
  html,
  LitElement,
  registerDefaultIconsets,
} from 'ing-web';

registerDefaultIconsets();

export class App extends LitElement {
  constructor() {
    super()
  }

  loadPages() {
    const { pathname } = location;
    switch(pathname) {
      case '/':
      case '/car-shop':
      default:
        import('./pages/car-shop/CarShopContainer.js');
        return html `<car-shop></car-shop>`;
    }
  }

  render() {
    return html`
      ${this.loadPages()}
    `
  }

}

customElements.define('app-root', App);
