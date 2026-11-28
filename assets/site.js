/* 한수 프로젝트 · Hansu Project
   One language switch for every page. English is the default; Korean is one press away.
   No tracking, no cookies, nothing sent anywhere. */
(function () {
  "use strict";
  var KEY = "hansu.lang";
  var MAIL_TO = "nissimworks@gmail.com";

  var FORMS = {
    senior: {
      en: {
        s: "Hansu Project · Founding circle",
        b: "Hello,\n\nI would like to talk about the founding circle of Hansu Project.\n\nName:\nWhat I ran (company or institution, role, years):\nTwo areas where I am strong:\nOne area where I am not:\nTwo times next week for a 20 minute call:\n\nThank you.\n"
      },
      ko: {
        s: "한수 프로젝트 · 창립 서클 문의",
        b: "안녕하십니까.\n\n한수 프로젝트 창립 서클에 대해 이야기하고 싶습니다.\n\n성함:\n운영하신 조직(회사 또는 기관, 직책, 기간):\n강점이 있는 두 분야:\n강점이 아닌 한 분야:\n다음 주 20분 통화가 가능한 시간 두 가지:\n\n감사합니다.\n"
      }
    },
    founder: {
      en: {
        s: "Hansu Project · Founder application",
        b: "Hello,\n\nI would like to apply to Hansu Project as a founder.\n\nName:\nCompany:\nWhat the company does, in one line:\nWho pays:\nHow long you have been running:\nThe next three decisions:\nTwo times next week for a 20 minute call:\n\nThank you.\n"
      },
      ko: {
        s: "한수 프로젝트 · 창업가 참여 신청",
        b: "안녕하십니까.\n\n한수 프로젝트에 창업가로 참여하고 싶습니다.\n\n성함:\n회사명:\n회사가 하는 일 한 줄:\n비용을 내는 고객:\n운영 기간:\n앞으로의 세 가지 결정:\n다음 주 20분 통화가 가능한 시간 두 가지:\n\n감사합니다.\n"
      }
    }
  };

  function mailto(kind, lang) {
    var f = FORMS[kind];
    if (!f) { return "mailto:" + MAIL_TO; }
    var t = f[lang] || f.en;
    return "mailto:" + MAIL_TO +
      "?subject=" + encodeURIComponent(t.s) +
      "&body=" + encodeURIComponent(t.b);
  }

  var buttons = document.querySelectorAll(".lang button");

  function apply(lang) {
    if (lang !== "ko") { lang = "en"; }
    document.documentElement.lang = lang;

    var nodes = document.querySelectorAll("[data-en][data-ko]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var t = el.getAttribute("data-" + lang);
      if (t === null) { continue; }
      if (el.hasAttribute("data-html")) {
        el.innerHTML = t;
      } else if (el.tagName === "META") {
        el.setAttribute("content", t);
      } else {
        el.textContent = t;
      }
    }

    var forms = document.querySelectorAll("[data-form]");
    for (var j = 0; j < forms.length; j++) {
      forms[j].setAttribute("href", mailto(forms[j].getAttribute("data-form"), lang));
    }

    for (var k = 0; k < buttons.length; k++) {
      var on = buttons[k].getAttribute("data-lang") === lang;
      buttons[k].className = on ? "on" : "";
      buttons[k].setAttribute("aria-pressed", on ? "true" : "false");
    }

    var title = document.documentElement.getAttribute("data-title-" + lang);
    if (title) { document.title = title; }

    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  function initial() {
    var fromUrl = null;
    try {
      var m = /[?&]lang=(en|ko)\b/.exec(window.location.search);
      if (m) { fromUrl = m[1]; }
    } catch (e) {}
    if (fromUrl) { return fromUrl; }
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === "ko" || saved === "en") { return saved; }
    } catch (e) {}
    return "en";
  }

  for (var b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener("click", function () {
      apply(this.getAttribute("data-lang"));
    });
  }

  apply(initial());

  var y = new Date().getFullYear();
  if (y > 2026) {
    var legal = document.querySelector(".legal .year");
    if (legal) { legal.textContent = String(y); }
  }
})();
