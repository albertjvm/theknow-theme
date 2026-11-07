import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Card, PageTitle } from "./react.js";

test("Card renders a section with a heading, optional note and content", () => {
  assert.equal(renderToStaticMarkup(createElement(Card, { title: "Votes", note: "Recent" }, "Content")),
    '<section class="card"><h2>Votes</h2><p class="note">Recent</p>Content</section>');
  assert.equal(renderToStaticMarkup(createElement(Card, { title: "Votes" }, "Content")),
    '<section class="card"><h2>Votes</h2>Content</section>');
});

test("PageTitle renders a heading and optional actions", () => {
  assert.equal(renderToStaticMarkup(createElement(PageTitle, { title: "Members" }, createElement("a", { href: "/members" }, "All"))),
    '<div class="page-title"><h1>Members</h1><a href="/members">All</a></div>');
});
