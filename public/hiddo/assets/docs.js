(function () {
  var root = document.documentElement;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // Theme: follows the system until the reader picks one
  var saved = store("hiddo-theme");
  if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  var themeBtn = document.getElementById("theme");
  function isDark() { var t = root.getAttribute("data-theme"); return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches; }
  function syncThemeLabel() { if (themeBtn) themeBtn.setAttribute("aria-label", isDark() ? "Iftiin · Light mode" : "Mugdi · Dark mode"); themeBtn && (themeBtn.dataset.mode = isDark() ? "dark" : "light"); }
  syncThemeLabel();
  if (themeBtn) themeBtn.addEventListener("click", function () { var next = isDark() ? "light" : "dark"; root.setAttribute("data-theme", next); store("hiddo-theme", next); syncThemeLabel(); });

  // Toast
  var toast = document.getElementById("toast"), tt;
  function say(msg) { toast.textContent = msg; toast.classList.add("show"); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove("show"); }, 1600); }
  function copy(text, msg) {
    var done = function () { say(msg); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    else { fallback(text); done(); }
  }
  function fallback(text) { var t = document.createElement("textarea"); t.value = text; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} t.remove(); }

  // Copy swatches and icons
  document.addEventListener("click", function (e) {
    var sw = e.target.closest("[data-copy]");
    if (sw) { copy(sw.getAttribute("data-copy"), "La koobiyeeyay · Copied " + (sw.getAttribute("data-label") || "")); return; }
    var ic = e.target.closest(".ic");
    if (ic) { var svg = ic.querySelector("template").innerHTML.trim(); copy(svg, "SVG-ga " + ic.dataset.name + " waa la koobiyeeyay"); return; }
    var cb = e.target.closest(".codebtn");
    if (cb) { var pre = document.getElementById(cb.getAttribute("aria-controls")); var open = cb.getAttribute("aria-expanded") === "true"; cb.setAttribute("aria-expanded", String(!open)); pre.hidden = open; cb.querySelector("span").textContent = open ? "Koodhka" : "Qari"; }
  });

  // Icon search
  var iq = document.getElementById("icon-q"), icons = Array.prototype.slice.call(document.querySelectorAll(".ic")), iempty = document.getElementById("icon-empty"), icount = document.getElementById("icon-count");
  if (iq) iq.addEventListener("input", function () {
    var q = iq.value.trim().toLowerCase(), n = 0;
    icons.forEach(function (b) { var hit = !q || b.dataset.k.indexOf(q) > -1; b.hidden = !hit; if (hit) n++; });
    iempty.hidden = n > 0; icount.textContent = n + " / " + icons.length;
  });

  // Glossary search
  var gq = document.getElementById("gl-q");
  if (gq) gq.addEventListener("input", function () {
    var q = gq.value.trim().toLowerCase(), any = false;
    document.querySelectorAll(".gl .grp").forEach(function (g) {
      var vis = 0;
      g.querySelectorAll("tr").forEach(function (r) { var hit = !q || r.textContent.toLowerCase().indexOf(q) > -1; r.hidden = !hit; if (hit) vis++; });
      g.hidden = vis === 0; if (vis) any = true;
    });
    document.getElementById("gl-empty").hidden = any;
  });

  // Active section in the nav
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id); }); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("section.block").forEach(function (s) { io.observe(s); });
  }
})();
