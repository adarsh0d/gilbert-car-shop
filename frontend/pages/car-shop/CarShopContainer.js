import {
  html,
  LitElement,
  ScopedElementsMixin,
} from 'ing-web';
import { connect } from "pwa-helpers/connect-mixin";
import { buyCar, showCarDetails, setCarModal, getCars } from '../../packages/store/modules/car-shop/actions';
import store from '../../packages/store/store';
import { CarShopView } from '../../packages/views';

export class CarShopContainer extends connect(store)(ScopedElementsMixin(LitElement)) {
  static get scopedElements() {
    return {
      'car-shop-view': CarShopView
    };
  }
  static get properties() {
    return {
      carsInBasket: {type: Array},
      carToShow: {type: Object},
      cars: {type: Array},
      modalOpen: {type: Boolean}
    };
  }
  constructor() {
    super();
  }

  _buyCar() {
    store.dispatch(buyCar(this.carToShow));
  }

  _showCarDetails(car) {
    store.dispatch(showCarDetails(car));
  }

  _closeModal() {
   store.dispatch(setCarModal(false))
  }

  stateChanged({carReducer}) {
    const { cars, loaded, modalOpen, carToShow } = carReducer;
    this.cars = cars;
    this.loaded = loaded;
    this.modalOpen = modalOpen;
    this.carToShow = carToShow;
  }

  firstUpdated() {
    getCars();
  }

  render() {
    return html`
      ${this.loaded ? html `
        <car-shop-view
          .cars=${this.cars}
          .opened=${this.modalOpen}
          .carToShow=${this.carToShow}
          .showCarDetails=${this._showCarDetails.bind(this)}
          .closeModal=${this._closeModal.bind(this)}
          .buyCar=${this._buyCar.bind(this)}
        >
        </car-shop-view>
      `: html `<ing-spinner></ing-spinner>`
      }
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._storeUnsubscribe();
  }
}

customElements.define('car-shop', CarShopContainer);
