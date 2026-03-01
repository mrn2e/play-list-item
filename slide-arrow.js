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
    
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };;
  }

  // Lit reactive properties
  //tasks: direction, dispatch event
  static get properties() {
    return {
      ...super.properties,
      direction: { type: String },
      right: { type: String, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      button { //I just styled the html tag since I never made a class for each button, just their container
        display: block;
        background-color: var(--ddd-theme-default-link80);
        color: var(--ddd-theme-default-infoLight);
        width: 50px;
        height: 50px;
        font-size: var(--counter-app-button-font-size, var(--ddd-font-size-s));
        margin: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-md);
        transition: background-color 0.3s, transform 0.3s;
      }
      button:hover{
        background-color: var(--ddd-theme-default-info);
        color: var(--ddd-theme-default-infoLight);
        transform: scale(1.1);
      }
    `];
  }

  // Lit render the HTML
  //im confew on how I will place these, can I insert them into a slotted elem in the play list item? or does it need to be in the index html? 
  render() {
    return html`
    <button>
      ${this.direction === "next" ? ">" : "<"}
    </button>
`;
  }
}

globalThis.customElements.define(SlideArrow.tag, SlideArrow);