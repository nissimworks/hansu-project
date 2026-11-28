# 한수 프로젝트 · Hansu Project

The public website for 한수 프로젝트 (Hansu Project), a Busan venture run by 닛심워크
(Nissim Work): one retired senior executive paired with one early-stage founder for six
months at no cost, plus a free bilingual Startup Support Navigator.

## Pages

| File | What it is for |
|---|---|
| `index.html` | Home. The story, the film, and the fork into the two audiences. |
| `founders.html` | For founders. What they get, the protections, the FAQ, and the Navigator. |
| `seniors.html` | For senior executives. The ask, the time, the hard questions, the founding circle. |
| `about.html` | About Nofar Lupo: who she is and why she convenes the table. |
| `join.html` | The fork: apply as a founder, or join the founding circle. |
| `navigator.html` | The Startup Support Navigator. Self contained, client side, stores nothing. |

`assets/` holds the logo files, two illustrations, the brand film and its poster, the
social share card, and the shared stylesheet and script.

## Editing

Text lives in each page as `data-en` and `data-ko` attributes on one element, so the
English and Korean versions sit next to each other and the language switch stays in sync.
English is the default. `assets/site.js` holds the switch and the pre filled email bodies
for the `data-form` buttons. `assets/site.css` holds every style on the four pages.

No build step, no server, no analytics, no cookies. The Navigator makes no network calls
and does not use an AI. The only outside request is Google Fonts.

## Hosting

GitHub Pages, branch `main`, folder `/` (root). The site is served at
https://nissimworks.github.io/hansu-project/

## Before publishing a change

Check that every page returns 200, that the navigation and the film work, and that no
text claims funding, sponsors, a February 2027 cohort, named partners or staff that do
not exist. The program today is one person, a founding circle with two open seats, and a
pilot before the first full cohort. No em dashes anywhere.
