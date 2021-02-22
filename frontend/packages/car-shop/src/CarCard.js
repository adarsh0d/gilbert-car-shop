import {
  cardComponentStyle,
  css,
  html,
  linkComponentStyle,
  LitElement,
  ScopedElementsMixin,
} from 'ing-web';

export class CarCard extends ScopedElementsMixin(LitElement) {

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
            <section class="card__content__left">
              <h2 class="car__make">${car.make}</h2>
              <p class="car__model">${car.model}</p>
            <section>
            <section class="card__content__right">
              <p class="car__year-model">${car.year_model}</p>
              <p class="car__price">${car.price}</p>
              <p class="car__date-added">${car.date_added}</p>
            <section>
          </section>
          <section class="card__footer">
            <p class="car__licensed">${car.licensed ? `Licensed` : `Unlicensed`}</p>
          </section
        </article>
    `;
  }

  static get styles() {
    return css`
      ${linkComponentStyle}
      ${cardComponentStyle}
    `;
  }
}
