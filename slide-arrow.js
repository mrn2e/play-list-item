/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `slide-arrow
 * 
 * @demo index.html
 * @element slide-arrow
 */
export class SlideArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "slide-arrow";
  }

  constructor() {
    super();
    this.title = "";
    this.right = " > ";
    this.left = " < ";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/slide-arrow.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      right: { type: String },
      left: { type: String },
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
      }
      h3 span {
        font-size: var(--slide-arrow-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  //im confew on how I will place these, can I insert them into a slotted elem in the play list item? or does it need to be in the index html? 
  render() {
    return html`
<div class="wrapper">
  <div class="right-arrow">${this.right}</div> 
    <div class="left-arrow">${this.left}</div>
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

globalThis.customElements.define(SlideArrow.tag, SlideArrow);