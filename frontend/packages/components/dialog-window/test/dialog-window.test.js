import { html, fixture, expect } from '@open-wc/testing';

import '../__element-definitions/dialog-window';

let el;
describe('Dialog Window', () => {
  before(async () => {
    // runs before all tests in this block
    el = await fixture(html`<dialog-window></dialog-window>`);
  });
  it('is accessible', () => {
     expect(el).to.be.accessible();
  });
});
