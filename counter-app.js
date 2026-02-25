/**
 * Copyright 2026 Khaliel Myrie
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
    });
    this.count = 0;
    this.min = 0;
    this.max = 25;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number, reflect: true},
      min: { type: Number, reflect: true},
      max: { type: Number, reflect: true}
      }};
  

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-8);
      }

      /* css styling for minimum range */
      .wrapper.min .counter {
        color: var(--ddd-theme-default-creekTeal);
      }

      /* css styling for mid range */
      .wrapper.mid .counter {
        color: var(--ddd-theme-default-original87Pink);
      }

      /* css styling for high range */
      .wrapper.high .counter {
        color: var(--ddd-theme-default-keystoneYellow);
      }

      /* css styling for max number */
      .wrapper.max .counter {
        color: var(--ddd-theme-default-pughBlue);
      }

      .counter {
        margin: 0;
        font-size: var(--ddd-font-size-xxl);
        font-family: var(--ddd-font-navigation);
        line-height: 1;
        padding-bottom: var(--ddd-spacing-4);
      }

      .button-container {
        display: flex;
        gap: var(--ddd-spacing-4);
      }

      button {
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        font-size: var(--ddd-font-size-ms);
        border: var(--ddd-border-sm);
        background-color: var(--ddd-theme-default-limestone);
        border-radius: var(--ddd-radisu-xs);
      }
      
      button:hover, button:focus {
        background-color: var(--ddd-theme-default-alertImmediate);
        color: white;
        outline: none;
        box-shadow: var(--ddd-boxShadow-sm);
      }
    `];
  }

// set a color range so that it can be accessed in css styling
getCounterRange() {
  if (this.count === this.max) return 'max';
  if (this.count >= 21) return 'high';
  if (this.count >= 18) return 'mid';
  if (this.count < 18) return 'min';
  return 'default';
}

  // Lit render the HTML
  render() {
    return html`
      <confetti-container id="confetti">
        <div class="wrapper ${this.getCounterRange()}">
          <div class="counter">${this.count}</div>
          <div class="button-container">
            <button @click="${this.decrement}" ?disabled="${this.count === this.min}">-</button>
            <button @click="${this.increment}" ?disabled="${this.count === this.max}">+</button>
          </div>
          <slot></slot>
        </div>
      </confetti-container>`;
  }
  
  decrement() {
    if (this.count > this.min) {
    this.count--;
    }
  }
  
  increment() {
    if (this.count < this.max) {
    this.count++;
    }
  }


updated(changedProperties) {
  if (super.updated) {
    super.updated(changedProperties);
  }
  if (changedProperties.has('count')) {
    // do your testing of the value and make it rain by calling makeItRain
    if (this.count === 21) {
      this.makeItRain();
    }
  }
}

makeItRain() {
  // this is called a dynamic import. It means it won't import the code for confetti until this method is called
  // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
  // will only run AFTER the code is imported and available to us
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      // This is a minor timing 'hack'. We know the code library above will import prior to this running
      // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
      // this "hack" ensures the element has had time to process in the DOM so that when we set popped
      // it's listening for changes so it can react
      setTimeout(() => {
        // forcibly set the poppped attribute on something with id confetti
        // while I've said in general NOT to do this, the confetti container element will reset this
        // after the animation runs so it's a simple way to generate the effect over and over again
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);