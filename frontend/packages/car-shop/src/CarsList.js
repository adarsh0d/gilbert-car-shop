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
      <ol class="row">
        ${sortedCarsByDate.map((car) => html`<li class="col-3" id=${car?._id}><car-card .data=${car}></car-card></li>`)}
      </ol>
    `;
  }

  static get styles() {
    return css`
      ${gridComponentStyle}
      ol {
        list-style: none;
      }
    `;
  }
}
