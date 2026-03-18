(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Footer year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile navigation toggle
  const toggleBtn = $("[data-nav-toggle]");
  const mobileNav = $("[data-mobile-nav]");
  if (toggleBtn && mobileNav) {
    const setOpen = (open) => {
      mobileNav.dataset.open = open ? "true" : "false";
      toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };

    toggleBtn.addEventListener("click", () => {
      const isOpen = mobileNav.dataset.open === "true";
      setOpen(!isOpen);
    });

    // Close when tapping a link
    $$("a", mobileNav).forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });
  }

  // FAQ accordion
  const faqRoot = $('[data-faq]');
  if (faqRoot) {
    const items = $$(".faq-item", faqRoot);
    items.forEach((item) => {
      const btn = $(".faq-q", item);
      const expanded = btn?.getAttribute("aria-expanded") === "true";
      if (expanded) item.dataset.open = "true";

      btn?.addEventListener("click", () => {
        const willOpen = item.dataset.open !== "true";
        item.dataset.open = willOpen ? "true" : "false";
        btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });
  }

  // Elevate header on scroll (subtle)
  const header = $(".site-header");
  if (header) {
    const onScroll = () => {
      header.dataset.elevate = window.scrollY > 6 ? "true" : "false";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Contact form -> mailto
  const form = $("#quote-form");
  const status = $("#form-status");
  const BUSINESS_EMAIL = "camrwilson1@gmail.com";

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "");
      const phone = String(data.get("phone") || "");
      const email = String(data.get("email") || "");
      const service = String(data.get("service") || "");
      const area = String(data.get("area") || "");
      const message = String(data.get("message") || "");

      const subject = `Quote request: ${service}`;
      const lines = [
        `Name: ${name}`,
        `Phone: ${phone || "(not provided)"}`,
        `Email: ${email}`,
        `Service: ${service}`,
        `Area/Address: ${area}`,
        "",
        `Message:`,
        message || "(none)",
      ];

      const body = lines.join("\n");
      // Keep the email address unencoded; only encode subject/body.
      const mailto = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`;

      if (status) status.textContent = "Opening your email client…";

      // Try to open mail client
      window.location.href = mailto;
    });
  }
})();

