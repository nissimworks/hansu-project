# 한수 프로젝트 · Hansu Project

The public website for 한수 프로젝트 (Hansu Project), a Busan mentorship venture
operated by 닛심워크 (Nissim Work): retired senior executives paired one to one with
early-stage founders for six months at no cost, plus a free bilingual Startup Support
Navigator.

- `index.html` : landing page, English and Korean in one file with a language switch.
- `navigator.html` : the Startup Support Navigator, a self contained page that runs in
  the browser and stores nothing.
- `assets/` : logo files, two illustrations, the short brand film and its poster,
  the social share card.

Static files only. No build step, no server, no analytics, no cookies.

## Hosting

GitHub Pages, branch `main`, folder `/` (root). The site is served at
https://nissimworks.github.io/hansu-project/

## Editing

Text lives in `index.html` as `data-en` and `data-ko` attributes on one element, so the
English and Korean versions sit next to each other and the switch stays in sync. Buttons
in the join section open a pre filled email to nissimworks@gmail.com; the message is
built in the script at the bottom of the page.

To replace the email buttons with a Google Form, point the `href` of the three links
carrying `data-form` at the form URL and add `target="_blank" rel="noopener"`.
