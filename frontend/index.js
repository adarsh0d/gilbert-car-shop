import {
  html,
  LitElement,
  registerDefaultIconsets,
} from 'ing-web';

import './pages/car-shop';

registerDefaultIconsets();

export class App extends LitElement {
  constructor() {
    super()
  }
  render() {
    return html`
      <car-shop></car-shop>
    `
  }
}

customElements.define('app-root', App);
