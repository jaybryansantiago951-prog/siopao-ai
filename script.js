const servingCount = document.querySelector("#serving-count");
const amountLabels = [...document.querySelectorAll(".amount")];
const baseServings = 12;
let servings = baseServings;

const fractions = new Map([
  [0, ""],
  [0.125, "⅛"],
  [0.25, "¼"],
  [0.375, "⅜"],
  [0.5, "½"],
  [0.625, "⅝"],
  [0.75, "¾"],
  [0.875, "⅞"],
]);

function formatAmount(value) {
  const whole = Math.floor(value + 0.0001);
  const fraction = Math.round((value - whole) * 8) / 8;
  const fractionText = fractions.get(fraction) ?? "";
  if (whole === 0) return fractionText || value.toFixed(1);
  return fractionText ? `${whole}${fractionText}` : String(whole);
}

function updateServings(nextServings) {
  servings = Math.min(24, Math.max(2, nextServings));
  servingCount.textContent = servings;
  amountLabels.forEach((label) => {
    const baseAmount = Number(label.dataset.amount);
    label.textContent = formatAmount(baseAmount * servings / baseServings);
  });
}

document.querySelectorAll("[data-serving-change]").forEach((button) => {
  button.addEventListener("click", () => {
    updateServings(servings + Number(button.dataset.servingChange));
  });
});

const stepButtons = [...document.querySelectorAll(".step-number")];
const completedCount = document.querySelector("#completed-count");
const progressFill = document.querySelector("#progress-fill");

function updateProgress() {
  const completed = document.querySelectorAll(".recipe-step.is-complete").length;
  completedCount.textContent = completed;
  progressFill.style.width = `${completed / stepButtons.length * 100}%`;
}

stepButtons.forEach((button) => {
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    const step = button.closest(".recipe-step");
    const isComplete = step.classList.toggle("is-complete");
    button.setAttribute("aria-pressed", String(isComplete));
    updateProgress();
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  });
});