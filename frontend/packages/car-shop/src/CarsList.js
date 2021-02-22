import {
  css,
  html,
  LitElement,
  ScopedElementsMixin,
} from 'ing-web';

import './CarCard';

export class CarsList extends ScopedElementsMixin(LitElement) {
  static get properties() {
    return {
      cars: { type: Array }
    };
  }

  constructor() {
    super();
  }

  render() {
    if(!this.cars || !this.cars.length) {
      return html`
        <p class="no-cars-alert">No cars available!</p>
      `
    }
    //sorting data here
    const sortedCarsByDate = this.cars.sort((a, b) => new Date(a.date_added).getTime() > new Date(b.date_added).getTime() ? 1: -1);
    return html`
      ${sortedCarsByDate.map((car) => html`<car-card class="car-card" id=${car?._id} .data=${car}></car-card>`)}
    `;
  }

  static get styles() {
    return css`
    `;
  }
}
