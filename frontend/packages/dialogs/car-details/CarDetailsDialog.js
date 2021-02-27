import {
  html,
  IngDialogFrame,
  IngButton,
  IngIcon,
  LitElement,
  ScopedElementsMixin,
} from 'ing-web';

import { DialogWindow, CarDetails } from '../../components';

export class CarDetailsDialog extends ScopedElementsMixin(LitElement) {

  static get properties() {
    return {
      data: { type: Object },
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
      'dialog-window': DialogWindow,
      'car-details': CarDetails
    };
  }
  constructor() {
    super();
    this.data = {};
  }

  render() {
    return html`
        <dialog-window class="car-details__dialog" .opened=${this.opened}>
          <ing-dialog-frame slot="content">
              <div slot="header">
                <h3 class="car__make" aria-label="Make" title=${this.data?.carInfo?.make}>${this.data?.carInfo?.make}</h3>
              </div>
              <div slot="content">
                ${this.data ? html`<car-details .data=${this.data}></car-details>` : html``}
              </div>
              <div slot="footer">
                ${this.data?.alreadyInBasket ? html`
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
                  @click="${() => { this.buyCar()}}">
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
      </dialog-window>`
  }

}
