import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';

import '../__element-definitions/car-card.js';

const licensedCar = {
  "make": "Volkswagen",
  "model": "Jetta III",
  "yearModel": 1995,
  "price": 12947.52,
  "licensed": true,
  "dateAdded": "2018-09-18"
};
const unLicensedCar = {
  "make": "Saab",
  "model": "900",
  "yearModel": 1987,
  "price": 8771.0,
  "licensed": false,
  "dateAdded": "2017-12-01"
};
let el;
describe('Licensed Car', () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture(html`<car-card .data=${licensedCar}></car-card>`);
  });

  it('should elevate the card', () => {
    const cardEl = el.shadowRoot.querySelector('.card');
    expect(cardEl.classList.contains('card--elevated')).to.equal(true);
  });

  it('should call the showCarDetails function', async () => {
    const cardEl = el.shadowRoot.querySelector('.card');
    const showCarDetailsStub = stub(el, 'showCarDetails');
    el.requestUpdate();
    await el.updateComplete;
    cardEl.click();
    expect(showCarDetailsStub).to.have.callCount(1);
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

describe('Unlicensed car', () => {
  it('has car license information', async () => {
    el = await fixture(html`<car-card .data=${unLicensedCar}></car-card>`);
    const carLicensedEl = el.shadowRoot.querySelector('.car__licensed');
    expect(carLicensedEl.innerText).to.equal('Unlicensed');
    expect(carLicensedEl.getAttribute('title')).to.equal('Unlicensed');
  });
  it('is accessible', async () => {
    el = await fixture(html`<car-card .data=${unLicensedCar}></car-card>`);
    await expect(el).to.be.accessible();
  });

  it('should not elevate the card', () => {
    const cardEl = el.shadowRoot.querySelector('.card');
    expect(cardEl.classList.contains('card--elevated')).to.equal(false);
  });

  it('should not call the showCarDetails function', async () => {
    const cardEl = el.shadowRoot.querySelector('.card');
    const showCarDetailsStub = stub(el, 'showCarDetails');
    el.requestUpdate();
    await el.updateComplete;
    cardEl.click();
    expect(showCarDetailsStub).to.have.callCount(0);
  });
})
