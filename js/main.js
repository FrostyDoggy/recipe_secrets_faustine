/*
 * Shared behavior for every page: mobile nav, sticky header, scroll-reveal
 * animations, specials rendering, and form validation.
 */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Sticky header on scroll ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll-reveal animations ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ---------- Specials rendering (Home preview + Specials page) ---------- */
  function cardMarkup(special) {
    return (
      '<article class="card reveal">' +
        '<div class="card-media">' +
          '<img src="' + special.image + '" alt="' + special.alt + '" loading="lazy" decoding="async" width="800" height="600">' +
        "</div>" +
        '<div class="card-body">' +
          "<h3>" + special.name + "</h3>" +
          "<p>" + special.description + "</p>" +
          '<span class="price">' + special.price + "</span>" +
        "</div>" +
      "</article>"
    );
  }

  const previewGrid = document.querySelector("[data-specials-preview]");
  if (previewGrid && typeof SPECIALS !== "undefined") {
    previewGrid.innerHTML = SPECIALS.slice(0, 3).map(cardMarkup).join("");
    reobserveReveals(previewGrid);
  }

  const fullGrid = document.querySelector("[data-specials-full]");
  if (fullGrid && typeof SPECIALS !== "undefined") {
    fullGrid.innerHTML = SPECIALS.map(cardMarkup).join("");
    reobserveReveals(fullGrid);
  }

  function reobserveReveals(container) {
    const newReveals = container.querySelectorAll(".reveal");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      newReveals.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    newReveals.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Form validation ---------- */
  const OPEN_HOUR = 11; // 11:00
  const CLOSE_HOUR = 22; // 10:00 PM, last seating

  function setFieldError(field, message) {
    field.classList.toggle("has-error", Boolean(message));
    const msg = field.querySelector(".error-msg");
    if (msg) msg.textContent = message || "";
  }

  function validateField(field) {
    const input = field.querySelector("input, select, textarea");
    if (!input) return true;

    if (input.hasAttribute("required") && !input.value.trim()) {
      setFieldError(field, "This field is required.");
      return false;
    }

    if (input.type === "email" && input.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value.trim())) {
        setFieldError(field, "Enter a valid email address.");
        return false;
      }
    }

    if (input.type === "tel" && input.value.trim()) {
      const digits = input.value.replace(/\D/g, "");
      if (digits.length < 7) {
        setFieldError(field, "Enter a valid phone number.");
        return false;
      }
    }

    if (input.type === "date" && input.value) {
      const chosen = new Date(input.value + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) {
        setFieldError(field, "Please choose today or a future date.");
        return false;
      }
    }

    if (input.type === "time" && input.value) {
      const [h] = input.value.split(":").map(Number);
      if (h < OPEN_HOUR || h >= CLOSE_HOUR) {
        setFieldError(field, "We're open 11:00 AM–10:00 PM. Pick a time in that range.");
        return false;
      }
    }

    if (input.name === "guests" && input.value) {
      const guests = Number(input.value);
      if (guests < 1 || guests > 20) {
        setFieldError(field, "Parties must be between 1 and 20 guests.");
        return false;
      }
    }

    setFieldError(field, "");
    return true;
  }

  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    const status = form.querySelector(".form-status");
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date();
      dateInput.min = today.toISOString().slice(0, 10);
    }

    form.querySelectorAll(".field").forEach(function (field) {
      const input = field.querySelector("input, select, textarea");
      if (input) {
        input.addEventListener("blur", function () { validateField(field); });
      }
    });

    form.addEventListener("submit", function (event) {
      const fields = form.querySelectorAll(".field");
      let isValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        event.preventDefault();
        if (status) {
          status.textContent = "Please fix the highlighted fields above.";
          status.className = "form-status is-visible error";
        }
        const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstError) firstError.focus();
        return;
      }

      // Formspree endpoints accept normal form submissions (action/method on
      // the <form> itself); nothing further needed here when the endpoint
      // is configured. This handler only short-circuits on validation errors.
      if (status) {
        status.textContent = "Sending...";
        status.className = "form-status is-visible success";
      }
    });
  });
})();
