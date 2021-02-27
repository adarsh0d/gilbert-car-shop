import {
  html,
  LitElement,
  ScopedElementsMixin,
  IngSpinner,
} from 'ing-web';
import { connect } from "pwa-helpers/connect-mixin";
import { CarDetailsDialog } from '../../packages/dialogs';
import { buyCar, setAllCars, showCarDetails, setCarModal } from '../../packages/store/modules/car-shop/actions';
import store from '../../packages/store/store';
import { CarShopView } from '../../packages/views';

export class CarShopContainer extends connect(store)(ScopedElementsMixin(LitElement)) {
  static get scopedElements() {
    return {
      'car-shop-view': CarShopView,
      'car-details-dialog': CarDetailsDialog,
      'ing-spinner': IngSpinner
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

  async connectedCallback() {
    super.connectedCallback();
    this._fetchData();
  }

  async _buyCar() {
    store.dispatch(buyCar(this.carToShow));
  }

  _showCarDetails(car) {
    store.dispatch(showCarDetails(car));
  }

  stateChanged({carReducer}) {
    const { cars, loaded, carsInBasket, modalOpen, carToShow } = carReducer;
    this.cars = cars;
    this.loaded = loaded;
    this.carsInBasket = carsInBasket;
    this.modalOpen = modalOpen;
    this.carToShow = carToShow;
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

  _closeModal() {
   store.dispatch(setCarModal(false))
  }

  render() {
    return html`
      ${this.loaded ? html `
        <car-shop-view
          .cars=${this.cars}
          .showCarDetails=${this._showCarDetails.bind(this)}
          .opened=${this.modalOpen}
          .closeModal=${this._closeModal.bind(this)}
          .buyCar=${this._buyCar.bind(this)}
          .carToShow=${this.carToShow}
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
