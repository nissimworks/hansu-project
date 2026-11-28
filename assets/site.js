/* 한수 프로젝트 · Hansu Project
   One language switch for every page. English is the default; Korean is one press away.
   The two application buttons open the reader's own mail app with the questions already
   written into the message. Nothing is sent anywhere. */
(function () {
  "use strict";
  var KEY = "hansu.lang";
  var MAIL_TO = "nissimworks@gmail.com";

  var FORMS = {
    founder: {
      s: "한수 프로젝트 · 창업가 신청 (Hansu Project founder application)",
      b: "한수 프로젝트 · 창업가 신청\n" +
         "Hansu Project · Founder application\n\n" +
         "[About you]\n" +
         "성함:\n" +
         "회사명:\n" +
         "업종 (한 단어로 충분합니다):\n" +
         "단계 (아이디어 / 초기 고객 / 성장):\n\n" +
         "[The company]\n" +
         "한 줄 소개: 무엇을 하고 있는지\n\n" +
         "[The decision]\n" +
         "지금 가장 막혀 있는 결정 하나:\n" +
         "어떤 문을 열고 싶은지 (예: 은행, 병원 구매팀, 제조사):\n\n" +
         "[Time]\n" +
         "이번 주에 가능한 통화 시간:\n\n" +
         "감사합니다.\n"
    },
    senior: {
      s: "한수 프로젝트 · 창립 서클 문의 (Hansu Project founding circle)",
      b: "한수 프로젝트 · 창립 서클 문의\n" +
         "Hansu Project · Founding circle\n\n" +
         "[About you]\n" +
         "성함:\n" +
         "마지막 직책과 업종:\n\n" +
         "[Experience]\n" +
         "가장 자신 있는 두 영역:\n" +
         "최근 5년 안에 실제로 내린 큰 결정 하나:\n\n" +
         "[Time and people]\n" +
         "한 달에 가능한 시간:\n" +
         "소개해 주실 수 있는 분 두 분 (한 분은 직접 이끄신 분):\n\n" +
         "감사합니다.\n"
    }
  };

  function mailto(kind) {
    var f = FORMS[kind];
    if (!f) { return "mailto:" + MAIL_TO; }
    return "mailto:" + MAIL_TO +
      "?subject=" + encodeURIComponent(f.s) +
      "&body=" + encodeURIComponent(f.b);
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
      forms[j].setAttribute("href", mailto(forms[j].getAttribute("data-form")));
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
