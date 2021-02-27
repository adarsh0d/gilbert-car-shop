import { html, fixture, expect, assert } from '@open-wc/testing';

import '../__element-definitions/car-details-dialog.js';

const car = {
  "id": 1,
  "location": {
    "name": "West wing",
    "warehouse": "Warehouse A",
    "lat": "47.13111",
    "long": "-61.54801"
  },
  "carInfo": {
    "make": "Volkswagen",
    "model": "Jetta III",
    "yearModel": 1995,
    "price": 12947.52,
    "licensed": true,
    "dateAdded": "2018-09-18"
  }
};
let el;
describe('Car Details Popup', () => {
  it('should open the dialog', async () => {
    el = await fixture(html`<car-details-dialog .carToShow=${car} .opened=${true}></car-details-dialog>`);
    assert.isTrue(el.shadowRoot.querySelector('dialog-window').opened);
  })
  it('should close the dialog', async () => {
    el = await fixture(html`<car-details-dialog .carToShow=${car} .opened=${false}></car-details-dialog>`);
    assert.isFalse(el.shadowRoot.querySelector('dialog-window').opened);
  });
  it('should close the dialog', async () => {
    el = await fixture(html`<car-details-dialog .carToShow=${car} .opened=${false}></car-details-dialog>`);
    assert.isFalse(el.shadowRoot.querySelector('dialog-window').opened);
  });
  it('should show car details', async () => {
    el = await fixture(html`<car-details-dialog .carToShow=${car} .opened=${true}></car-details-dialog>`);
    assert.isNotNull(document.querySelector('[data-tag-name="car-details"]'));
  });
  it('should check if car already in basket', async () => {
    car.alreadyInBasket = true;
    el = await fixture(html`<car-details-dialog .carToShow=${car} .opened=${true}></car-details-dialog>`);
    assert.equal(document.querySelector('.buy-btn').innerText, 'In shopping basket');
    assert.isTrue(document.querySelector('.buy-btn').disabled);
  });
  it('should check if car not in basket', async () => {
    delete car.alreadyInBasket;
    el = await fixture(html`<car-details-dialog .carToShow=${car} .opened=${true}></car-details-dialog>`);
    assert.equal(document.querySelector('.buy-btn').innerText, 'Buy');
    assert.isFalse(document.querySelector('.buy-btn').disabled);
  });
  it('should call buy car function', async () => {
    let carBought = false;
    el = await fixture(html`<car-details-dialog .carToShow=${car} .opened=${true} .buyCar=${() => {carBought = true}}></car-details-dialog>`);
    document.querySelector('.buy-btn').click();
    assert.isTrue(carBought);
  });
  it('should call close Modal function', async () => {
    let opened = true;
    el = await fixture(html`<car-details-dialog .carToShow=${car} .opened=${true} .closeModal=${() => {opened = false}}></car-details-dialog>`);
    document.querySelector('.close-modal-btn').click();
    assert.isFalse(opened);
  });
  it('is accessible', () => {
     expect(el).to.be.accessible();
  });
});
