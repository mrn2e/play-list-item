import { html, fixture, expect } from '@open-wc/testing';
import "../play-list-item.js";

describe("PlayListItem test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <play-list-item
        title="title"
      ></play-list-item>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
