import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Brand, Card, ElectionsLabel, OverviewIntro, PageTitle } from "./react.js";

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

test("elections label shares an accessible text name and decorative icon", () => {
  assert.equal(renderToStaticMarkup(createElement(ElectionsLabel)),
    '<span><span aria-hidden="true">🗳️</span> Elections</span>');
});

test("brand preserves separate home and jurisdiction navigation", () => {
  assert.equal(renderToStaticMarkup(createElement(Brand, null, createElement("a", {
    className: "brand-region", href: "#/overview", "aria-label": "Canada app home",
  }, "Canada"))), '<div class="brand"><a class="brand-name" href="https://theknow.ca/" aria-label="TheKnow home">TheKnow</a><a class="brand-region" href="#/overview" aria-label="Canada app home">Canada</a></div>');
});

test("overview intro renders the shared title card and actions", () => {
  assert.equal(renderToStaticMarkup(createElement(OverviewIntro, {
    eyebrow: "Council", title: "Overview", titleId: "intro", description: "Explore",
  }, createElement("a", { className: "overview-action", href: "/votes" }, "Votes"))),
  '<section class="overview-intro" aria-labelledby="intro"><p class="overview-eyebrow">Council</p><h1 id="intro">Overview</h1><p>Explore</p><div class="overview-actions"><a class="overview-action" href="/votes">Votes</a></div></section>');
});
