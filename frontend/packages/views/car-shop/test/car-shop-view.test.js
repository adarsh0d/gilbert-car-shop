import { html, fixture, assert } from '@open-wc/testing';

import '../__element-definitions/car-shop-view.js';


describe('Car Shop View', () => {
  it('should have a car list element', async() => {
    const el = await fixture(html`<car-shop-view></car-shop-view>`);
    const carListEl = el.shadowRoot.querySelector('.car-list')
    assert.isNotNull(carListEl);
  })
  it('should have a car details dialog element', async() => {
    const el = await fixture(html`<car-shop-view></car-shop-view>`);
    const carDetailDialogEl = el.shadowRoot.querySelector('.cars-details')
    assert.isNotNull(carDetailDialogEl);
  })
});
