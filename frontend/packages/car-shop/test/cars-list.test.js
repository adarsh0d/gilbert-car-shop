import { html, fixture, expect, nextFrame, aTimeout } from '@open-wc/testing';
import { stub, spy } from 'sinon';

import '../__element-definitions/cars-list.js';
import {cars} from './cars';

describe('Cars List', () => {
  it('has no car available if cars not loaded', async () => {
    const el = await fixture(html`<cars-list></cars-list>`);
    const noCarsEl = el.shadowRoot.querySelector('.no-cars-alert');
    expect(noCarsEl).to.not.equal(undefined);
  });

  it('renders list of cars', async () => {
    const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
    const carElements = el.shadowRoot.querySelectorAll('li')
    expect(carElements.length).to.equal(4);
  });
  it('should call showdetails on click', async () => {
      const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
      el.requestUpdate();
      await el.updateComplete;
      const cardEl = el.shadowRoot.querySelector('li:first-child > car-card');
      const showCardDetailsSpy = stub(el, 'showCarDetails');
      cardEl.shadowRoot.querySelector('.btn__read').click();
      await el.updateComplete;
      expect(showCardDetailsSpy).to.have.callCount(1);
  });

  it('is accessible', async () => {
    const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
    await expect(el).to.be.accessible("Volkswagen");
  });
});
describe('Car details', () => {
  let el;
  beforeEach(async () => {
    el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
    const ev = new CustomEvent('showCarDetails', {
      detail: {
          car: cars[0]
      }
    })
    el.showCarDetails(ev);
    el.requestUpdate();
    await el.updateComplete;
  })

  it('should show details popup on click', async () => {
    expect(el.carToShow.carInfo.make).to.equal('Volkswagen');
    expect(el.shadowRoot.querySelector('.car-dialog').opened).to.equal(true);
  });
  it('should have a buy button', async () => {
    const buyBtn = (document.querySelector(
      '.buy-btn',
    ));
    expect(buyBtn).to.not.equal(null);
  });
  it('should call buyCar function', async () => {
    const buyBtn = (document.querySelector(
      '.buy-btn',
    ));
    const buyFunctionStub = stub(el, '_buyCar')
    buyBtn.click();
    expect(buyFunctionStub).to.have.callCount(1);
  });
  it('should buy product', async () => {
    el.carToShow = cars[0]
    el.requestUpdate();
    await el.updateComplete;
    el._buyCar();

    expect(el.carsInBasket.length).to.equal(1);
  });
  it('should close the details popup', async () => {
    const closeBtn = (document.querySelector(
      '.close-modal-btn',
    ));
    closeBtn.click();
    const done = await aTimeout(1000);
    if(done) {
      expect(el.shadowRoot.querySelector('.car-dialog').opened).to.equal(false);
    }
  });
})
