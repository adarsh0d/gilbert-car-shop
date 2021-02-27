import { html, fixture, expect } from '@open-wc/testing';

import '../__element-definitions/shopping-basket';

let el;
describe('Shopping Basket', () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture(html`<shopping-basket .basketValue=${50000} .carsInBasket=${[1, 2]}></shopping-basket>`);
  });

  it('is accessible', () => {
     expect(el).to.be.accessible();
  });
});
