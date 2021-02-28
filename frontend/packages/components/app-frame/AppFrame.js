import {
  html,
  css,
  LitElement,
  elevation1Mixin,
  spacer32,
  spacer64,
  white,
  spacer24,
  registerDefaultIconsets,
} from 'ing-web';

registerDefaultIconsets();
export class AppFrame extends LitElement {
  constructor() {
    super()
  }

  render() {
    return html`
      <div class="page-container">
        <header class="page__header">
          <section class="header__left">
            <slot name="left"></slot>
          </section>
          <section class="header__right">
            <slot name="right"></slot>
          <section class="header__left">
        </header>
        <main class="content">
          <slot name="main"></slot>
        </main>
      </div>
    `
  }

  static get styles() {
    return css`
      .page__header {
        position: fixed;
        top: 0;
        z-index: 1;
        width: 100%;
        background-color: ${white};
        height: ${spacer64};
        min-height: ${spacer64};
        padding: 20px;
        box-sizing: border-box;
        ${elevation1Mixin()}
        display: flex;
        align-items: center;
      }
      .header__left {
        margin: 0;
        flex: 1;
      }
      ::sloted(h1) {
        font-size: ${spacer24}
      }
      .content {
        margin: 90px ${spacer32}
      }
    `;
  }
}
