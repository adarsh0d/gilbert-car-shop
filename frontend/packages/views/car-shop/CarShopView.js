import {
  html,
  LitElement,
  ScopedElementsMixin,
} from 'ing-web';

import { CarsList } from '../../components';
import { CarDetailsDialog } from '../../dialogs';

export class CarShopView extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'cars-list': CarsList,
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
  }

  render() {
    return html`
        <cars-list
          class="car-list"
          .cars=${this.cars}
          .showCarDetails=${this.showCarDetails}>
        </cars-list>
        <car-details-dialog
          class="cars-details"
          .carToShow=${this.carToShow}
          .opened=${this.opened}
          .closeModal=${this.closeModal}
          .buyCar=${this.buyCar}
        ></car-details-dialog>
    `;
  }

}
