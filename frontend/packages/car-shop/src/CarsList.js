import {
  css,
  html,
  LitElement,
  gridComponentStyle,
  red,
  spacer32,
  spacer8,
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
        <p class="no-cars-alert" title="No cars available!">No cars available!</p>
      `
    }

    return html`
      <ol class="row">
        ${this.cars.map((car) => html`<li class="col col-12 col-@600-9 col-@840-6 col-@1280-3" id=${car?._id}><car-card .data=${car?.carInfo}></car-card></li>`)}
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
      .no-cars-alert {
        background: ${red};
        margin: ${spacer32};
        text-align:center;
        padding: ${spacer8};
      }
    `;
  }
}
