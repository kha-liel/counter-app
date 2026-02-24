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
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      count: { type: Number, reflect: true},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }

      :host([count="18"]) h3 {
        color: var(--ddd-them-default-original87Pink);
      }
      :host([count="21"]) h3 {
        color: var(--ddd-theme-default-keppel);
      }
      :host([count="0"]) h3 {
        color: var(--ddd-theme-default-creamyPeach);
      }

    :host([count="25"]) h3 {
      color: var(--ddd-theme-default-pennBlue);
    }
      
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3>${this.count}</h3>
  <div class="button-container">
    <button @click="${this.decrement}" ?disabled="${this.count === 0}">-</button>
    <button @click="${this.increment}" ?disabled="${this.count === 25}">+</button>
  </div>
  <slot></slot>
</div>`;
  }
  
  decrement() {
    this.count--;
  }
  
  increment() {
    this.count++;
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