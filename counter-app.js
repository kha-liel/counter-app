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

      /*:host([count="18"]) h3 {
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
      }*/
      
      .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-8);
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

counterColor() {
  if (this.count === 18) return 'var(--ddd-theme-default-Original87Pink)';
  if (this.count === 21) return 'var(--ddd-theme-default-keppel)';
  if (this.count === this.min) return 'var(--ddd-theme-default-creamyPeach)';
  if (this.count === this.max) return 'var(--ddd-theme-default-pennBlue)';
  return inherit;
}

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div class="counter" style = "color: ${this.counterColor}">${this.count}</div>
  <div class="button-container">
    <button @click="${this.decrement}" ?disabled="${this.count === this.min}">-</button>
    <button @click="${this.increment}" ?disabled="${this.count === this.max}">+</button>
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