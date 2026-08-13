/* amykenyonmed.com — small progressive-enhancement helpers. */
(function () {
  "use strict";

  /* ---- Mobile navigation toggle ---------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Footer copyright year -------------------------------------------
     The HTML carries a hard-coded year so the footer is still correct with
     JavaScript off; this just keeps it current without anyone editing it.
     --------------------------------------------------------------------- */
  var year = String(new Date().getFullYear());
  Array.prototype.forEach.call(
    document.querySelectorAll("[data-current-year]"),
    function (el) { el.textContent = year; }
  );

  /* ---- Contact form ----------------------------------------------------
     The site is static, so there is no server to POST to. Until a form
     endpoint is wired up (see README), the form opens the visitor's mail
     client with the message pre-filled. To switch to a hosted handler,
     set a real `action` on the form and delete nothing else — the handler
     below stands down whenever the action is not "mailto".
     --------------------------------------------------------------------- */
  var form = document.getElementById("contact-form");

  if (form && form.dataset.transport === "mailto") {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var data = new FormData(form);
      var get = function (key) {
        return (data.get(key) || "").toString().trim();
      };

      var name = (get("firstName") + " " + get("lastName")).trim();
      var subject = "Website enquiry" + (name ? " from " + name : "");

      var body = [
        "Name: " + name,
        "Email: " + get("email"),
        "Phone: " + (get("phone") || "-"),
        "Company: " + get("company"),
        "",
        get("message")
      ].join("\n");

      window.location.assign(
        "mailto:" +
          form.dataset.recipient +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body)
      );
    });
  }
})();
