/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { state } from "lit/decorators.js";

/**
 * `play-list-item`
 * 
 * @demo index.html
 * @element play-list-item
 */
export class PlayListItem extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "play-list-item";
  }

  constructor() {
    super();
    this.title = "";
    this.currentIndex = 0;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    ;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentIndex: { type: Number },
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
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: var(--ddd-theme-default-alertNonEmergency);
      }
      
    `];
  }

  // Lit render the HTML
  //no text in this element, just create a flexbox that has default styles and classes for each of the components inside
  // the slot will be used to place the content of the play-list-item, which can be a slide-item, slide-arrow, or slide-indicator???
  //also work on flex @ media display for this element for phones n such
  //tasks: Track current slide, Handle next/prev, Listen for events from arrows + indicators, Control which slide is visible 

  render() {
    return html`
<div class="wrapper">
  <slot></slot>
</div>
`;
  }

firstUpdated() {
  const slot = this.shadowRoot.querySelector("slot");
  const elements = slot.assignedElements({ flatten: true });

  this.slides = elements.filter(
    (el) => el.tagName === "SLIDE-ITEM"
  );

  this.arrows = elements.filter(
    (el) => el.tagName === "SLIDE-ARROW"
  );

  this._updateSlides();

  this.arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      this._handleArrow(arrow.direction);
    });
  });
  
}

_handleArrow(direction) {
  if (!this.slides.length) return;

  if (direction === "next") {
    this.currentIndex =
      (this.currentIndex + 1) % this.slides.length;
  } else {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) %
      this.slides.length;
  }

  this._updateSlides();
}

_updateSlides() {
  this.slides.forEach((slide, index) => {
    slide.toggleAttribute("active", index === this.currentIndex);
  });
}

}

globalThis.customElements.define(PlayListItem.tag, PlayListItem);