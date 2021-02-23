import {
  cardComponentStyle,
  css,
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

  render() {
    const { data: car } = this
    return html`
        <article class="card car-card">
          <section class="card__content">
            <h2 class="car__make" title=${car.make}>${car.make}</h2>
            <dl class="car__details">
              <dt>Model</dt>
              <dd class="car__model" title=${car.model}>${car.model}</dd>
              <dt>Year Model</dt>
              <dd class="car__year-model" title=${car.yearModel}>${car.yearModel}</dd>
              <dt>Price</dt>
              <dd class="car__price" title=$${car.price}>$${car.price}</dd>
              <dt>Date</dt>
              <dd class="car__date-added" title=${car.dateAdded}>${car.dateAdded}</dd>
            </dl>
          </section>
          <section class="card__footer ${car.licensed ? `card__footer--licensed`: `card__footer--unlicensed`}">
            <p class="car__licensed" title=${car.licensed ? `Licensed` : `Unlicensed`}>${car.licensed ? `Licensed` : `Unlicensed`}</p>
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
