import {
  css,
  html,
  LitElement,
  gridComponentStyle,
} from 'ing-web';

export class CarsList extends LitElement {
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
      <section class="row">
        ${sortedCarsByDate.map((car) => html`<car-card class="col-3" id=${car?._id} .data=${car}></car-card>`)}
      </section>
    `;
  }

  static get styles() {
    return css`
      ${gridComponentStyle}
    `;
  }
}
