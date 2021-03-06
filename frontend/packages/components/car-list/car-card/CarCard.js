import {
  cardComponentStyle,
  css,
  font16BoldMixin,
  html,
  IngButton,
  IngIcon,
  LitElement,
  ScopedElementsMixin,
} from 'ing-web';

export class CarCard extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'ing-button': IngButton,
      'ing-icon': IngIcon
    };
  }
  static get properties() {
    return {
      data: { type: Object },
      showCarDetails: { type: Function }
    };
  }

  constructor() {
    super();
  }

  render() {
    const { data: { carInfo: car} } = this;
    return html`
        <article class="card car-card ${car.licensed? `card--elevated`: `` }">
          <section class="card__content">
            <div class="card__header">
              <h2 class="car__make" aria-label="Make" title=${car.make}>${car.make}</h2>
              ${ this.data['alreadyInBasket'] ? html`<span class="car__status" aria-label="Product is in basket" title="In basket"><ing-icon icon-id="ing:outline-notification:notificationSuccess"></ing-icon>In basket</span>`: html``}
            </div>
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
            <ing-button class="btn__read" aria-hidden=${car.licensed ? false : true } outline @click=${car.licensed ? () => this.showCarDetails(this.data) : () => false} title="Know More" aria-label="Click to know more"><ing-icon icon-id="ing:outline-navigation:externalLink" slot="icon-after"></ing-icon>Know More</ing-button>
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
      .card__header {
        display: flex;
        align-items: center;
      }
      .card__header h2 {
        flex: 1
      }
      .card__header span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
