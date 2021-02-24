import {
  cardComponentStyle,
  css,
  elevation8Mixin,
  font16BoldMixin,
  html,
  leaf30,
  LitElement,
  red,
} from 'ing-web';

export class CarCard extends LitElement {

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
    const { data: car } = this
    return html`
        <article class="card car-card ${car.licensed? `card--elevated`: `` }" @click=${car.licensed ? this.showCarDetails : () => false}>
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
            </dl>
          </section>
          <section class="card__footer ${car.licensed ? `card__footer--licensed`: `card__footer--unlicensed`}">
            <p class="car__licensed" area-label="Licenced" title=${car.licensed ? `Licensed` : `Unlicensed`}>${car.licensed ? `Licensed` : `Unlicensed`}</p>
          </section
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
      .card:not(.card--elevated) {
        cursor: not-allowed;
        opacity: 0.6;
        box-shadow: none;
      }
      .card--elevated:hover {
        cursor: pointer;
        ${elevation8Mixin()}
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
      .card__footer {
        text-align: center;
      }
      .card__footer--licensed {
        background-color: ${leaf30}
      }
      .card__footer--unlicensed {
        background-color: ${red}
      }
    `;
  }
}
