import {
  cardComponentStyle,
  css,
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
              <p class="car__model" title=${car.model}>${car.model}</p>
              <p class="car__year-model" title=${car.yearModel}>${car.yearModel}</p>
              <p class="car__price" title=$${car.price}>$${car.price}</p>
              <p class="car__date-added" title=${car.dateAdded}>${car.dateAdded}</p>
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
      .card__footer--licensed {
        background-color: ${leaf30}
      }
      .card__footer--unlicensed {
        background-color: ${red}
      }
    `;
  }
}
