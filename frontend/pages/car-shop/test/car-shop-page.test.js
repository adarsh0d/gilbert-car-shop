import { html, fixture, assert } from '@open-wc/testing';

import '../__element-definitions/car-shop-page';

let el;
describe('Car Shop Page', () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture(html`<car-shop-page></car-shop-page>`);
  });

  it('should have a app frame component', async() => {
    const appFrameEl = el.shadowRoot.querySelector('app-frame')
    assert.isNotNull(appFrameEl);
  })
  it('should have a shopping-basket component', async() => {
    const shoppingBasketEl = el.shadowRoot.querySelector('shopping-basket');
    assert.isNotNull(shoppingBasketEl);
  });
  it('should have a car shop component', async() => {
    el = await fixture(html`<car-shop-page .loaded=${true}></car-shop-page>`);
    const carShopEl = el.shadowRoot.querySelector('car-shop-view');
    assert.isNotNull(carShopEl);
  })
  it('should have a spinner component', async() => {
    el = await fixture(html`<car-shop-page></car-shop-page>`);
    const spinnerEl = el.shadowRoot.querySelector('[data-tag-name="ing-spinner"]');
    assert.isNotNull(spinnerEl);
  })
});
