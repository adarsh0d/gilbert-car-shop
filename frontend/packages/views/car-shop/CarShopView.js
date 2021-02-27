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
  spacer24,
  IngButton,
  font19Mixin,
  IngIcon
} from 'ing-web';

import { CarsList, ShoppingBasket } from '../../components';

export class CarShopView extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'cars-list': CarsList,
      'ing-button': IngButton,
      'ing-icon': IngIcon,
      'shopping-basket': ShoppingBasket
    };
  }
  static get properties() {
    return {
      carsInBasket: {type: Array},
      basketValue: {type: Number},
      carToShow: {type: Object},
      cars: {type: Array},
      showCarDetails: {type: Function}
    };
  }
  constructor() {
    super();
    this.basketValue = 0;
    this.carsInBasket = []
    this.cars= [];
  }

  render() {
    return html`
      <div class="page-container">
        <header class="header">
          <h1 class="header__title">Gilbert car shop</h1>
          <shopping-basket .carsInBasket=${this.carsInBasket} .basketValue=${this.basketValue}></shopping-basket>
        </header>
        <main class="content">
          <cars-list class="car-list" .cars=${this.cars} .showCarDetails=${this.showCarDetails}></cars-list>
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
      .content {
        margin: 90px ${spacer32}
      }
    `;
  }
}
