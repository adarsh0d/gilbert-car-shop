import {
  html,
  LitElement,
  ScopedElementsMixin,
} from 'ing-web';

import { AppFrame, ShoppingBasket } from '../../packages/components';
import { CarShopView } from '../../packages/views';

export class CarShopPage extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'car-shop-view': CarShopView,
      'app-frame': AppFrame,
      'shopping-basket': ShoppingBasket
    };
  }
  static get properties() {
    return {
      carsInBasket: {type: Array},
      carToShow: {type: Object},
      cars: {type: Array},
      modalOpen: {type: Boolean},
      basketValue: {type: Number},
      showCarDetails: {type: Function},
      buyCar: {type: Function},
      closeModal: {type: Function},
      getCars: {type: Function}
    };
  }
  constructor() {
    super();
  }

  render() {
    return html`
        <app-frame>
          <h1 slot="left">Gilbert car shop</h1>
          <shopping-basket slot="right" .carsInBasket=${this.carsInBasket} .basketValue=${this.basketValue}></shopping-basket>
          ${this.loaded ? html `
              <car-shop-view slot="main"
                .cars=${this.cars}
                .opened=${this.modalOpen}
                .carToShow=${this.carToShow}
                .showCarDetails=${(car) => this.showCarDetails(car)}
                .closeModal=${() => this.closeModal(false)}
                .buyCar=${() => this.buyCar(this.carToShow)}
              >
              </car-shop-view>
              `: html `<ing-spinner></ing-spinner>`
          }
        </app-frame>
    `;
  }

}
