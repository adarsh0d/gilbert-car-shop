import { LitElement, html } from 'ing-web';
import { OverlayMixin, OverlayController } from 'ing-web';

export class DialogWindow extends OverlayMixin(LitElement) {
  render() {
    return html`
      <div id="overlay-content-node-wrapper">
        <slot name="content"></slot>
      </div>
    `;
  }

  // FIXME: This should be refactored to Array.from(this.children).find(child => child.slot === 'content')
  // When this issue is fixed https://github.com/ing-bank/lion/issues/382
  get _overlayContentNode() {
    return this.querySelector('[slot="content"]');
  }

  get _overlayInvokerNode() {
    return Array.from(this.children).find(child => child.slot === 'invoker');
  }

  get _overlayContentWrapperNode() {
    return this.shadowRoot.querySelector('#overlay-content-node-wrapper');
  }

  // eslint-disable-next-line class-methods-use-this
  _defineOverlay() {
    return new OverlayController({
      placementMode: 'global',
      contentNode: this._overlayContentNode,
      invokerNode: this._overlayInvokerNode,
      contentWrapperNode: this._overlayContentWrapperNode,
      handlesAccessibility: true,
      hasBackdrop: true
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.__toggle = () => this._overlayCtrl.toggle();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
}
