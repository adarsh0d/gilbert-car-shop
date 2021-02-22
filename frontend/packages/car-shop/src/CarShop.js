import {
  cardComponentStyle,
  css,
  html,
  linkComponentStyle,
  LitElement,
  ScopedElementsMixin,
  spacer64,
} from 'ing-web';

export class CarShop extends ScopedElementsMixin(LitElement) {

  static get properties() {
    return {
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'Hello, ing-web user!';
  }

  render() {
    return html`
      <div class="page-container">
        <div class="card intro">
          <div class="card__content">
            <h2>${this.title}</h2>
            <p>
              This scaffold was made using
              <a href="https://gitlab.ing.net/TheGuideComponents/create-ing-web" class="link"
                >create-ing-web</a
              >
            </p>
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      ${linkComponentStyle}
      ${cardComponentStyle}

      .page-container {
        text-align: center;
        margin-top: ${spacer64};
      }

      .intro {
        display: inline-block;
        margin: 0 auto;
      }
    `;
  }
}
