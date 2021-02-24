import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';

import '../__element-definitions/cars-list.js';
import {cars} from './cars';

describe('Cars List', () => {
  it('has no car available if cars not loaded', async () => {
    const el = await fixture(html`<cars-list></cars-list>`);
    const noCarsEl = el.shadowRoot.querySelector('.no-cars-alert');
    expect(noCarsEl.innerText).to.equal('No cars available!');
  });

  it('renders list of cars', async () => {
    const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
    const carElements = el.shadowRoot.querySelectorAll('li')
    expect(carElements.length).to.equal(4);
  });

   it('should show details on to click card', async () => {
      const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
      const cardEl = el.shadowRoot.querySelector('li:first-child > car-card');
      const showCardDetailsSpy = stub(el, 'showCarDetails');
      el.requestUpdate();
      await el.updateComplete;
      cardEl.shadowRoot.querySelector('.card').click();
      expect(showCardDetailsSpy).to.have.callCount(1);
  });

  it('is accessible', async () => {
    const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
    await expect(el).to.be.accessible();
  });
});
