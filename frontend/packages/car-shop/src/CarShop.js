import {
  cardComponentStyle,
  css,
  html,
  elevation1Mixin,
  LitElement,
  ScopedElementsMixin,
  spacer32,
  spacer64,
  white,
} from 'ing-web';
import { CarsList } from './CarsList';

export class CarShop extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'cars-list': CarsList
    };
  }
  constructor() {
    super();
    this.cars = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    this.cars = await this._fetchData();
    this.requestUpdate();
  }

  async _fetchData() {
    let data = [];
    const response = await fetch('/search/cars');
    if (response) {
      data = await response.json();
    }
    return data;
  }

  render() {
    return html`
      <div class="page-container">
        <header class="header">
          <h1 class="header__title">Gilbert car shop</h1>
        </header>
        <main class="content">
          <cars-list .cars=${this.cars}></cars-list>
        </main>
      </div>
    `;
  }

  static get styles() {
    return css`
      ${cardComponentStyle}
      .header {
        background-color: ${white};
        height: ${spacer64};
        min-height: ${spacer64};
        padding: 10px;
        box-sizing: border-box;
        ${elevation1Mixin()}
      }
      .header h1 {
        margin: 0;
      }
      .content {
        margin: ${spacer32} ${spacer32}
      }

      .intro {
        display: inline-block;
        margin: 0 auto;
      }
    `;
  }
}

