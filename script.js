// ─── Config — update before deploying ────────────────────────────────────────
const EARLY_PRICE  = 49;
const FULL_PRICE   = 99;
const WAITLIST_URL = "https://tally.so/r/VLoW8j";

// ─── Price tokens ─────────────────────────────────────────────────────────────
document.querySelectorAll("[data-early-price]").forEach(el => {
  el.textContent = EARLY_PRICE;
});
document.querySelectorAll("[data-full-price]").forEach(el => {
  el.textContent = FULL_PRICE;
});

// ─── Waitlist buttons ─────────────────────────────────────────────────────────
document.querySelectorAll("[data-waitlist]").forEach(el => {
  el.addEventListener("click", () => {
    window.open(WAITLIST_URL, "_blank", "noopener,noreferrer");
  });
});

// ─── Nav scroll ───────────────────────────────────────────────────────────────
const nav = document.getElementById("nav");

function updateNav() {
  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// ─── Mobile burger ────────────────────────────────────────────────────────────
const burger   = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// ─── Product tour tab switcher ────────────────────────────────────────────────
const tabs   = document.querySelectorAll(".tour__tab");
const panels = document.querySelectorAll(".tour__panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.panel;

    // Update tab states
    tabs.forEach(t => {
      t.classList.toggle("tour__tab--active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });

    // Update panel states
    panels.forEach(panel => {
      const isActive = panel.id === `panel-${target}`;
      panel.classList.toggle("tour__panel--active", isActive);
      if (isActive) {
        panel.removeAttribute("hidden");
      } else {
        panel.setAttribute("hidden", "");
      }
    });
  });
});

// ─── FAQ accordion ────────────────────────────────────────────────────────────
document.querySelectorAll(".faq__question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item    = btn.closest(".faq__item");
    const answer  = item.querySelector(".faq__answer");
    const isOpen  = btn.getAttribute("aria-expanded") === "true";

    // Close all others
    document.querySelectorAll(".faq__question").forEach(other => {
      if (other === btn) return;
      other.setAttribute("aria-expanded", "false");
      const otherAnswer = other.closest(".faq__item").querySelector(".faq__answer");
      otherAnswer.style.maxHeight = null;
    });

    // Toggle this one
    if (isOpen) {
      btn.setAttribute("aria-expanded", "false");
      answer.style.maxHeight = null;
    } else {
      btn.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// ─── Carousels ────────────────────────────────────────────────────────────────
document.querySelectorAll(".carousel").forEach(carousel => {
  const track   = carousel.querySelector(".carousel__track");
  const slides  = carousel.querySelectorAll(".carousel__slide");
  const dots    = carousel.querySelectorAll(".carousel__dot");
  const prevBtn = carousel.querySelector(".carousel__btn--prev");
  const nextBtn = carousel.querySelector(".carousel__btn--next");
  const label   = carousel.querySelector(".carousel__label");
  const labels  = carousel.dataset.labels ? carousel.dataset.labels.split(",") : [];
  let current   = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("carousel__dot--active", i === current));
    if (label && labels[current] !== undefined) label.textContent = labels[current];
  }

  prevBtn?.addEventListener("click", () => goTo(current - 1));
  nextBtn?.addEventListener("click", () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

  // Keyboard nav: ←/→ when carousel or its descendants have focus
  carousel.setAttribute("tabindex", "0");
  carousel.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(current - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
  });
});

