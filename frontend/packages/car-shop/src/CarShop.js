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
  registerDefaultIconsets,
  spacer24,
  IngButton,
  font19Mixin,
  IngIcon
} from 'ing-web';

import { CarsList } from './CarsList';
registerDefaultIconsets();

export class CarShop extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'cars-list': CarsList,
      'ing-button': IngButton,
      'ing-icon': IngIcon
    };
  }
  constructor() {
    super();
    this.cars = [];
    this.basketValue = 0;
    this.totalCarsInBasket = 0;
    this.carsInBasket = []
  }

  connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  async _fetchData() {
    const response = await fetch('/search/cars');
    if (response.ok) {
      this.cars = await response.json();
      this.requestUpdate();
    } else {
      console.log('Error fetching data!')
    }
  }

  render() {
    return html`
      <div class="page-container">
        <header class="header">
          <h1 class="header__title">Gilbert car shop</h1>
          <div class="car-basket">
            <ing-button aria-label="Total cars in basket" class="total-count"><ing-icon icon-id="ing:outline-products:basket" slot="icon-before"></ing-icon>${this.totalCarsInBasket} cars</ing-button>
            <span class="total-value" aria-label="Total basket value">$${this.basketValue}</span>
          </div>
        </header>
        <main class="content">
          <cars-list class="car-list" @buyCar=${(e) => {this._updateBasket(e)}} .cars=${this.cars}></cars-list>
        </main>
      </div>
    `;
  }

  _updateBasket(e) {
    const carToBuy = e.detail.car;
    const index = this.carsInBasket.findIndex((car) => carToBuy.id === car.id);
    if(index < 0) {
      this.basketValue += e.detail.car.carInfo.price;
      this.totalCarsInBasket = this.totalCarsInBasket + 1;
      this.carsInBasket.push(carToBuy);
      this.requestUpdate();
    }
  }
  static get styles() {
    return css`
      ${cardComponentStyle}
      .header {
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
      .header .total-value {
        font: ${font19Mixin()}
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

