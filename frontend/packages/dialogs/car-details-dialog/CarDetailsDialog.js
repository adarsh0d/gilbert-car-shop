import {
  html,
  IngDialogFrame,
  IngButton,
  IngIcon,
  LitElement,
  ScopedElementsMixin,
  IngDialog,
} from 'ing-web';

import { CarDetails } from '../../components';

export class CarDetailsDialog extends ScopedElementsMixin(LitElement) {

  static get properties() {
    return {
      carToShow: { type: Object },
      buyCar: { type: Function },
      closeModal: {type: Function},
      opened: { type: Boolean }
    };
  }

  static get scopedElements() {
    return {
      'ing-button': IngButton,
      'ing-icon': IngIcon,
      'ing-dialog-frame': IngDialogFrame,
      'ing-dialog': IngDialog,
      'car-details': CarDetails
    };
  }
  constructor() {
    super();
    this.carToShow = {};
  }

  render() {
    return html`
        <ing-dialog class="car-details__dialog" .opened=${this.opened}>
          <ing-dialog-frame slot="content">
              <div slot="header">
                <h3 class="car__make" aria-label="Make" title=${this.carToShow?.carInfo?.make}>${this.carToShow?.carInfo?.make}</h3>
              </div>
              <div slot="content">
                ${this.carToShow?.id ? html`<car-details .data=${this.carToShow}></car-details>` : html``}
              </div>
              <div slot="footer">
                ${this.carToShow?.alreadyInBasket ? html`
                  <ing-button
                    class="buy-btn"
                    aria-label="Car already in basket"
                    disabled
                  >
                  <ing-icon icon-id="ing:outline-transactions:paymentRequestDollar" slot="icon-before"></ing-icon>In shopping basket</ing-button>
                `: html`
                  <ing-button
                  class="buy-btn"
                  aria-label="Click to buy this car"
                  @click="${() => { this.buyCar(this.carToShow?.id)}}">
                  <ing-icon icon-id="ing:outline-transactions:paymentRequestDollar" slot="icon-before"></ing-icon>
                  Buy</ing-button>
                `}
                <ing-button
                  text
                  class="close-modal-btn"
                  aria-label="Click to close popup"
                  @click="${() => { this.closeModal()}}">Close
                </ing-button>
              </div>
          </ing-dialog-frame>
      </ing-dialog>`
  }

}
