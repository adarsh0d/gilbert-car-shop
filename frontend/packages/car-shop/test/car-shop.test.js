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
    const response = { ok: true, json: () => new Promise((resolve, reject) => resolve(cars)) };
    const fetchStub = sinon.stub(window, 'fetch').resolves(response);
    el.connectedCallback();
    expect(fetchStub.calledWith('/search/cars')).to.equal(true);
  });
  it('should have a basket', async() => {
    const el = await fixture(html`<car-shop></car-shop>`);
    const basketEl = el.shadowRoot.querySelector('.car-basket');
    expect(basketEl).to.not.equal(null);
  });
  it('should update the basket', async() => {
    const el = await fixture(html`<car-shop></car-shop>`);
    const ev = new CustomEvent('buyCar', {
      detail: {
          car: cars[0]
      }
    });
    el._updateBasket(ev);
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.total-value').innerText).to.equal("$12947.52");
    expect(el.shadowRoot.querySelector('.total-count').innerText).to.equal("1 cars");
  });
  it('should call the update basket function', async() => {
    const el = await fixture(html`<car-shop></car-shop>`);
    const carListEl = el.shadowRoot.querySelector('.car-list');
    const ev = new CustomEvent('showCarDetails', {
      detail: {
          car: cars[0]
      }
    })
    carListEl.showCarDetails(ev);
    carListEl.requestUpdate();
    await carListEl.updateComplete;
    expect(carListEl.shadowRoot.querySelector('.car-dialog').opened).to.equal(true);
    const buyBtn = (document.querySelector(
      '.buy-btn',
    ));
    const updateBasketFunctionStub = stub(el, '_updateBasket')
    buyBtn.click();
    expect(updateBasketFunctionStub).to.have.callCount(1);
  });

  it('is accessible', async () => {
    const el = await fixture(html`<car-shop></car-shop>`);
    await expect(el).to.be.accessible();
  });
});
