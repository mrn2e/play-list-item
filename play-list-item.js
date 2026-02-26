/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

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
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/play-list-item.ar.json", import.meta.url).href +
        "/../",
    });
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
      }
      
    `];
  }

  // Lit render the HTML
  //no text in this element, just create a flexbox that has default styles and classes for each of the components inside
  // the slot will be used to place the content of the play-list-item, which can be a slide-item, slide-arrow, or slide-indicator???
  //also work on flex @ media display for this element for phones n such 
  render() {
    return html`
<div class="wrapper">
  <slot></slot>
</div>
`;
  }
firstUpdated() {
    this.slides = this.querySelectorAll("slide-item");
    this.arrows = this.querySelectorAll("slide-arrow");

    this._updateSlides();

    this.arrows.forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        this._handleArrow(arrow.direction);
    });
  });
}

_handleArrow(direction) {
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
    if (index === this.currentIndex) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(PlayListItem.tag, PlayListItem);