import { html, fixture, expect } from '@open-wc/testing';

import '../__element-definitions/car-details.js';

const car = {
  "location": {
    "name": "West wing",
    "warehouse": "Warehouse A",
    "lat": "47.13111",
    "long": "-61.54801"
  },
  "make": "Volkswagen",
  "model": "Jetta III",
  "yearModel": 1995,
  "price": 12947.52,
  "licensed": true,
  "dateAdded": "2018-09-18"
};
let el;
describe('Car Details Popup', () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture(html`<car-details .data=${car}></car-details>`);
  });

  it('has car warehouse', () => {
    const carWarehouseEl = el.shadowRoot.querySelector('.car__warehouse');
    expect(carWarehouseEl.innerText).to.equal('Warehouse A');
    expect(carWarehouseEl.getAttribute('title')).to.equal('Warehouse A');
  });
  it('has car location', () => {
    const carLocationEl = el.shadowRoot.querySelector('.car__location');
    expect(carLocationEl.innerText).to.equal('West wing');
    expect(carLocationEl.getAttribute('title')).to.equal('West wing');
  });
  it('has car make', () => {
    const carMakeEl = el.shadowRoot.querySelector('.car__make');
    expect(carMakeEl.innerText).to.equal('Volkswagen');
    expect(carMakeEl.getAttribute('title')).to.equal('Volkswagen');
  });

  it('has car model', () => {
    const carModelEl = el.shadowRoot.querySelector('.car__model');
    expect(carModelEl.innerText).to.equal('Jetta III');
    expect(carModelEl.getAttribute('title')).to.equal('Jetta III');
  });

  it('has car price', () => {
    const carPriceEl = el.shadowRoot.querySelector('.car__price');
    expect(carPriceEl.innerText).to.equal('$12947.52');
    expect(carPriceEl.getAttribute('title')).to.equal('$12947.52');
  });

  it('has car year model', () => {
    const carYearModelEl = el.shadowRoot.querySelector('.car__year-model');
    expect(carYearModelEl.innerText).to.equal('1995');
    expect(carYearModelEl.getAttribute('title')).to.equal('1995');
  });

  it('has car added date', () => {
    const carDateEl = el.shadowRoot.querySelector('.car__date-added');
    expect(carDateEl.innerText).to.equal('2018-09-18');
    expect(carDateEl.getAttribute('title')).to.equal('2018-09-18');
  });

  it('has car license information', () => {
    const carLicensedEl = el.shadowRoot.querySelector('.car__licensed');
    expect(carLicensedEl.innerText).to.equal('Licensed');
    expect(carLicensedEl.getAttribute('title')).to.equal('Licensed');
  });

  it('is accessible', () => {
     expect(el).to.be.accessible();
  });
});
