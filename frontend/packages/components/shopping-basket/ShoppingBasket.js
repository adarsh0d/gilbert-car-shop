import { css, html, LitElement, ScopedElementsMixin, IngButton, IngIcon } from "ing-web";

export class ShoppingBasket extends ScopedElementsMixin(LitElement) {
  constructor() {
    super();
  }
  static get scopedElements() {
    return {
      'ing-button': IngButton,
      'ing-icon': IngIcon
    };
  }
  static get properties() {
    return {
      carsInBasket: { type: Array },
      basketValue: { type: Number }
    };
  }
  render() {
    return html`
      <div class="car-basket">
        <ing-button aria-label="Total cars in basket" class="total-count"><ing-icon icon-id="ing:outline-products:basket" slot="icon-before"></ing-icon>${this.carsInBasket.length} cars</ing-button>
        <span class="total-value" aria-label="Total basket value">$${this.basketValue.toFixed(2)}</span>
      </div>
    `
  }
  static get styles() {
    return css`
    `;
  }
}

customElements.define('shopping-basket', ShoppingBasket);
