/* =====================================================
   GLOBAL DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initRailSlider();
  initProjectShowcase();
});


/* =====================================================
   RAIL SLIDER (SAFE INIT)
===================================================== */
function initRailSlider() {
  const track = document.getElementById("railTrack");
  if (!track) return; // 🚑 slider not on this page

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  const GAP = 40;
  const slideWidth = slides[0].offsetWidth + GAP;
  const totalSlides = slides.length;

  /* Clone slides once */
  slides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
  });

  let position = 0;
  let speed = 1.2;
  let isPaused = false;

  function animate() {
    if (!isPaused) {
      position += speed;

      if (position >= slideWidth * totalSlides) {
        position = 0;
      }

      track.style.transform = `translateX(-${position}px)`;
    }
    requestAnimationFrame(animate);
  }

  /* Controls */
  document.querySelector(".next")?.addEventListener("click", () => {
    position += slideWidth;
  });

  document.querySelector(".prev")?.addEventListener("click", () => {
    position -= slideWidth;
    if (position < 0) position = slideWidth * totalSlides;
  });

  /* Hover pause */
  track.addEventListener("mouseenter", () => (isPaused = true));
  track.addEventListener("mouseleave", () => (isPaused = false));

  animate();
}


/* =====================================================
   PROJECT SHOWCASE MODAL (CRITICAL)
===================================================== */
function initProjectShowcase() {
  const showcase = document.getElementById("projectShowcase");
  if (!showcase) {
    console.warn("⚠️ Project showcase HTML not found");
    return;
  }

  const titleEl = document.getElementById("showcaseTitle");
  const img1 = document.getElementById("showcaseImg1");
  const img2 = document.getElementById("showcaseImg2");
  const pointsList = document.getElementById("showcasePoints");

  document.querySelectorAll(".project-card-pro").forEach(card => {
    card.addEventListener("click", () => {
      /* Title */
      titleEl.textContent = card.dataset.title || "";

      /* Images */
      const images = JSON.parse(card.dataset.images || "[]");
      img1.src = images[0] || "";
      img2.src = images[1] || "";

      /* Bullet points */
      pointsList.innerHTML = "";
      JSON.parse(card.dataset.points || "[]").forEach(point => {
        const li = document.createElement("li");
        li.textContent = point;
        pointsList.appendChild(li);
      });

      showcase.classList.add("active");
    });
  });

  /* Close handlers */
  showcase.querySelector(".showcase-close")?.addEventListener("click", close);
  showcase.querySelector(".showcase-overlay")?.addEventListener("click", close);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") close();
  });

  function close() {
    showcase.classList.remove("active");
  }
}
