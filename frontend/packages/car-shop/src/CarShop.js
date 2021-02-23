import {
  cardComponentStyle,
  css,
  html,
  linkComponentStyle,
  LitElement,
  ScopedElementsMixin,
  spacer64,
} from 'ing-web';
import { cars } from '../test/cars';

export class CarShop extends ScopedElementsMixin(LitElement) {
  constructor() {
    super();
    this.cars = cars;
  }

  async connectedCallback() {
    super.connectedCallback();
    //this.cars = await this._fetchData();
  }

  async _fetchData() {
    let data = [];
    const response = await fetch('/search/cars');
    if(response) {
      data = await response.json();
    }
    return data;
  }

  render() {
    return html`
      <main class="page-container">
        <header class="header">
          <h1 class="header__title">Gilbert car shop</h1>
        </header>
        <cars-list .cars=${this.cars}></cars>
      </main>
    `;
  }

  static get styles() {
    return css`
      ${linkComponentStyle}
      ${cardComponentStyle}

      .page-container {
        text-align: center;
        margin-top: ${spacer64};
      }

      .intro {
        display: inline-block;
        margin: 0 auto;
      }
    `;
  }
}
