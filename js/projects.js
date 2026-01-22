document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("railTrack");
  const slides = Array.from(track.children);

  const slideWidth = slides[0].offsetWidth + 40; // includes gap
  const totalSlides = slides.length;

  /* Clone slides for infinite loop */
  slides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
  });

  let position = 0;
  let speed = 5; // rail speed
  let isPaused = false;

  function animate() {
    if (!isPaused) {
      position += speed;

      if (position >= slideWidth * totalSlides) {
        position = 0; // seamless reset
      }

      track.style.transform = `translateX(-${position}px)`;
    }
    requestAnimationFrame(animate);
  }

  document.querySelector(".next").onclick = () => {
    position += slideWidth;
  };

  document.querySelector(".prev").onclick = () => {
    position -= slideWidth;
    if (position < 0) position = slideWidth * totalSlides;
  };

  track.addEventListener("mouseenter", () => isPaused = true);
  track.addEventListener("mouseleave", () => isPaused = false);

  animate();
});
