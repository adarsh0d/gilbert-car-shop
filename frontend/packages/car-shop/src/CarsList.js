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
} from 'ing-web';
import { CarCard } from './CarCard';
import { CarDetails } from './CarDetails';

export class CarsList extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'ing-notification-inline': IngNotificationInline,
      'car-card': CarCard,
      'car-details': CarDetails,
      'ing-dialog': IngDialog,
      'ing-dialog-frame': IngDialogFrame,
      'ing-button': IngButton
    };
  }
  static get properties() {
    return {
      cars: { type: Array }
    };
  }

  constructor() {
    super();
    this.selectedCar = null;
  }

  render() {
    if (!this.cars || !this.cars.length) {
      return html`
        <ing-notification-inline type="error" class="no-cars-alert" title="No cars available!">No cars available!</ing-notification-inline>
      `
    }

    return html`
      <ol class="row" id="car-list">
        ${this.cars.map((car, i) => html`<li class="col col-12 col-@600-9 col-@840-6 col-@1280-3" id=${car?.id}><car-card @showCarDetails=${(e) => { this.showCarDetails(e) }} .data=${car?.carInfo}></car-card></li>`)}
      </ol>
      <ing-dialog>
        <ing-button class="btn__invoker" slot="invoker" aria-haspopup="dialog"> Open dialog </ing-button>
        <ing-dialog-frame slot="content">
          <div slot="header"><p class="car__make" aria-label="Make" title=${this.selectedCar?.make}>${this.selectedCar?.make}</p></div>
          <div slot="content">
              <car-details .data=${this.selectedCar}></car-details>
              <ing-button
                aria-label="Click to close popup"
                @click="${e =>
                  e.target.dispatchEvent(
                  new Event('close-overlay', {
                    bubbles: true,
                  }),
                )}">Ok</ing-button>
          </div>
        </ing-dialog-frame>
      </ing-dialog>
    `;
  }

  async showCarDetails(e) {
    this.selectedCar = e.detail.car;
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
