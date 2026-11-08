import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AlignmentHeatmap, Brand, Card, ElectionsLabel, MotionRow, OverviewIntro, PageTitle, SortableTable, TallyBar } from "./react.js";

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

test("motion rows render the shared result, tally and optional chips", () => {
  const html = renderToStaticMarkup(createElement(MotionRow, {
    title: createElement("a", { href: "/vote", className: "motion-title" }, "Motion"),
    meta: "2025", yes: 3, no: 1, outcome: "Carried", outcomeClass: "carried",
  }, createElement("div", { className: "motion-chips" }, "Tag")));
  assert.match(html, /class="motion-main"/);
  assert.match(html, /class="motion-chips"/);
  assert.match(html, /width:75%/);
  assert.match(html, /badge carried/);
  assert.match(html, /3–1/);
  assert.match(renderToStaticMarkup(createElement(TallyBar, { yes: 0, no: 0 })), /width:0%/);
});

test("sortable table places missing values last in descending order", () => {
  const html = renderToStaticMarkup(createElement(SortableTable, {
    rows: [{ id: "missing", n: null }, { id: "low", n: 1 }, { id: "high", n: 4 }],
    columns: [{ key: "n", label: "Number", value: (row) => row.n }],
    rowKey: (row) => row.id, initialSort: "n", initialDescending: true,
  }));
  assert.match(html, /aria-sort="descending"/);
  assert.match(html, /<td>4<\/td>.*<td>1<\/td>.*<td>—<\/td>/);
});

test("alignment heatmap excludes members below the shared-vote threshold", () => {
  const html = renderToStaticMarkup(createElement(AlignmentHeatmap, {
    alignment: { memberIds: ["a", "b"], agreement: [[1, 0.5], [0.5, 1]], sharedVotes: [[10, 4], [4, 4]] },
    names: { a: "Able", b: "Baker" }, label: (name) => name, minimumShared: 5,
  }));
  assert.match(html, /Able/);
  assert.doesNotMatch(html, /Baker/);
});
