import { endorsements } from "./data/endorsements.js";
import { products } from "./data/products.js";

const caption = document.getElementById("caption");
const customBtn = document.getElementById("custom-btn");
const productInput = document.getElementById("product-input");
const inputError = document.getElementById("input-error");
const counselorPhoto = document.getElementById("counselor-photo");
const photoPlaceholder = document.getElementById("photo-placeholder");
const productsGrid = document.getElementById("products-grid");
const productAudio = new Audio();

function renderProducts() {
  productsGrid.innerHTML = products
    .map(
      (product) => `
    <button type="button" class="product-card" data-product="${escapeAttr(product.name)}" aria-label="Select ${escapeAttr(product.name)} for endorsement">
      <img class="product-card-image" src="${escapeAttr(product.image)}" alt="${escapeAttr(product.name)} — ${escapeAttr(product.tagline)}" data-audio="${escapeAttr(product.audio)}" loading="lazy">
      <div class="product-card-body">
        <p class="product-card-name">${escapeHtml(product.name)}</p>
        <p class="product-card-tagline">${escapeHtml(product.tagline)}</p>
      </div>
    </button>
  `
    )
    .join("");

  productsGrid.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      productInput.value = card.dataset.product;
      clearInputError();
      productInput.focus();
    });
  });

  productsGrid.querySelectorAll(".product-card-image").forEach((image) => {
    image.addEventListener("click", () => {
      playProductAudio(image.dataset.audio);
    });
  });
}

function playProductAudio(src) {
  if (!src) return;

  productAudio.pause();
  productAudio.currentTime = 0;
  productAudio.src = src;
  productAudio.play().catch(() => {});
}

function escapeHtml(text) {
  const el = document.createElement("span");
  el.textContent = text;
  return el.innerHTML;
}

function escapeAttr(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setCaption(text) {
  caption.textContent = text;
}

function clearInputError() {
  inputError.textContent = "";
  inputError.classList.add("hidden");
}

function showInputError(message) {
  inputError.textContent = message;
  inputError.classList.remove("hidden");
}

counselorPhoto.addEventListener("error", () => {
  counselorPhoto.classList.add("hidden");
  photoPlaceholder.classList.remove("hidden");
  photoPlaceholder.setAttribute("aria-hidden", "false");
});

function generateCustomEndorsement() {
  clearInputError();
  const product = productInput.value.trim();

  if (!product) {
    showInputError("Please type a product name first!");
    productInput.focus();
    return;
  }

  const templates = endorsements.filter((e) => e.hasPlaceholder);
  if (templates.length === 0) {
    showInputError("No customizable templates available.");
    return;
  }

  const template = pickRandom(templates);
  const text = template.text.replace("[PRODUCT]", product);
  setCaption(text);
}

customBtn.addEventListener("click", generateCustomEndorsement);

productInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    generateCustomEndorsement();
  }
});

productInput.addEventListener("input", () => {
  if (inputError.textContent) {
    clearInputError();
  }
});

renderProducts();
