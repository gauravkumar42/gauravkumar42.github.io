// ------ CUSTOM CURSOR ------
// A small dot that tracks the pointer exactly, plus a ring that eases
// toward it with a short lag. Grows slightly over links/buttons.
// Skips entirely on touch devices and for prefers-reduced-motion.

(() => {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!canHover || reducedMotion) return;

  document.body.classList.add("has-custom-cursor");

  const dot = document.createElement("div");
  dot.className = "cursor-dot is-hidden";
  const ring = document.createElement("div");
  ring.className = "cursor-ring is-hidden";
  document.body.append(dot, ring);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;
  const EASE = 0.18; // how quickly the ring catches up to the dot

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.classList.remove("is-hidden");
    ring.classList.remove("is-hidden");
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  window.addEventListener("mouseleave", () => {
    dot.classList.add("is-hidden");
    ring.classList.add("is-hidden");
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * EASE;
    ringY += (mouseY - ringY) * EASE;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  };
  requestAnimationFrame(animateRing);

  const interactiveSelector = "a, button, input, textarea, .skill-pill, .tech-pill";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.add("is-active");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.remove("is-active");
    }
  });
})();
