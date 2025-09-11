document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".slider-container");

  sliders.forEach((sliderContainer) => {
    const sliderHandle = sliderContainer.querySelector(".slider-handle");
    const sliderLine = sliderContainer.querySelector(".slider-line");
    const beforeImage = sliderContainer.querySelector(".before-image");
    const afterImage = sliderContainer.querySelector(".after-image");
    const beforeBtn = sliderContainer.querySelector(".before-text");
    const afterBtn = sliderContainer.querySelector(".after-text");

    let isDragging = false;

    // Initialize slider at the center
    const initializeSlider = () => {
      sliderHandle.style.transition = "left 0.3s ease";
      sliderLine.style.transition = "left 0.3s ease";

      sliderHandle.style.left = "50%";
      sliderLine.style.left = "50%";

      beforeImage.style.clipPath = `inset(0 50% 0 0)`;
      afterImage.style.clipPath = `inset(0 0 0 50%)`;
    };

    // Move slider
    const moveSlider = (clientX) => {
      const containerRect = sliderContainer.getBoundingClientRect();
      let offsetX = clientX - containerRect.left;

      if (offsetX < 0) offsetX = 0;
      if (offsetX > containerRect.width) offsetX = containerRect.width;

      const percentage = Math.round((offsetX / containerRect.width) * 100);

      sliderHandle.style.left = `${percentage}%`;
      sliderLine.style.left = `${percentage}%`;

      beforeImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
      afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;
    };

    const startDragging = () => {
      isDragging = true;
      sliderHandle.style.transition = "none";
      sliderLine.style.transition = "none";
    };

    const stopDragging = () => {
      isDragging = false;
      sliderHandle.style.transition = "left 0.3s ease";
      sliderLine.style.transition = "left 0.3s ease";
    };

    // Mouse events
    sliderHandle.addEventListener("mousedown", startDragging);
    sliderLine.addEventListener("mousedown", startDragging);

    window.addEventListener("mousemove", (e) => {
      if (isDragging) moveSlider(e.clientX);
    });

    window.addEventListener("mouseup", stopDragging);

    // Touch events
    sliderHandle.addEventListener("touchstart", startDragging);
    sliderLine.addEventListener("touchstart", startDragging);

    window.addEventListener("touchmove", (e) => {
      if (isDragging) moveSlider(e.touches[0].clientX);
    });

    window.addEventListener("touchend", stopDragging);

    // --- Before / After buttons ---
    if (beforeBtn) {
      beforeBtn.addEventListener("click", () => {
        beforeImage.style.clipPath = `inset(0 0 0 0)`;   // Show full "before"
        afterImage.style.clipPath = `inset(0 100% 0 0)`; // Hide "after"
        sliderHandle.style.left = "100%";
        sliderLine.style.left = "100%";
      });
    }

    if (afterBtn) {
      afterBtn.addEventListener("click", () => {
        beforeImage.style.clipPath = `inset(0 100% 0 0)`; // Hide "before"
        afterImage.style.clipPath = `inset(0 0 0 0)`;     // Show full "after"
        sliderHandle.style.left = "0%";
        sliderLine.style.left = "0%";
      });
    }

    // Initialize this slider
    initializeSlider();
  });
});
