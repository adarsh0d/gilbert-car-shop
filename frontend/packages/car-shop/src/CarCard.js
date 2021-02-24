import {
  cardComponentStyle,
  css,
  elevation8Mixin,
  font16BoldMixin,
  html,
  IngButton,
  leaf30,
  LitElement,
  red,
  ScopedElementsMixin,
} from 'ing-web';

export class CarCard extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'ing-button': IngButton
    };
  }
  static get properties() {
    return {
      data: { type: Object },
    };
  }

  constructor() {
    super();
  }

  showCarDetails() {
    this.dispatchEvent(new CustomEvent('showCarDetails', {
      detail: {
        car: this.data
      }
    }));
  }

  render() {
    const { data: { carInfo: car} } = this;
    return html`
        <article class="card car-card ${car.licensed? `card--elevated`: `` }">
          <section class="card__content">
            <h2 class="car__make" aria-label="Make" title=${car.make}>${car.make}</h2>
            <dl class="car__details">
              <dt id="model">Model</dt>
              <dd class="car__model" aria-labelledby="model" title=${car.model}>${car.model}</dd>
              <dt id="year">Year Model</dt>
              <dd class="car__year-model" area-labelledby="year" title=${car.yearModel}>${car.yearModel}</dd>
              <dt id="price">Price</dt>
              <dd class="car__price" area-labelledby="price" title=$${car.price}>$${car.price}</dd>
              <dt id="date">Date</dt>
              <dd class="car__date-added" area-labelledby="date" title=${car.dateAdded}>${car.dateAdded}</dd>
              <dt id="licensed">Licensed</dt>
              <dd class="car__licensed" area-label="Licenced" title=${car.licensed ? `Licensed` : `Unlicensed`}>${car.licensed ? `Licensed` : `Unlicensed`}</dd>
            </dl>
            <ing-button class="btn__read" aria-hidden=${car.licensed ? false : true } outline @click=${car.licensed ? this.showCarDetails : () => false} title="Know More" aria-label="Click to know more">Know More</ing-button>
          </section>
        </article>
    `;
  }

  static get styles() {
    return css`
      ${cardComponentStyle}
      dl.car__details {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
      }
      .card__content {
        min-height: 250px;
      }
      .card:not(.card--elevated) {
        cursor: not-allowed;
        opacity: 0.6;
        box-shadow: none;
      }
      .card:not(.card--elevated) .btn__read{
        visibility: hidden;
      }
      .card--elevated:hover .btn__read{
        border-width: 2px;
      }
      .card--elevated .btn__read {
        width: 100%;
        cursor: pointer;
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
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `;
  }
}
