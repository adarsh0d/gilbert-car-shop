import {
  css,
  html,
  LitElement,
  gridComponentStyle,
  IngNotificationInline,
  ScopedElementsMixin,
  IngDialog,
  IngDialogFrame,
  IngButton,
  IngIcon,
} from 'ing-web';
import { connect } from "pwa-helpers/connect-mixin";
import { CarCard } from './CarCard';
import { CarDetails } from './CarDetails';
import { buyCar } from '../../store/actions';
import store from '../../store/store';

export class CarsList extends connect(store)(ScopedElementsMixin(LitElement)) {
  static get scopedElements() {
    return {
      'ing-notification-inline': IngNotificationInline,
      'car-card': CarCard,
      'car-details': CarDetails,
      'ing-dialog': IngDialog,
      'ing-dialog-frame': IngDialogFrame,
      'ing-button': IngButton,
      'ing-icon': IngIcon
    };
  }

  static get properties() {
    return {
      cars: { type: Array },
      carsInBasket: {type: Array}
    };
  }

  stateChanged(state) {
    const { cars, carsInBasket } = state;
    this.cars = cars;
    this.carsInBasket = carsInBasket;
  }

  constructor() {
    super();
    this.carToShow = null;
  }

  render() {
    if (!this.cars || !this.cars.length) {
      return html`
        <ing-notification-inline type="error" class="no-cars-alert" title="No cars available!">No cars available!</ing-notification-inline>
      `
    }

    return html`
      <ol class="row" id="car-list">
        ${this.cars.map((car, i) => html`<li class="col col-12 col-@600-9 col-@840-6 col-@1280-3" id=${car?.id}><car-card @showCarDetails=${(e) => { this.showCarDetails(e) }} .data=${car}></car-card></li>`)}
      </ol>
      <ing-dialog class="car-dialog">
        <ing-button class="btn__invoker" slot="invoker" aria-haspopup="dialog"> Open dialog </ing-button>
        <ing-dialog-frame slot="content">
          <div slot="header"><h3 class="car__make" aria-label="Make" title=${this.carToShow?.carInfo?.make}>${this.carToShow?.carInfo?.make}</h3></div>
          <div slot="content">
              <car-details .data=${this.carToShow}></car-details>
              ${this.carToShow?.alreadyInBasket ? html`
                <ing-button
                  class="buy-btn"
                  aria-label="Car already in basket"
                  disabled
                >
                <ing-icon icon-id="ing:outline-transactions:paymentRequestDollar" slot="icon-before"></ing-icon>
                In shopping basket
                </ing-button>
              `: html`
                <ing-button
                class="buy-btn"
                aria-label="Click to buy this car"
                @click="${() => { this._buyCar()}}">
                <ing-icon icon-id="ing:outline-transactions:paymentRequestDollar" slot="icon-before"></ing-icon>
                Buy</ing-button>
              `}
              <ing-button
                text
                class="close-modal-btn"
                aria-label="Click to close popup"
                @click="${(e) => { this._handleClose(e)}}">Close</ing-button>

          </div>
        </ing-dialog-frame>
      </ing-dialog>
    `;
  }

  _handleClose(e) {
    e.target.dispatchEvent(
      new Event('close-overlay', {
        bubbles: true,
      }),
    )
  }
  async _buyCar() {
    store.dispatch(buyCar(this.carToShow));
  }
  async showCarDetails(e) {
    this.carToShow = e.detail.car;
    const basketIndex = this.carsInBasket.findIndex((car) => this.carToShow.id === car);
    if(basketIndex > -1) {
      this.carToShow['alreadyInBasket'] = true;
    }
    this.requestUpdate();
    await this.updateComplete;
    const invoker = this.shadowRoot.querySelector('.btn__invoker');
    invoker.click();
  }
  static get styles() {
    return css`
      ${gridComponentStyle}
      ol {
        list-style: none;
        padding: 0;
      }
      .btn__invoker {
        display: none;
      }
    `;
  }
}
