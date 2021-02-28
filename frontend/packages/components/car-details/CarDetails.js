import {
  css,
  font16BoldMixin,
  html,
  LitElement,
} from 'ing-web';

export class CarDetails extends LitElement {
  static get properties() {
    return {
      data: { type: Object },
    };
  }
  constructor() {
    super();
  }

  render() {
    const { data: { carInfo: car, location} } = this;
    return html`
      <dl class="car__details">
        <dt id="model">Model</dt>
        <dd class="car__model" aria-labelledby="model" title=${car.model}>${car.model}</dd>
        <dt id="year">Year Model</dt>
        <dd class="car__year-model" area-labelledby="year" title=${car.yearModel}>${car.yearModel}</dd>
        <dt id="price">Price</dt>
        <dd class="car__price" area-labelledby="price" title=$${car.price}>$${car.price}</dd>
        <dt id="date">Date</dt>
        <dd class="car__date-added" area-labelledby="date" title=${car.dateAdded}>${car.dateAdded}</dd>
        <dt id="warehouse">Warehouse</dt>
        <dd class="car__warehouse" area-labelledby="warehouse" title=${location?.warehouse}>${location?.warehouse}</dd>
        <dt id="location">Location</dt>
        <dd class="car__location" area-labelledby="location" title=${location?.name}>${location?.name}</dd>
      </dl>
    `;
  }

  static get styles() {
    return css`
      dl.car__details {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
      }

      dl.car__details dt{
        flex: 0 0 50%;
        text-overflow: ellipsis;
        overflow: hidden;
        font: ${font16BoldMixin()}
      }

      dl.car__details dd{
        flex:0 0 50%;
        margin-left: auto;
        text-align: left;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `;
  }
}
