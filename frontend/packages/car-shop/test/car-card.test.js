import { html, fixture, expect } from '@open-wc/testing';

import '../__element-definitions/car-card.js';

const licensedCar = {
  "_id": 1,
  "make": "Volkswagen",
  "model": "Jetta III",
  "year_model": 1995,
  "price": 12947.52,
  "licensed": true,
  "date_added": "2018-09-18"
};
const unLicensedCar = {
  "_id": 4,
  "make": "Saab",
  "model": "900",
  "year_model": 1987,
  "price": 8771.0,
  "licensed": false,
  "date_added": "2017-12-01"
};
let el;
describe('Licensed Car', () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture(html`<car-card .data=${licensedCar}></car-card>`);
  });
  it('has car make', () => {
    const carMakeEl = el.shadowRoot.querySelector('.car__make');
    expect(carMakeEl.innerText).to.equal('Volkswagen');
  });

  it('has car model', () => {
    const carModelEl = el.shadowRoot.querySelector('.car__model');
    expect(carModelEl.innerText).to.equal('Jetta III');
  });

  it('has car price', () => {
    const carPriceEl = el.shadowRoot.querySelector('.car__price');
    expect(carPriceEl.innerText).to.equal('12947.52');
  });

  it('has car year model', () => {
    const carYearModelEl = el.shadowRoot.querySelector('.car__year-model');
    expect(carYearModelEl.innerText).to.equal('1995');
  });

  it('has car added date', () => {
    const carDateEl = el.shadowRoot.querySelector('.car__date-added');
    expect(carDateEl.innerText).to.equal('2018-09-18');
  });

  it('has car license information', () => {
    const carLicensedEl = el.shadowRoot.querySelector('.car__licensed');
    expect(carLicensedEl.innerText).to.equal('Licensed');
  });

  it('is accessible', () => {
     expect(el).to.be.accessible();
  });
});

describe('Unlicensed car', () => {
  it('has car license information', async () => {
    el = await fixture(html`<car-card .data=${unLicensedCar}></car-card>`);
    const carLicensedEl = el.shadowRoot.querySelector('.car__licensed');
    expect(carLicensedEl.innerText).to.equal('Unlicensed');
  });
  it('is accessible', async () => {
    el = await fixture(html`<car-card .data=${unLicensedCar}></car-card>`);
    await expect(el).to.be.accessible();
  });
})
