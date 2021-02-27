import { html, fixture, expect, assert } from '@open-wc/testing';
import { stub } from 'sinon';

import '../__element-definitions/car-card.js';

const licensedCar = {
  "carInfo": {
    "make": "Volkswagen",
    "model": "Jetta III",
    "yearModel": 1995,
    "price": 12947.52,
    "licensed": true,
    "dateAdded": "2018-09-18"
  }
};
const unLicensedCar = {
  "carInfo": {
    "make": "Saab",
    "model": "900",
    "yearModel": 1987,
    "price": 8771.0,
    "licensed": false,
    "dateAdded": "2017-12-01"
  }
};
let el;
describe('Licensed Car', () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture(html`<car-card .data=${licensedCar}></car-card>`);
  });

  it('should elevate the card', () => {
    const cardEl = el.shadowRoot.querySelector('.card');
    assert.isTrue(cardEl.classList.contains('card--elevated'));
  });

  it('has car make', () => {
    const carMakeEl = el.shadowRoot.querySelector('.car__make');
    assert.equal(carMakeEl.innerText, 'Volkswagen');
    assert.equal(carMakeEl.getAttribute('title'), 'Volkswagen');
  });

  it('has car model', () => {
    const carModelEl = el.shadowRoot.querySelector('.car__model');
    assert.equal(carModelEl.innerText, 'Jetta III');
    assert.equal(carModelEl.getAttribute('title'), 'Jetta III');
  });

  it('has car price', () => {
    const carPriceEl = el.shadowRoot.querySelector('.car__price');
    assert.equal(carPriceEl.innerText, '$12947.52');
    assert.equal(carPriceEl.getAttribute('title'), '$12947.52');
  });

  it('has car year model', () => {
    const carYearModelEl = el.shadowRoot.querySelector('.car__year-model');
    assert.equal(carYearModelEl.innerText, '1995');
    assert.equal(carYearModelEl.getAttribute('title'), '1995');
  });

  it('has car added date', () => {
    const carDateEl = el.shadowRoot.querySelector('.car__date-added');
    assert.equal(carDateEl.innerText, '2018-09-18');
    assert.equal(carDateEl.getAttribute('title'), '2018-09-18');
  });

  it('has car license information', () => {
    const carLicensedEl = el.shadowRoot.querySelector('.car__licensed');
    assert.equal(carLicensedEl.innerText, 'Licensed');
    assert.equal(carLicensedEl.getAttribute('title'), 'Licensed');
  });
  it('is already in Basket', async () => {
    licensedCar.alreadyInBasket = true;
    el = await fixture(html`<car-card .data=${licensedCar}></car-card>`);
    const carStatusEl = el.shadowRoot.querySelector('.car__status');
    assert.isNotNull(carStatusEl);
  });
  it('should call showCarDetails', async () => {
    let value = false;
    el = await fixture(html`<car-card .data=${licensedCar} .showCarDetails=${() => { value = true}}></car-card>`);
    const btnShowEl = el.shadowRoot.querySelector('.btn__read');
    btnShowEl.click();
    assert.isTrue(value);
  });
  it('is accessible', () => {
     expect(el).to.be.accessible();
  });
});

describe('Unlicensed car', () => {
  it('has car license information', async () => {
    el = await fixture(html`<car-card .data=${unLicensedCar}></car-card>`);
    const carLicensedEl = el.shadowRoot.querySelector('.car__licensed');
    assert.equal(carLicensedEl.innerText, 'Unlicensed');
    assert.equal(carLicensedEl.getAttribute('title'), 'Unlicensed');
  });
  it('should not elevate the card', () => {
    const cardEl = el.shadowRoot.querySelector('.card');
    assert.isFalse(cardEl.classList.contains('card--elevated'));
  });
  it('is accessible', async () => {
    el = await fixture(html`<car-card .data=${unLicensedCar}></car-card>`);
    await expect(el).to.be.accessible();
  });
  it('should call not showCarDetails', async () => {
    let value = false;
    el = await fixture(html`<car-card .data=${unLicensedCar} .showCarDetails=${() => { value = true}}></car-card>`);
    const btnShowEl = el.shadowRoot.querySelector('.btn__read');
    btnShowEl.click();
    assert.isFalse(value);
  });


})
