import {
  css,
  html,
  LitElement,
  gridComponentStyle,
  IngNotificationInline,
  ScopedElementsMixin,
} from 'ing-web';
import { CarCard } from './CarCard';
import { CarDetails } from './CarDetails';

export class CarsList extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'ing-notification-inline': IngNotificationInline,
      'car-card': CarCard,
      'car-details': CarDetails
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
    if(!this.cars || !this.cars.length) {
      return html`
        <ing-notification-inline type="error" class="no-cars-alert" title="No cars available!">No cars available!</ing-notification-inline>
      `
    }

    return html`
      <ol class="row" id="car-list">
        ${this.cars.map((car, i) => html`<li class="col col-12 col-@600-9 col-@840-6 col-@1280-3" id=${car?.id}><car-card @showCarDetails=${(e) => {this.showCarDetails(e)}} .data=${car?.carInfo}></car-card></li>`)}
      </ol>
      ${this.selectedCar?.make ? html`<car-details .data=${this.selectedCar}></car-details>`: html``}
    `;
  }

  showCarDetails(e) {
    this.selectedCar = e.detail.car;
    this.requestUpdate();
  }
  static get styles() {
    return css`
      ${gridComponentStyle}
      ol {
        list-style: none;
        padding: 0;
      }
    `;
  }
}
