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
import {connect} from "pwa-helpers/connect-mixin";
import { CarDetailsDialog } from '../../../packages/dialogs';
import { buyCar, setAllCars } from '../../../packages/store/modules/car-shop/actions';
import store from '../../../packages/store/store';
import { CarShopView } from '../../../packages/views';

export class CarShopContainer extends connect(store)(ScopedElementsMixin(LitElement)) {
  static get scopedElements() {
    return {
      'car-shop-view': CarShopView,
      'car-details-dialog': CarDetailsDialog
    };
  }
  static get properties() {
    return {
      carsInBasket: {type: Array},
      basketValue: {type: Number},
      carToShow: {type: Object},
      cars: {type: Array}
    };
  }
  constructor() {
    super();
    this.basketValue = 0;
    this.carsInBasket = []
  }

  async connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }
  async _buyCar() {
    store.dispatch(buyCar(this.carToShow));
  }
  async _showCarDetails(car) {
    this.carToShow = car;
    const basketIndex = this.carsInBasket.findIndex((car) => this.carToShow.id === car);
    if(basketIndex > -1) {
      this.carToShow['alreadyInBasket'] = true;
    }
    this.requestUpdate();
    await this.updateComplete;
    const modalEl = this.shadowRoot.querySelector('#cars-details');
    modalEl.show();
  }

  stateChanged({carReducer}) {
    const { carsInBasket, basketValue, cars, loaded } = carReducer;
    this.carsInBasket = carsInBasket;
    this.basketValue = basketValue;
    this.cars = cars;
    this.loaded = loaded;
  }

  async _fetchData() {
    const response = await fetch('/search/cars');
    if (response.ok) {
      const cars = await response.json();
      store.dispatch(setAllCars(cars));
    } else {
      console.log('Error fetching data!')
    }
  }

  render() {
    return html`
      ${this.loaded ? html `
        <car-shop-view
          .carsInBasket=${this.carsInBasket}
          .basketValue=${this.basketValue}
          .cars=${this.cars}
          .showCarDetails=${this._showCarDetails.bind(this)}>
        </car-shop-view>
      `: html ``}

      <car-details-dialog
        id="cars-details"
        .data=${this.carToShow}
        .buyCar=${this._buyCar.bind(this)}
      ></car-details-dialog>
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
  disconnectedCallback() {
    super.disconnectedCallback();
    this._storeUnsubscribe();
  }
}

customElements.define('car-shop', CarShopContainer);
