import { endorsements } from "./data/endorsements.js";

const VIDEO_FILES = Array.from({ length: 8 }, (_, i) =>
  `/public/videos/endorsement-${String(i + 1).padStart(2, "0")}.mp4`
);

const video = document.getElementById("endorsement-video");
const videoPlaceholder = document.getElementById("video-placeholder");
const caption = document.getElementById("caption");
const generateBtn = document.getElementById("generate-btn");
const customBtn = document.getElementById("custom-btn");
const productInput = document.getElementById("product-input");
const inputError = document.getElementById("input-error");
const counselorPhoto = document.getElementById("counselor-photo");
const photoPlaceholder = document.getElementById("photo-placeholder");

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function showVideoPlaceholder() {
  video.classList.add("hidden");
  video.pause();
  video.removeAttribute("src");
  video.load();
  videoPlaceholder.classList.remove("hidden");
}

function hideVideoPlaceholder() {
  video.classList.remove("hidden");
  videoPlaceholder.classList.add("hidden");
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

function playRandomVideo() {
  const src = pickRandom(VIDEO_FILES);
  hideVideoPlaceholder();
  video.src = src;
  video.load();
  video.play().catch(() => {});
}

function handleVideoError() {
  showVideoPlaceholder();
}

function handleVideoLoaded() {
  hideVideoPlaceholder();
}

video.addEventListener("error", handleVideoError);
video.addEventListener("loadeddata", handleVideoLoaded);

counselorPhoto.addEventListener("error", () => {
  counselorPhoto.classList.add("hidden");
  photoPlaceholder.classList.remove("hidden");
  photoPlaceholder.setAttribute("aria-hidden", "false");
});

function generateRandomEndorsement() {
  clearInputError();
  const endorsement = pickRandom(endorsements);
  setCaption(endorsement.text);
  playRandomVideo();
}

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
  playRandomVideo();
}

generateBtn.addEventListener("click", generateRandomEndorsement);
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
