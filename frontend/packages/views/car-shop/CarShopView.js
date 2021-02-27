import {
  html,
  LitElement,
  ScopedElementsMixin,
  IngButton,
  IngIcon
} from 'ing-web';

import { CarsList, ShoppingBasket } from '../../components';
import { CarDetailsDialog } from '../../dialogs';

export class CarShopView extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'cars-list': CarsList,
      'ing-button': IngButton,
      'ing-icon': IngIcon,
      'shopping-basket': ShoppingBasket,
      'car-details-dialog': CarDetailsDialog
    };
  }
  static get properties() {
    return {
      carToShow: {type: Object},
      cars: {type: Array},
      showCarDetails: {type: Function},
      closeModal: {type: Function},
      opened: { type: Boolean }
    };
  }
  constructor() {
    super();
    this.cars = [];
    this.opened = false;
  }

  render() {
    return html`
        <cars-list
          class="car-list"
          .cars=${this.cars}
          .showCarDetails=${this.showCarDetails}>
        </cars-list>
        <car-details-dialog
          id="cars-details"
          .data=${this.carToShow}
          .opened=${this.opened}
          .closeModal=${this.closeModal}
          .buyCar=${this.buyCar}
        ></car-details-dialog>
    `;
  }

}
