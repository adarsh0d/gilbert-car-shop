import { html, fixture, expect } from '@open-wc/testing';

import '../__element-definitions/app-frame';

let el;
describe('App Frame', () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture(html`<app-frame></app-frame>`);
  });

  it('is accessible', () => {
     expect(el).to.be.accessible();
  });
});
