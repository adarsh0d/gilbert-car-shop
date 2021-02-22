import { html, fixture, expect } from '@open-wc/testing';

import '../__element-definitions/car-shop.js';

describe('IngCarShop', () => {
  it('has a default title "Hello, ing-web user!"', async () => {
    const el = await fixture(html`<car-shop></car-shop>`);

    expect(el.title).to.equal('Hello, ing-web user!');
  });

  it('accepts title overrides via attribute', async () => {
    const el = await fixture(html`<car-shop title="Alternative title"></car-shop>`);

    expect(el.title).to.equal('Alternative title');
  });

  it('renders the title', async () => {
    const el = await fixture(html`<car-shop title="Alternative title"></car-shop>`);
    const titleEl = el.shadowRoot.querySelector('.card__content').firstElementChild;

    expect(titleEl).dom.to.equal(`<h2>Alternative title</h2>`);
  });

  it('is accessible', async () => {
    const el = await fixture(html`<car-shop></car-shop>`);
    await expect(el).to.be.accessible();
  });
});
