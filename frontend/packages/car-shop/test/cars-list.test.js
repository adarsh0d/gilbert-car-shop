import { html, fixture, expect } from '@open-wc/testing';

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

  it('is accessible', async () => {
    const el = await fixture(html`<cars-list .cars=${cars}></cars-list>`);
    await expect(el).to.be.accessible();
  });
});
