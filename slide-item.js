/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `slide-item
 * 
 * @demo index.html
 * @element slide-item
 */
export class SlideItem extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "slide-item";
  }

  constructor() {
    super();
    this.title = "";
    this.desc = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/slide-item.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      desc: { type: String },
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
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        width: 300px;
        height: 100px;
      }
    
    `];
  }

  // Lit render the HTML
  //tasks: know index, show/hide based on idex (class? for active)
  render() {
    return html`
<div class="wrapper">
  <h3>${this.title}</h3>
  <h3 class="desc">${this.desc}</h3>
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(SlideItem.tag, SlideItem);