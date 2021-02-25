import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';

import '../__element-definitions/car-shop.js';
import { cars } from './cars.js';


describe('CarShop', () => {
  it('has a default title "Gilbert car shop"', async () => {
    const el = await fixture(html`<car-shop></car-shop>`);
    const pageTitleEl = el.shadowRoot.querySelector('.header__title')
    expect(pageTitleEl.innerText).to.equal('Gilbert car shop');
  });

  it('should fetch for cars', async() => {
    const el = await fixture(html`<car-shop></car-shop>`);
    const response = { ok: true, json: () => new Promise((resolve, reject) => resolve(cars)) };
    const fetchStub = stub(window, 'fetch').resolves(response);
    el._fetchData();
    expect(fetchStub.calledWith('/search/cars')).to.equal(true);
  });
  it('should have a basket', async() => {
    const el = await fixture(html`<car-shop></car-shop>`);
    const basketEl = el.shadowRoot.querySelector('.car-basket');
    expect(basketEl).to.not.equal(null);
  });

  it('is accessible', async () => {
    const el = await fixture(html`<car-shop></car-shop>`);
    await expect(el).to.be.accessible();
  });
});
