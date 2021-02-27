import {
  html,
  css,
  LitElement,
  registerDefaultIconsets,
  cardComponentStyle,
  elevation1Mixin,
  spacer32,
  spacer64,
  white,
  spacer24,
} from 'ing-web';
import { connect } from 'pwa-helpers/connect-mixin';
import store from './packages/store/store';

registerDefaultIconsets();

export class App extends connect(store)(LitElement) {
  static get properties() {
    return {
      carsInBasket: {type: Array},
      basketValue: {type: Number}
    };
  }
  constructor() {
    super()
    this.carsInBasket = []
    this.basketValue = 0;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  stateChanged({carReducer}) {
    const { carsInBasket, basketValue } = carReducer;
    this.carsInBasket = carsInBasket;
    this.basketValue = basketValue;
  }

  loadPages() {
    const path = location.pathname;
    switch(path) {
      case '/':
      case '/car-shop':
      default:
        import('./pages/car-shop/CarShopContainer.js');
        return html `<car-shop></car-shop>`;
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._storeUnsubscribe();
  }
  render() {
    return html`
      <div class="page-container">
        <header class="header">
          <h1 class="header__title">Gilbert car shop</h1>
          <shopping-basket .carsInBasket=${this.carsInBasket} .basketValue=${this.basketValue}></shopping-basket>
        </header>
        <main class="content">
          ${this.loadPages()}
        </main>
      </div>
    `
  }


  static get styles() {
    return css`
      ${cardComponentStyle}
      .header {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        background-color: ${white};
        height: ${spacer64};
        min-height: ${spacer64};
        padding: 20px;
        box-sizing: border-box;
        ${elevation1Mixin()}
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .header h1 {
        margin: 0;
        flex: 1;
        font-size: ${spacer24}
      }
      .content {
        margin: 90px ${spacer32}
      }
    `;
  }
}

customElements.define('app-root', App);
