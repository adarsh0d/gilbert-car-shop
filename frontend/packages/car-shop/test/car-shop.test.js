import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../__element-definitions/car-shop.js';
import { cars } from './cars.js';


describe('CarShop', () => {
  afterEach(() => {
    sinon.restore();
  })
  it('has a default title "Gilbert car shop"', async () => {
    const el = await fixture(html`<car-shop></car-shop>`);
    const pageTitleEl = el.shadowRoot.querySelector('.header__title')
    expect(pageTitleEl.innerText).to.equal('Gilbert car shop');
  });

  it('should fetch for cars', async() => {
    const el = await fixture(html`<car-shop></car-shop>`);
    const fetchStub = sinon.stub(window, 'fetch')
    el.connectedCallback();
    fetchStub.onCall(0).returns(cars);
    expect(fetchStub.calledWith('/search/cars')).to.equal(true);
  });

  it('is accessible', async () => {
    const el = await fixture(html`<car-shop></car-shop>`);
    await expect(el).to.be.accessible();
  });
});
