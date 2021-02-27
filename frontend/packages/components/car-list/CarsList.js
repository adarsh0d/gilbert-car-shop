import {
  css,
  html,
  LitElement,
  gridComponentStyle,
  IngNotificationInline,
  ScopedElementsMixin
} from 'ing-web';

import { CarCard } from './car-card/CarCard';

export class CarsList extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'ing-notification-inline': IngNotificationInline,
      'car-card': CarCard
    };
  }

  static get properties() {
    return {
      cars: { type: Array },
      showCarDetails: { type: Function }
    };
  }

  constructor() {
    super();
    this.cars = [];
  }

  render() {
    if (!this.cars || !this.cars.length) {
      return html`
        <ing-notification-inline type="error" class="no-cars-alert" title="No cars available!">No cars available!</ing-notification-inline>
      `
    }

    return html`
      <ol class="row" id="car-list">
        ${this.cars.map((car, i) => html`<li class="col col-12 col-@600-9 col-@840-6 col-@1280-3" id=${car?.id}><car-card .showCarDetails=${this.showCarDetails} .data=${car}></car-card></li>`)}
      </ol>
    `;
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
