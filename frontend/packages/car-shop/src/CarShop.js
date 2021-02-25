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
import {connect} from "pwa-helpers/connect-mixin";
import store from '../../store/store';
import { setAllCars } from '../../store/actions';

import { CarsList } from './CarsList';
import { CarDetails } from './CarDetails'
registerDefaultIconsets();

export class CarShop extends connect(store)(ScopedElementsMixin(LitElement)) {
  static get scopedElements() {
    return {
      'cars-list': CarsList,
      'ing-button': IngButton,
      'ing-icon': IngIcon,
      'car-details': CarDetails
    };
  }
  static get properties() {
    return {
      carsInBasket: {type: Array},
      basketValue: {type: Number},
      carToShow: {type: Object}
    };
  }
  constructor() {
    super();
    this.basketValue = 0;
    this.carsInBasket = []
  }

  stateChanged(state) {
    const { carsInBasket, basketValue, carToShow } = state;
    this.carsInBasket = carsInBasket;
    this.basketValue = basketValue;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated(_changedProperties) {
    this._fetchData();
  }

  async _fetchData() {
    const response = await fetch('/search/cars');
    if (response.ok) {
      const cars = await response.json();
      store.dispatch(setAllCars(cars))
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
            <ing-button aria-label="Total cars in basket" class="total-count"><ing-icon icon-id="ing:outline-products:basket" slot="icon-before"></ing-icon>${this.carsInBasket.length} cars</ing-button>
            <span class="total-value" aria-label="Total basket value">$${this.basketValue.toFixed(2)}</span>
          </div>
        </header>
        <main class="content">
          <cars-list class="car-list"></cars-list>
        </main>
      </div>
    `;
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
      .header .total-value {
        font: ${font19Mixin()}
      }
      .content {
        margin: 90px ${spacer32}
      }
    `;
  }
}

