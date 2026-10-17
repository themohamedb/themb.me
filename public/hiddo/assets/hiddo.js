/* @ds-bundle: {"format": 4, "namespace": "Hiddo", "components": [{"name": "Button"}, {"name": "Field"}, {"name": "Input"}, {"name": "Select"}, {"name": "Textarea"}, {"name": "Checkbox"}, {"name": "RadioGroup"}, {"name": "Switch"}, {"name": "OTPInput"}, {"name": "SegmentedControl"}, {"name": "Chips"}, {"name": "NameField"}, {"name": "PhoneField"}, {"name": "Amount"}, {"name": "PayConfirm"}, {"name": "Receipt"}, {"name": "SendMoneyForm"}, {"name": "LanguageSwitch"}, {"name": "Banner"}, {"name": "Badge"}, {"name": "Tray"}, {"name": "RopeDivider"}, {"name": "BottomNav"}, {"name": "Tabs"}, {"name": "ListRow"}, {"name": "Dialog"}, {"name": "Sheet"}, {"name": "DatePicker"}, {"name": "QRPay"}, {"name": "Icon"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState;

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(" ");
  }
  function omit(obj, keys) {
    var r = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) r[k] = obj[k];
    return r;
  }
  var uid = 0;
  function useId(given) {
    var s = useState(function () { uid += 1; return given || "hd-" + uid; });
    return s[0];
  }

  /* Icons: stroke, 24 grid, currentColor. */
  function Icon(props) { return h(Ic, { name: props.name, size: props.size || 20, stroke: 2 }); }

  function Button(props) {
    var variant = props.variant || "primary";
    var rest = omit(props, ["variant", "block", "loading", "loadingLabel", "children", "className", "size"]);
    if (props.loading) { rest.disabled = true; rest["aria-busy"] = "true"; }
    return h("button", Object.assign({ type: "button" }, rest, {
      className: cx("hd-btn", "hd-btn-" + variant, props.size && "hd-btn-" + props.size, props.block && "hd-btn-block", props.className)
    }), props.loading ? [h("span", { key: "s", className: "hd-spin", "aria-hidden": "true" }), h("span", { key: "l" }, props.loadingLabel || props.children)] : props.children);
  }

  function Field(props) {
    var id = useId(props.id);
    var hintId = id + "-hint", errId = id + "-err";
    var rest = omit(props, ["id", "label", "sublabel", "hint", "error", "className"]);
    var describedBy = [props.hint ? hintId : null, props.error ? errId : null].filter(Boolean).join(" ") || undefined;
    return h("div", { className: cx("hd-field", props.className) },
      h("label", { className: "hd-label", htmlFor: id }, props.label, props.sublabel ? h("small", null, props.sublabel) : null),
      h("input", Object.assign({ id: id, className: "hd-input", "aria-invalid": props.error ? "true" : undefined, "aria-describedby": describedBy }, rest)),
      props.error ? h("div", { className: "hd-error", id: errId }, h(Icon, { name: "alert", size: 18 }), props.error)
        : props.hint ? h("div", { className: "hd-hint", id: hintId }, props.hint) : null);
  }

  /* Three-part Somali name. No first/last, no surname. */
  function NameField(props) {
    var initial = props.defaultValue || { own: "", father: "", grandfather: "", nickname: "" };
    var st = useState(initial);
    var value = props.value || st[0];
    function set(key) {
      return function (e) {
        var next = Object.assign({}, value); next[key] = e.target.value;
        if (!props.value) st[1](next);
        if (props.onChange) props.onChange(next);
      };
    }
    var full = [value.own, value.father, value.grandfather].filter(Boolean).join(" ");
    return h("fieldset", { className: "hd-name" },
      h("legend", null, props.legend || "Magacaaga oo dhamaystiran"),
      h(Field, { label: "Magacaaga", sublabel: "Your name", value: value.own, onChange: set("own"), autoComplete: "given-name", autoCapitalize: "words", required: true, error: props.errors && props.errors.own }),
      h(Field, { label: "Magaca aabbaha", sublabel: "Father's name", value: value.father, onChange: set("father"), autoCapitalize: "words", required: true, error: props.errors && props.errors.father }),
      h(Field, { label: "Magaca awoowaha", sublabel: "Grandfather's name", value: value.grandfather, onChange: set("grandfather"), autoCapitalize: "words", required: true, error: props.errors && props.errors.grandfather }),
      props.showNickname === false ? null : h(Field, { label: "Naanays", sublabel: "Nickname, optional", value: value.nickname, onChange: set("nickname"), hint: "Magaca lagugu yaqaan." }),
      full ? h("div", { className: "hd-preview", "aria-live": "polite" }, "Sidan ayuu u muuqan doonaa: ", h("b", null, full)) : null);
  }

  var CODES = ["+252", "+254", "+251", "+253", "+1", "+44", "+46", "+31", "+971"];
  function PhoneField(props) {
    var id = useId(props.id);
    var cs = useState(props.defaultCode || "+252");
    var code = props.code || cs[0];
    var rest = omit(props, ["id", "label", "sublabel", "hint", "error", "code", "defaultCode", "onCodeChange"]);
    return h("div", { className: "hd-field" },
      h("label", { className: "hd-label", htmlFor: id }, props.label || "Lambarka telefoonka", h("small", null, props.sublabel || "Phone number")),
      h("div", { className: "hd-phone" },
        h("select", { className: "hd-input", "aria-label": "Dalka", value: code, onChange: function (e) { if (!props.code) cs[1](e.target.value); if (props.onCodeChange) props.onCodeChange(e.target.value); } },
          CODES.map(function (c) { return h("option", { key: c, value: c }, c); })),
        h("input", Object.assign({ id: id, className: "hd-input", type: "tel", inputMode: "tel", autoComplete: "tel-national", placeholder: "61 000 0000", "aria-invalid": props.error ? "true" : undefined }, rest))),
      props.error ? h("div", { className: "hd-error" }, h(Icon, { name: "alert", size: 18 }), props.error)
        : props.hint ? h("div", { className: "hd-hint" }, props.hint) : null);
  }

  /* USD default (how Somali wallets price), SOS secondary. */
  function formatAmount(value, currency) {
    var n = Number(value) || 0;
    if (currency === "SOS") return { cur: "SOS", num: Math.round(n).toLocaleString("en-US") };
    return { cur: "$", num: n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) };
  }
  function Amount(props) {
    var f = formatAmount(props.value, props.currency || "USD");
    return h("span", { className: cx("hd-amount", "hd-amount-" + (props.size || "md"), props.className) },
      h("span", { className: "hd-cur" }, f.cur), f.num);
  }

  /* Money waits for confirmed success: no optimistic UI. */
  function PayConfirm(props) {
    var currency = props.currency || "USD";
    var fee = props.fee || 0;
    var total = (Number(props.amount) || 0) + fee;
    var status = props.status || "idle";
    var initials = (props.recipient || "").split(" ").slice(0, 2).map(function (w) { return w.charAt(0); }).join("");
    var totalText = formatAmount(total, currency);
    var totalLabel = (totalText.cur === "$" ? "$" : "SOS ") + totalText.num;
    return h("section", { className: "hd-pay", "aria-labelledby": "hd-pay-title" },
      h("h3", { id: "hd-pay-title" }, props.title || "Hubi ka hor intaadan dirin"),
      h("div", { className: "hd-who" },
        h("div", { className: "hd-avatar", "aria-hidden": "true" }, initials),
        h("div", null,
          h("div", { className: "hd-who-name" }, props.recipient),
          h("div", { className: "hd-who-sub" }, props.phone))),
      h("dl", { className: "hd-lines" },
        h("dt", null, "Lacagta"), h("dd", null, h(Amount, { value: props.amount, currency: currency, size: "sm" })),
        h("dt", null, "Khidmadda"), h("dd", null, fee ? h(Amount, { value: fee, currency: currency, size: "sm" }) : "Bilaash"),
        h("dt", null, "Laga bixinayo"), h("dd", null, props.wallet || "EVC Plus"),
        h("dt", { className: "hd-total" }, "Wadarta"), h("dd", { className: "hd-total" }, h(Amount, { value: total, currency: currency, size: "md" }))),
      status === "sent"
        ? h("div", { className: "hd-status hd-status-ok", role: "status" }, h(Icon, { name: "check" }), "Waa la diray — " + props.recipient)
        : h(Button, { block: true, loading: status === "sending", loadingLabel: "Waa la dirayaa…", onClick: props.onConfirm }, "Dir " + totalLabel),
      status === "error" ? h(Banner, { tone: "error", title: "Lacagta lama dirin" }, "Wax lacag ah lagaama jarin. Hubi xiriirka internetka oo isku day mar kale.") : null);
  }

  var LANGS = [{ code: "so", label: "Soomaali" }, { code: "en", label: "English" }, { code: "ar", label: "العربية" }];
  function LanguageSwitch(props) {
    var st = useState(props.defaultValue || "so");
    var value = props.value || st[0];
    var langs = props.languages || LANGS;
    return h("div", { className: "hd-lang", role: "group", "aria-label": props.label || "Luqadda / Language" },
      langs.map(function (l) {
        return h("button", { key: l.code, type: "button", lang: l.code, "aria-pressed": value === l.code ? "true" : "false",
          onClick: function () { if (!props.value) st[1](l.code); if (props.onChange) props.onChange(l.code); } }, l.label);
      }));
  }

  function Banner(props) {
    var tone = props.tone || "info";
    var icon = tone === "success" ? "check" : tone === "warning" ? "signal" : tone === "error" ? "alert" : "info";
    return h("div", { className: cx("hd-banner", "hd-banner-" + tone), role: tone === "error" ? "alert" : "status" },
      h(Icon, { name: icon }),
      h("div", null,
        props.title ? h("div", { className: "hd-banner-title" }, props.title) : null,
        props.children ? h("div", { className: "hd-banner-body" }, props.children) : null));
  }

  function Badge(props) {
    return h("span", { className: cx("hd-badge", props.tone && props.tone !== "neutral" && "hd-badge-" + props.tone) }, props.children);
  }

  /* The barkin's interlaced rope, as a divider. Decorative. */
  function RopeDivider(props) {
    var a = "M0 8 C10 0 20 0 30 8 S50 16 60 8 S80 0 90 8 S110 16 120 8";
    var b = "M0 8 C10 16 20 16 30 8 S50 0 60 8 S80 16 90 8 S110 0 120 8";
    return h("svg", { className: cx("hd-rope", props.accent && "hd-rope-accent"), viewBox: "0 0 120 16", preserveAspectRatio: "none", "aria-hidden": "true" },
      h("path", { d: a, fill: "none", stroke: "currentColor", strokeWidth: 1.5, vectorEffect: "non-scaling-stroke" }),
      h("path", { d: b, fill: "none", stroke: "currentColor", strokeWidth: 1.5, vectorEffect: "non-scaling-stroke", opacity: 0.55 }));
  }

  /* ---------- Phase 2: navigation, lists, overlays, dates, QR ---------- */

  var NAV_ICONS = {
    home: ["M3 10.5 12 3l9 7.5", "M5 9.5V21h14V9.5", "M10 21v-6h4v6"],
    activity: ["M4 6h16", "M4 12h16", "M4 18h10"],
    qr: ["M4 4h6v6H4z", "M14 4h6v6h-6z", "M4 14h6v6H4z", "M14 14h2v2h-2z", "M18 14h2", "M14 18h2v2", "M18 18h2v2h-2"],
    user: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4 21c0-4 3.6-6 8-6s8 2 8 6"],
    wallet: ["M4 7h15a1 1 0 0 1 1 1v11H5a1 1 0 0 1-1-1V7z", "M4 7l11-3v3", "M16 13h2"]
  };
  function NavIcon(props) {
    var d = NAV_ICONS[props.name] || [];
    return h("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: props.active ? 2.25 : 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
      d.map(function (p, i) { return h("path", { key: i, d: p }); }));
  }

  var DEFAULT_NAV = [
    { key: "home", label: "Bogga hore", icon: "home" },
    { key: "activity", label: "Dhaqdhaqaaqa", icon: "activity" },
    { key: "pay", label: "Bixi", icon: "qr" },
    { key: "account", label: "Akoonka", icon: "user" }
  ];
  /* 3–5 destinations, labels always visible, active = bolder stroke + label + indicator. */
  function BottomNav(props) {
    var items = props.items || DEFAULT_NAV;
    var st = useState(props.defaultValue || items[0].key);
    var value = props.value || st[0];
    return h("nav", { className: "hd-bnav", "aria-label": props.label || "Bogagga" },
      items.map(function (it) {
        var active = it.key === value;
        return h("button", { key: it.key, type: "button", className: cx("hd-bnav-item", active && "is-active"), "aria-current": active ? "page" : undefined,
          onClick: function () { if (!props.value) st[1](it.key); if (props.onChange) props.onChange(it.key); } },
          h("span", { className: "hd-bnav-pill" }, h(NavIcon, { name: it.icon, active: active })),
          h("span", { className: "hd-bnav-label" }, it.label),
          it.badge ? h("span", { className: "hd-bnav-dot", "aria-label": it.badge + " cusub" }) : null);
      }));
  }

  function Tabs(props) {
    var tabs = props.tabs || [];
    var st = useState(props.defaultValue || (tabs[0] && tabs[0].key));
    var value = props.value || st[0];
    function pick(k) { if (!props.value) st[1](k); if (props.onChange) props.onChange(k); }
    function onKey(e) {
      var i = tabs.findIndex(function (t) { return t.key === value; });
      if (e.key === "ArrowRight") pick(tabs[(i + 1) % tabs.length].key);
      if (e.key === "ArrowLeft") pick(tabs[(i - 1 + tabs.length) % tabs.length].key);
    }
    return h("div", { className: "hd-tabs", role: "tablist", "aria-label": props.label, onKeyDown: onKey },
      tabs.map(function (t) {
        var on = t.key === value;
        return h("button", { key: t.key, type: "button", role: "tab", "aria-selected": on ? "true" : "false", tabIndex: on ? 0 : -1,
          className: cx("hd-tab", on && "is-active"), onClick: function () { pick(t.key); } },
          t.label, t.count != null ? h("span", { className: "hd-tab-count" }, t.count) : null);
      }));
  }

  /* Whole row is the tap target. Leading initials or icon, title + subtitle, trailing meta/amount. */
  function ListRow(props) {
    var Tag = props.onClick || props.href ? (props.href ? "a" : "button") : "div";
    var initials = props.initials || (props.title || "").split(" ").slice(0, 2).map(function (w) { return w.charAt(0); }).join("");
    var amt = props.amount != null ? h("span", { className: cx("hd-row-amount", props.amount > 0 && "is-in") },
      (props.amount > 0 ? "+" : "−") + (props.currency === "SOS" ? "SOS " : "$") + formatAmount(Math.abs(props.amount), props.currency).num) : null;
    return h(Tag, { className: "hd-listrow", type: Tag === "button" ? "button" : undefined, href: props.href, onClick: props.onClick },
      props.leading === false ? null : h("span", { className: "hd-avatar", "aria-hidden": "true" }, initials),
      h("span", { className: "hd-listrow-main" },
        h("span", { className: "hd-listrow-title" }, props.title),
        props.subtitle ? h("span", { className: "hd-listrow-sub" }, props.subtitle) : null),
      h("span", { className: "hd-listrow-end" }, amt, props.meta ? h("span", { className: "hd-listrow-meta" }, props.meta) : null, props.badge || null));
  }

  /* Confirmation dialog: title = verb + object, body = consequence, buttons name outcomes. */
  function Dialog(props) {
    if (!props.open) return null;
    var card = h("div", { className: "hd-dialog", role: "alertdialog", "aria-modal": props.inline ? undefined : "true", "aria-labelledby": "hd-dlg-t", "aria-describedby": "hd-dlg-b" },
      h("h2", { id: "hd-dlg-t", className: "hd-dialog-title" }, props.title),
      props.body ? h("p", { id: "hd-dlg-b", className: "hd-dialog-body" }, props.body) : null,
      h("div", { className: "hd-dialog-actions" },
        h(Button, { variant: "secondary", onClick: props.onCancel }, props.cancelLabel || "Ka noqo"),
        h(Button, { variant: props.tone === "danger" ? "danger" : "primary", onClick: props.onConfirm }, props.confirmLabel)));
    return props.inline ? h("div", { className: "hd-scrim is-inline" }, card) : h("div", { className: "hd-scrim", onClick: function (e) { if (e.target === e.currentTarget && props.onCancel) props.onCancel(); } }, card);
  }

  /* Bottom sheet for choices made in context. Reach: everything in the thumb zone. */
  function Sheet(props) {
    if (props.open === false) return null;
    return h("div", { className: cx("hd-sheet-wrap", props.inline && "is-inline") },
      h("section", { className: "hd-sheet", role: "dialog", "aria-label": props.title },
        h("div", { className: "hd-sheet-handle", "aria-hidden": "true" }),
        props.title ? h("h2", { className: "hd-sheet-title" }, props.title) : null,
        h("div", { className: "hd-sheet-body" }, props.children)));
  }

  /* Calendar with Gregorian (Somali names) + Hijri (Umm al-Qura, Arabic script). Week starts Sabti. */
  var SO_MONTHS = ["Janaayo", "Febraayo", "Maarso", "Abriil", "Maajo", "Juun", "Luulyo", "Agoosto", "Sebtembar", "Oktoobar", "Nofembar", "Disembar"];
  var SO_DAYS = ["Axad", "Isniin", "Talaado", "Arbaco", "Khamiis", "Jimce", "Sabti"];
  var SO_DAYS_SHORT = ["Ax", "Is", "Ta", "Ar", "Kh", "Ji", "Sa"];
  var HIJRI_DAY = null, HIJRI_FULL = null, HIJRI_MONTH = null;
  try {
    HIJRI_DAY = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { day: "numeric", timeZone: "UTC" });
    HIJRI_FULL = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    HIJRI_MONTH = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", { month: "long", year: "numeric", timeZone: "UTC" });
  } catch (e) { HIJRI_DAY = null; }
  function utc(y, m, d) { return new Date(Date.UTC(y, m, d)); }
  function hijriDay(dt) { return HIJRI_DAY ? HIJRI_DAY.format(dt) : ""; }
  function hijriFull(dt) { return HIJRI_FULL ? HIJRI_FULL.format(dt) : ""; }
  function formatSomaliDate(dt) { return SO_DAYS[dt.getUTCDay()] + ", " + dt.getUTCDate() + " " + SO_MONTHS[dt.getUTCMonth()] + " " + dt.getUTCFullYear(); }

  function DatePicker(props) {
    var now = new Date(); var today = utc(now.getFullYear(), now.getMonth(), now.getDate());
    var sel = useState(props.defaultValue || today); var value = props.value || sel[0];
    var view = useState({ y: value.getUTCFullYear(), m: value.getUTCMonth() }); var v = view[0];
    var showHijri = props.showHijri !== false;
    function choose(dt) { if (!props.value) sel[1](dt); if (props.onChange) props.onChange(dt); }
    function shift(n) { var m = v.m + n, y = v.y; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } view[1]({ y: y, m: m }); }
    var first = utc(v.y, v.m, 1);
    var lead = (first.getUTCDay() + 1) % 7; /* Sabti first */
    var days = new Date(Date.UTC(v.y, v.m + 1, 0)).getUTCDate();
    var cells = [];
    for (var i = 0; i < lead; i++) cells.push(null);
    for (var d = 1; d <= days; d++) cells.push(utc(v.y, v.m, d));
    var order = [6, 0, 1, 2, 3, 4, 5];
    var hFirst = HIJRI_MONTH ? HIJRI_MONTH.format(first) : "", hLast = HIJRI_MONTH ? HIJRI_MONTH.format(utc(v.y, v.m, days)) : "";
    var hRange = hFirst === hLast ? hFirst : hFirst.replace(/\s*هـ$/, "") + " – " + hLast;
    return h("div", { className: "hd-date" },
      h("div", { className: "hd-date-head" },
        h("button", { type: "button", className: "hd-icon-btn", "aria-label": "Bishii hore", onClick: function () { shift(-1); } }, "‹"),
        h("div", { className: "hd-date-title" },
          h("div", { className: "hd-date-month" }, SO_MONTHS[v.m] + " " + v.y),
          showHijri && hFirst ? h("div", { className: "hd-date-hijri", lang: "ar", dir: "rtl" }, hRange) : null),
        h("button", { type: "button", className: "hd-icon-btn", "aria-label": "Bisha xigta", onClick: function () { shift(1); } }, "›")),
      h("div", { className: "hd-date-grid", role: "grid" },
        order.map(function (i) { return h("div", { key: "h" + i, className: cx("hd-date-dow", i === 5 && "is-jimce"), role: "columnheader", title: SO_DAYS[i] }, SO_DAYS_SHORT[i]); }),
        cells.map(function (dt, i) {
          if (!dt) return h("div", { key: "e" + i });
          var isSel = dt.getTime() === value.getTime(), isToday = dt.getTime() === today.getTime();
          return h("button", { key: i, type: "button", role: "gridcell", "aria-selected": isSel ? "true" : "false", "aria-label": formatSomaliDate(dt),
            className: cx("hd-date-cell", isSel && "is-sel", isToday && "is-today", dt.getUTCDay() === 5 && "is-jimce"), onClick: function () { choose(dt); } },
            h("span", { className: "hd-date-g" }, dt.getUTCDate()),
            showHijri ? h("span", { className: "hd-date-h" }, hijriDay(dt)) : null);
        })),
      h("div", { className: "hd-date-foot" },
        h("div", null,
          h("div", { className: "hd-date-sel" }, formatSomaliDate(value)),
          showHijri ? h("div", { className: "hd-date-sel-h", lang: "ar", dir: "rtl" }, hijriFull(value)) : null),
        h(Button, { variant: "quiet", onClick: function () { view[1]({ y: today.getUTCFullYear(), m: today.getUTCMonth() }); choose(today); } }, "Maanta")));
  }

  /* QR pay. The payload comes from the payment provider or SOMQR — Hiddo never invents the format. */
  function QRCode(props) {
    if (!window.qrcode) return h("div", { className: "hd-qr-missing" }, "QR");
    var q = window.qrcode(0, "M"); q.addData(props.value || ""); q.make();
    var n = q.getModuleCount(), cell = 1, rects = [];
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (q.isDark(r, c)) rects.push("M" + c + " " + r + "h1v1h-1z");
    return h("svg", { className: "hd-qr-code", viewBox: "-4 -4 " + (n + 8) + " " + (n + 8), role: "img", "aria-label": props.label || "Koodhka QR", shapeRendering: "crispEdges" },
      h("rect", { x: -4, y: -4, width: n + 8, height: n + 8, className: "hd-qr-bg" }),
      h("path", { d: rects.join(""), className: "hd-qr-ink" }));
  }
  function QRPay(props) {
    var mode = props.mode || "show";
    if (mode === "scan") {
      return h("section", { className: "hd-qr" },
        h("div", { className: "hd-qr-view", "aria-hidden": "true" }, h("span", { className: "hd-qr-corner tl" }), h("span", { className: "hd-qr-corner tr" }), h("span", { className: "hd-qr-corner bl" }), h("span", { className: "hd-qr-corner br" })),
        h("div", { className: "hd-qr-text" }, props.hint || "Koodhka QR dhig sanduuqa dhexdiisa."),
        h(Button, { block: true, onClick: props.onScan }, "Akhri koodhka QR"));
    }
    return h("section", { className: "hd-qr" },
      h("div", { className: "hd-qr-frame" }, h(QRCode, { value: props.payload, label: "Koodhkaaga QR" })),
      h("div", { className: "hd-qr-name" }, props.name),
      props.phone ? h("div", { className: "hd-who-sub" }, props.phone) : null,
      props.amount != null ? h(Amount, { value: props.amount, currency: props.currency, size: "lg" }) : null,
      h("div", { className: "hd-qr-text" }, props.hint || "Qofka lacagta kuu soo diraya ha akhriyo koodhkan."));
  }


  /* ---------- Craft v2: icons, form controls, tray, receipt ---------- */

  /* Hiddo icons: 24 grid, 1.5 stroke, round caps. Original drawings; Somali objects included. */
  var ICONS = {"home": "<path d='M4 10.4 12 4l8 6.4V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z'/><path d='M10 20v-3.5a2 2 0 0 1 4 0V20'/>", "search": "<circle cx='11' cy='11' r='6.25'/><path d='m15.6 15.6 4.4 4.4'/>", "send": "<path d='M7 17 17 7'/><path d='M9.5 7H17v7.5'/>", "receive": "<path d='M17 7 7 17'/><path d='M14.5 17H7V9.5'/>", "wallet": "<path d='M4 8.5h15a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z'/><path d='M4 8.5 15.5 5v3.5'/><path d='m16.5 12.6 1.15 1.15-1.15 1.15-1.15-1.15z'/>", "qr": "<rect x='4' y='4' width='6' height='6' rx='1'/><rect x='14' y='4' width='6' height='6' rx='1'/><rect x='4' y='14' width='6' height='6' rx='1'/><path d='M14 14h2.5v2.5H14z M18.5 14H20 M14 18.5V20h2 M18.5 18.5H20V20'/>", "scan": "<path d='M4 8.5V5.5A1.5 1.5 0 0 1 5.5 4h3'/><path d='M15.5 4h3A1.5 1.5 0 0 1 20 5.5v3'/><path d='M20 15.5v3a1.5 1.5 0 0 1-1.5 1.5h-3'/><path d='M8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3'/><path d='M7 12h10'/>", "user": "<circle cx='12' cy='8.5' r='3.75'/><path d='M5 20c.6-3.6 3.4-5.5 7-5.5s6.4 1.9 7 5.5'/>", "settings": "<path d='M4 7.5h9 M17.5 7.5H20'/><circle cx='15.25' cy='7.5' r='2.25'/><path d='M4 16.5h2.5 M11 16.5h9'/><circle cx='8.75' cy='16.5' r='2.25'/>", "bell": "<path d='M6.5 15.5V11a5.5 5.5 0 0 1 11 0v4.5l1.5 2.5H5z'/><path d='M10 20.5a2.1 2.1 0 0 0 4 0'/>", "calendar": "<rect x='4' y='5.5' width='16' height='14.5' rx='2'/><path d='M4 10h16 M8.5 3.5v3.5 M15.5 3.5v3.5'/>", "calendar-hijri": "<rect x='4' y='5.5' width='16' height='14.5' rx='2'/><path d='M4 10h16 M8.5 3.5v3.5 M15.5 3.5v3.5'/><path d='M13.6 12.6a2.9 2.9 0 1 0 0 4.8 2.4 2.4 0 1 1 0-4.8z'/>", "clock": "<circle cx='12' cy='12' r='8'/><path d='M12 7.5V12l3 2'/>", "history": "<path d='M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 8.9'/><path d='M4.5 5v3.9h3.9'/><path d='M12 8.5V12l2.5 1.5'/>", "phone": "<rect x='7' y='3' width='10' height='18' rx='2.5'/><path d='M10.5 18h3'/>", "lock": "<rect x='5' y='10.5' width='14' height='9.5' rx='2'/><path d='M8 10.5V8a4 4 0 0 1 8 0v2.5'/><path d='m12 13.6 1.1 1.1-1.1 1.1-1.1-1.1z'/>", "eye": "<path d='M3 12s3.3-6 9-6 9 6 9 6-3.3 6-9 6-9-6-9-6z'/><circle cx='12' cy='12' r='2.75'/>", "check": "<path d='m5 12.5 4.5 4.5L19 7.5'/>", "x": "<path d='M6.5 6.5l11 11 M17.5 6.5l-11 11'/>", "plus": "<path d='M12 5v14 M5 12h14'/>", "minus": "<path d='M5 12h14'/>", "arrow-left": "<path d='M19 12H5 M11 6l-6 6 6 6'/>", "arrow-right": "<path d='M5 12h14 M13 6l6 6-6 6'/>", "chevron-down": "<path d='m6.5 9.5 5.5 5.5 5.5-5.5'/>", "chevron-right": "<path d='m9.5 6.5 5.5 5.5-5.5 5.5'/>", "chevron-left": "<path d='m14.5 6.5-5.5 5.5 5.5 5.5'/>", "copy": "<rect x='8.5' y='8.5' width='11.5' height='11.5' rx='2'/><path d='M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5'/>", "share": "<path d='M12 14.5V4 M8 7.5 12 3.5l4 4'/><path d='M7 10.5H6a2 2 0 0 0-2 2V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5.5a2 2 0 0 0-2-2h-1'/>", "download": "<path d='M12 4v10.5 M8 10.5l4 4 4-4'/><path d='M4.5 16v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2'/>", "info": "<circle cx='12' cy='12' r='8'/><path d='M12 11v5'/><circle class='f' cx='12' cy='8' r='0.9'/>", "alert": "<circle cx='12' cy='12' r='8'/><path d='M12 7.5V13'/><circle class='f' cx='12' cy='16' r='0.9'/>", "signal": "<path d='M5 19.5v-2.5 M9.67 19.5v-5.5 M14.33 19.5v-8.5 M19 19.5V5.5'/>", "globe": "<circle cx='12' cy='12' r='8'/><path d='M4 12h16'/><path d='M12 4c2.2 2.2 3.3 4.9 3.3 8s-1.1 5.8-3.3 8c-2.2-2.2-3.3-4.9-3.3-8S9.8 6.2 12 4z'/>", "mic": "<rect x='9' y='3.5' width='6' height='11' rx='3'/><path d='M5.5 11.5a6.5 6.5 0 0 0 13 0 M12 18v2.5'/>", "play": "<path d='M8 5.5v13a.8.8 0 0 0 1.2.7l10.3-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5z'/>", "volume": "<path d='M4.5 9.5h3l4.5-4v13l-4.5-4h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5z'/><path d='M15.5 9a4.2 4.2 0 0 1 0 6 M18 6.5a7.8 7.8 0 0 1 0 11'/>", "edit": "<path d='M14.5 5.5 18.5 9.5'/><path d='M5 19l1-4.5L16 4.5a1.4 1.4 0 0 1 2 0l1.5 1.5a1.4 1.4 0 0 1 0 2L9.5 18z'/>", "trash": "<path d='M4.5 7h15 M9.5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2'/><path d='M6.5 7l.9 11.6a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4L17.5 7'/>", "refresh": "<path d='M19.5 12a7.5 7.5 0 0 1-13.4 4.6 M4.5 12a7.5 7.5 0 0 1 13.4-4.6'/><path d='M18 3.8v3.9h-3.9 M6 20.2v-3.9h3.9'/>", "card": "<rect x='3.5' y='6' width='17' height='12' rx='2'/><path d='M3.5 10h17 M7 14.5h3'/>", "shield": "<path d='M12 3.5 19 6v5.5c0 4.2-2.9 7.3-7 9-4.1-1.7-7-4.8-7-9V6z'/><path d='m9 12 2 2 4-4'/>", "filter": "<path d='M4 6h16 M7 12h10 M10 18h4'/>", "external": "<path d='M13.5 4H20v6.5 M20 4l-8 8'/><path d='M17 14.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3.5'/>", "mobile-wallet": "<rect x='6.5' y='2.75' width='11' height='18.5' rx='2.5'/><path d='M10.5 18.25h3'/><circle cx='12' cy='10' r='3.25'/><path d='M12 8.6v2.8'/>", "remittance": "<path d='M3.5 11.5 12 4.5l5 4.1'/><path d='M5.5 10v9.5h13v-6'/><path d='M10 19.5v-4.5h4v4.5'/><path d='M21 3.5l-5 5 M16.5 4.25V8.5h4.25' />", "livestock": "<path d='M3.5 15c0-2.1 1.1-3.6 2.6-3.6 1.3 0 1.6-3.6 3.6-3.6s2.3 3.6 3.6 3.6 1.7-2.6 3.1-2.6c1.6 0 2.6 1.3 2.6 3.1V15z'/><path d='M19 11.9V8.6c0-1 .7-1.6 1.5-1.6h.9'/><path d='M6.6 15l-.5 5 M8.8 15l.4 5 M15.4 15l-.4 5 M17.6 15l.5 5'/>", "qibla": "<circle cx='12' cy='12' r='8.25'/><path d='M12 3.75v1.5 M12 18.75v1.5 M3.75 12h1.5 M18.75 12h1.5'/><rect x='9.6' y='9.6' width='4.8' height='4.8' rx='.5'/><path d='M9.6 11.2h4.8'/>", "shaah": "<path d='M7 9h10l-1.15 11.1a1 1 0 0 1-1 .9h-5.7a1 1 0 0 1-1-.9z'/><path d='M7.6 14.5h8.8'/><path d='M10 3c-1 1 1 2 0 3.5 M14 3c-1 1 1 2 0 3.5'/>", "barkin": "<path d='M3.5 5.5c3 3 14 3 17 0'/><path d='M7 8.3c3 1 7 1 10 0'/><path d='M12 9.2V17'/><path d='m10.4 11.4 3.2 2.2 M13.6 11.4l-3.2 2.2'/><path d='M7.5 20.5c.6-2.2 2.3-3.5 4.5-3.5s3.9 1.3 4.5 3.5z'/>", "dhiil": "<path d='M9 3h6'/><path d='M10 3v3L7 9c-1 1-1.5 2.5-1.5 4v6a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-6c0-1.5-.5-3-1.5-4l-3-3V3'/><path d='M5.5 13h13 M5.5 16.5h13'/>", "aqal": "<path d='M3 20h18'/><path d='M4.5 20C4.5 12 8 7 12 7s7.5 5 7.5 13'/><path d='M10 20v-5a2 2 0 0 1 4 0v5'/><path d='M6.5 12c3 1.2 8 1.2 11 0'/>", "dabqaad": "<path d='M5.5 10.5h13l-2 3.5h-9z'/><path d='M8.5 14 11 16.5h2l2.5-2.5'/><path d='M11 16.5 8 21h8l-3-4.5'/><path d='M10.5 7.5c-.9-1 .9-2 0-3.2 M13.5 7.5c-.9-1 .9-2 0-3.2'/>", "dhow": "<path d='M3 15.5h18l-2.6 3.3a1.5 1.5 0 0 1-1.2.7H6.8a1.5 1.5 0 0 1-1.2-.7z'/><path d='M12 15.5V3.5'/><path d='M12 4.5c3.8 1.8 6.3 5.5 6.8 9.5H12'/>", "qudhac": "<path d='M3 9.5c1.6-1.9 4.1-2.3 5.6-1.3 1.2-1.6 5.6-1.6 6.8 0 1.5-1 4-.6 5.6 1.3z'/><path d='M5.5 6.5c1.5-1.4 3.5-1.8 5-1 1-.9 2.5-.9 3.5-.4 1.5-.6 3.4-.2 4.5 1.4'/><path d='M12 9.5v11 M12 14.5 8.5 9.5 M12 13l3.5-3.5'/><path d='M8.5 20.5h7'/>", "door": "<path d='M5.5 21V10a6.5 6.5 0 0 1 13 0v11'/><path d='M12 4.5V21'/><path d='M3.5 21h17'/><path d='m8.6 12 .9.9-.9.9-.9-.9z M15.4 12l.9.9-.9.9-.9-.9z'/>", "tasbih": "<circle cx='12' cy='4.5' r='1.5'/><circle cx='7.2' cy='6.5' r='1.5'/><circle cx='16.8' cy='6.5' r='1.5'/><circle cx='5.2' cy='11.2' r='1.5'/><circle cx='18.8' cy='11.2' r='1.5'/><circle cx='7.2' cy='15.9' r='1.5'/><circle cx='16.8' cy='15.9' r='1.5'/><path d='M12 17.5v4 M10.5 21.5h3'/>"};
  var SOMALI_ICONS = ["mobile-wallet", "remittance", "livestock", "qibla", "shaah", "barkin", "dhiil", "aqal", "dabqaad", "dhow", "qudhac", "door", "tasbih", "calendar-hijri"];
  function Ic(props) {
    var body = ICONS[props.name];
    if (!body) return null;
    var s = props.size || 20;
    return h("svg", { className: cx("hd-ic", props.className), width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: props.stroke || 1.5, strokeLinecap: "round", strokeLinejoin: "round",
      "aria-hidden": props.label ? undefined : "true", role: props.label ? "img" : undefined, "aria-label": props.label,
      dangerouslySetInnerHTML: { __html: body.replace(/class='f'/g, "fill='currentColor' stroke='none'") } });
  }

  function labelRow(id, label, sublabel, optional) {
    return h("div", { className: "hd-labelrow" },
      h("label", { className: "hd-label", htmlFor: id }, label, sublabel ? h("small", null, sublabel) : null),
      optional ? h("span", { className: "hd-opt" }, "Ikhtiyaari") : null);
  }
  function message(props, id) {
    return props.error ? h("div", { className: "hd-error", id: id + "-err" }, h(Ic, { name: "alert", size: 18 }), props.error)
      : props.hint ? h("div", { className: "hd-hint", id: id + "-hint" }, props.hint) : null;
  }

  /* Input with a leading icon or prefix and a trailing addon (currency, shortcut). */
  function Input(props) {
    var id = useId(props.id);
    var rest = omit(props, ["id", "label", "sublabel", "hint", "error", "icon", "prefix", "addon", "optional", "numeric"]);
    return h("div", { className: "hd-field" },
      props.label ? labelRow(id, props.label, props.sublabel, props.optional) : null,
      h("div", { className: "hd-control" },
        props.icon ? h(Ic, { name: props.icon, size: 20 }) : null,
        props.prefix ? h("span", { className: "hd-prefix" }, props.prefix) : null,
        h("input", Object.assign({ id: id, className: props.numeric ? "is-num" : undefined, inputMode: props.numeric ? "decimal" : undefined, "aria-invalid": props.error ? "true" : undefined }, rest)),
        props.addon ? h("span", { className: "hd-addon" }, props.addon) : null),
      message(props, id));
  }

  function Select(props) {
    var id = useId(props.id);
    var rest = omit(props, ["id", "label", "sublabel", "hint", "error", "options", "optional"]);
    return h("div", { className: "hd-field" },
      props.label ? labelRow(id, props.label, props.sublabel, props.optional) : null,
      h("div", { className: "hd-selectwrap" },
        h("select", Object.assign({ id: id, className: "hd-select" }, rest),
          (props.options || []).map(function (o) { return h("option", { key: o.value, value: o.value }, o.label); })),
        h(Ic, { name: "chevron-down", size: 18 })),
      message(props, id));
  }

  function Textarea(props) {
    var id = useId(props.id);
    var st = useState(props.defaultValue || "");
    var rest = omit(props, ["id", "label", "sublabel", "hint", "error", "optional", "max"]);
    var len = (props.value != null ? props.value : st[0]).length;
    return h("div", { className: "hd-field" },
      props.label ? labelRow(id, props.label, props.sublabel, props.optional) : null,
      h("textarea", Object.assign({ id: id, className: "hd-textarea", maxLength: props.max, onInput: function (e) { st[1](e.target.value); } }, rest)),
      props.max ? h("div", { className: "hd-count" }, len + " / " + props.max) : message(props, id));
  }

  function Checkbox(props) {
    return h("label", { className: "hd-check" },
      h("input", Object.assign({ type: "checkbox" }, omit(props, ["label", "description"]))),
      h("span", { className: "hd-box" }, h(Ic, { name: "check", size: 14, stroke: 2.25 })),
      h("span", null, props.label, props.description ? h("span", { className: "hd-check-desc" }, props.description) : null));
  }

  /* Radio cards. The checked mark is a lattice diamond, not a dot. */
  function RadioGroup(props) {
    var name = useId(props.name);
    var st = useState(props.defaultValue || (props.options && props.options[0] && props.options[0].value));
    var value = props.value || st[0];
    return h("fieldset", { className: "hd-radiogroup" },
      props.legend ? h("legend", null, props.legend) : null,
      (props.options || []).map(function (o) {
        return h("label", { key: o.value, className: "hd-radio" },
          h("input", { type: "radio", name: name, value: o.value, checked: value === o.value, onChange: function () { if (!props.value) st[1](o.value); if (props.onChange) props.onChange(o.value); } }),
          h("span", { className: "hd-dot" }),
          h("span", { className: "hd-radio-main" }, h("span", { className: "hd-radio-title" }, o.label), o.description ? h("span", { className: "hd-radio-sub" }, o.description) : null),
          o.icon ? h(Ic, { name: o.icon, size: 22 }) : null);
      }));
  }

  function Switch(props) {
    var rest = omit(props, ["label", "description"]);
    return h("label", { className: "hd-switchrow" },
      h("span", { className: "hd-switch-main" }, h("span", { className: "hd-switch-title" }, props.label), props.description ? h("span", { className: "hd-switch-sub" }, props.description) : null),
      h("span", { className: "hd-switch" }, h("input", Object.assign({ type: "checkbox", role: "switch" }, rest)), h("span", { className: "hd-track" }, h("span", { className: "hd-thumb" }))));
  }

  /* One-time code: six carved cells over one real input (autofill-friendly). */
  function OTPInput(props) {
    var n = props.length || 6;
    var st = useState(props.defaultValue || ""); var val = props.value != null ? props.value : st[0];
    var f = useState(false); var focused = f[0];
    var id = useId(props.id);
    var cells = [];
    for (var i = 0; i < n; i++) {
      if (i === n / 2 && n % 2 === 0) cells.push(h("span", { key: "g", className: "hd-otp-gap", "aria-hidden": "true" }, "–"));
      var active = focused && (i === Math.min(val.length, n - 1));
      cells.push(h("span", { key: i, className: cx("hd-otp-cell", active && "is-active"), "aria-hidden": "true" }, val.charAt(i)));
    }
    return h("div", { className: "hd-otp" },
      props.label ? h("label", { className: "hd-label", htmlFor: id }, props.label) : null,
      props.hint ? h("div", { className: "hd-hint" }, props.hint) : null,
      h("div", { className: cx("hd-otp-cells", props.error && "is-error") },
        cells,
        h("input", { id: id, value: val, inputMode: "numeric", autoComplete: "one-time-code", maxLength: n, "aria-label": props.label || "Koodhka xaqiijinta",
          onFocus: function () { f[1](true); }, onBlur: function () { f[1](false); },
          onChange: function (e) { var v = e.target.value.replace(/\D/g, "").slice(0, n); if (props.value == null) st[1](v); if (props.onChange) props.onChange(v); } })),
      props.error ? h("div", { className: "hd-error" }, h(Ic, { name: "alert", size: 18 }), props.error) : null,
      props.resend ? h("div", { className: "hd-otp-foot" }, h("span", null, props.resendNote || ""), props.resend) : null);
  }

  function SegmentedControl(props) {
    var st = useState(props.defaultValue || (props.options[0] && props.options[0].value)); var value = props.value || st[0];
    return h("div", { className: "hd-seg", role: "group", "aria-label": props.label },
      props.options.map(function (o) { return h("button", { key: o.value, type: "button", "aria-pressed": value === o.value ? "true" : "false", onClick: function () { if (!props.value) st[1](o.value); if (props.onChange) props.onChange(o.value); } }, o.label); }));
  }

  function Chips(props) {
    var st = useState(props.defaultValue || (props.options[0] && props.options[0].value)); var value = props.value || st[0];
    return h("div", { className: "hd-chips", role: "group", "aria-label": props.label },
      props.options.map(function (o) { return h("button", { key: o.value, type: "button", className: "hd-chip", "aria-pressed": value === o.value ? "true" : "false", onClick: function () { if (!props.value) st[1](o.value); if (props.onChange) props.onChange(o.value); } }, o.icon ? h(Ic, { name: o.icon, size: 16 }) : null, o.label, o.count != null ? h("span", { className: "hd-chip-count" }, o.count) : null); }));
  }

  /* Niche tray: a raised card set into a carved recess, with an optional footer row. */
  function Tray(props) {
    return h("div", { className: cx("hd-tray", props.className), style: props.style },
      h("div", { className: "hd-tray-in" }, props.children),
      props.footer ? h("div", { className: "hd-tray-foot" }, props.footer) : null);
  }

  /* Remittance receipt that prints out once the provider confirms. */
  function Receipt(props) {
    var cur = props.currency || "USD";
    var f = function (v) { var x = formatAmount(v, cur); return (x.cur === "$" ? "$" : "SOS ") + x.num; };
    var fee = props.fee || 0;
    var code = (props.reference || "").replace(/[^A-Z0-9]/gi, "").split("").slice(0, 14).map(function (c, i) { return h("i", { key: i, className: (c.charCodeAt(0) + i) % 3 === 0 ? "o" : undefined }); });
    return h("div", { className: "hd-receipt-stage" },
      h("div", { className: "hd-receipt-slot", "aria-hidden": "true" }),
      h("div", { className: "hd-receipt", role: "status", "aria-label": "Rasiidka" },
        h("div", { className: "hd-receipt-head" }, h("span", null, props.provider || "Rasiidka"), h("span", null, props.date || "")),
        h("div", { className: "hd-receipt-status" }, h(Ic, { name: "check", size: 18, stroke: 2 }), props.status || "Lacagta waa la diray"),
        h("div", { className: "hd-receipt-amount" }, f(props.amount)),
        h("div", { className: "hd-receipt-rule", "aria-hidden": "true" }),
        h("dl", null,
          h("dt", null, "Loo diray"), h("dd", null, props.recipient),
          h("dt", null, "Laga diray"), h("dd", null, props.wallet || "EVC Plus"),
          h("dt", null, "Khidmadda"), h("dd", null, fee ? f(fee) : "Bilaash"),
          h("dt", { className: "hd-receipt-total" }, "Wadarta"), h("dd", { className: "hd-receipt-total" }, f((Number(props.amount) || 0) + fee)),
          h("dt", null, "Tixraac"), h("dd", null, props.reference)),
        h("div", { className: "hd-receipt-rule", "aria-hidden": "true" }),
        h("div", { className: "hd-receipt-code", "aria-hidden": "true" }, code),
        h("div", { className: "hd-receipt-thanks" }, props.thanks || "Mahadsanid")));
  }

  /* Pattern: send money, step 1 — recipient, amount, delivery, message. */
  function SendMoneyForm(props) {
    var amt = useState("25.00");
    return h(Tray, { footer: [h("span", { key: "a" }, "Tallaabada koowaad"), h("span", { key: "b" }, "Khidmadda: Bilaash")] },
      h("form", { className: "hd-form", onSubmit: function (e) { e.preventDefault(); if (props.onSubmit) props.onSubmit(); } },
        h("div", null, h("div", { className: "hd-steps", "aria-hidden": "true" }, h("i", { className: "on" }), h("i", null)),
          h("h2", { className: "hd-form-title", style: { marginTop: 16 } }, "Lacag u dir"),
          h("p", { className: "hd-form-sub" }, "Lacagtu waxay gaartaa dhowr ilbiriqsi gudahood.")),
        h(Input, { label: "Lambarka telefoonka", icon: "phone", prefix: "+252", defaultValue: "61 000 0000", inputMode: "tel", autoComplete: "tel-national", hint: "Magaca qofka ayaa soo baxaya ka hor intaadan dirin." }),
        h(Input, { label: "Lacagta", numeric: true, prefix: "$", addon: "USD", value: amt[0], onChange: function (e) { amt[1](e.target.value); } }),
        h(RadioGroup, { legend: "Sida qofku lacagta u helayo", options: [
          { value: "mobile", label: "Lacagta mobilka", description: "EVC Plus, Zaad, Sahal", icon: "mobile-wallet" },
          { value: "bank", label: "Akoon bangi", description: "1–2 maalmood", icon: "card" },
          { value: "hawala", label: "Xafiiska xawaaladda", description: "Lacag caddaan ah", icon: "remittance" }] }),
        h(Textarea, { label: "Fariin", optional: true, max: 120, rows: 2, defaultValue: "Hooyo, kani waa kharashka bishan." }),
        h(Checkbox, { label: "Kaydi qofkan", description: "Mar dambe si dhakhso ah ugu dir.", defaultChecked: true }),
        h("div", { className: "hd-form-actions" }, h(Button, { block: true, type: "submit" }, "Sii wad", h(Ic, { name: "arrow-right", size: 18 })))));
  }

  window.Hiddo = Object.assign(window.Hiddo || {}, {
    Icon: Ic, ICONS: Object.keys(ICONS), SOMALI_ICONS: SOMALI_ICONS,
    Input: Input, Select: Select, Textarea: Textarea, Checkbox: Checkbox, RadioGroup: RadioGroup, Switch: Switch,
    OTPInput: OTPInput, SegmentedControl: SegmentedControl, Chips: Chips, Tray: Tray, Receipt: Receipt, SendMoneyForm: SendMoneyForm
  });

  window.Hiddo = Object.assign(window.Hiddo || {}, {
    Button: Button, Field: Field, NameField: NameField, PhoneField: PhoneField, Amount: Amount,
    PayConfirm: PayConfirm, LanguageSwitch: LanguageSwitch, Banner: Banner, Badge: Badge, RopeDivider: RopeDivider,
    BottomNav: BottomNav, Tabs: Tabs, ListRow: ListRow, Dialog: Dialog, Sheet: Sheet, DatePicker: DatePicker, QRPay: QRPay, QRCode: QRCode,
    formatAmount: formatAmount, formatSomaliDate: formatSomaliDate
  });
})();
