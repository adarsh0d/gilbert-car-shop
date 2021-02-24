import { html, fixture, expect, nextFrame, aTimeout } from '@open-wc/testing';
import { stub } from 'sinon';

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
  it('should show details popup on click', async () => {
    const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
    const ev = new CustomEvent('showCarDetails', {
      detail: {
          car: cars[0]
      }
    })
    el.showCarDetails(ev);
    expect(el.selectedCar.carInfo.make).to.equal('Volkswagen');
    el.requestUpdate();
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.car-dialog').opened).to.equal(true);
  });
  it('should close the details popup', async () => {
    const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
    const ev = new CustomEvent('search', {
      detail: {
          car: cars[0]
      }
    })
    el.showCarDetails(ev);
    el.requestUpdate();
    await el.updateComplete;
    const closeBtn = (document.querySelector(
      '.close-modal',
    ));
    closeBtn.click();
    const done = await aTimeout(1000);
    if(done) {
      expect(el.shadowRoot.querySelector('.car-dialog').opened).to.equal(false);
    }
  });
  it('is accessible', async () => {
    const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
    await expect(el).to.be.accessible("Volkswagen");
  });
});
