document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".dot");
  const sliderInner = document.querySelector(".slider-inner");
  let currentSlide = 0;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  const updateSlider = () => {
    sliderInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
  };

  updateSlider(); // Initialize slider
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel-container");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");

  let currentIndex = 0;
  const gap = 40; // Same as the gap in CSS

  function updateCarousel() {
    const width = carousel.clientWidth;
    const slideWidth = width / 3 + gap;
    const offset = currentIndex * slideWidth;
    carousel.style.transform = `translateX(-${offset}px)`;
  }

  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - 3) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".whiskey-cards")) {
    // Slider dragging
    const slider = document.querySelector(".whiskey-cards");
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      cancelMomentumTracking();
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
      beginMomentumTracking();
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX; //scroll-fast
      var prevScrollLeft = slider.scrollLeft;
      slider.scrollLeft = scrollLeft - walk;
      velX = slider.scrollLeft - prevScrollLeft;
    });

    // Momentum
    var velX = 0;
    var momentumID;

    slider.addEventListener("wheel", (e) => {
      cancelMomentumTracking();
    });

    function beginMomentumTracking() {
      cancelMomentumTracking();
      momentumID = requestAnimationFrame(momentumLoop);
    }

    function cancelMomentumTracking() {
      cancelAnimationFrame(momentumID);
    }

    function momentumLoop() {
      slider.scrollLeft += velX * 2;
      velX *= 0.95;
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      }
    }

    // Scroll
    const scrollContainer = document.querySelector(".whiskey-cards");

    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();

      window.requestAnimationFrame(() => {
        scrollContainer.scrollTo({
          top: 0,
          left: scrollContainer.scrollLeft + evt.deltaY * 2,
          behavior: "smooth",
        });
      });
    });

    // Add functionality to the "Next" button in the blog cards navigation
    const nextButton = document.getElementById("blog-cards-navigation");
    const whiskeyCardsContainer = document.querySelector(".whiskey-cards");

    nextButton.addEventListener("click", () => {
      const cardWidth =
        whiskeyCardsContainer.querySelector(".whiskey-card").offsetWidth;
      const gap = parseInt(getComputedStyle(whiskeyCardsContainer).gap);
      const scrollAmount = cardWidth + gap;

      whiskeyCardsContainer.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });
  }
});

// document.addEventListener('DOMContentLoaded', function() {
//   const contentElements = document.querySelectorAll('.whiskey-card .whiskey-card--content');

//   contentElements.forEach(content => {
//     const lines = 4; // Number of lines to display
//     const lineHeight = parseFloat(window.getComputedStyle(content).lineHeight);
//     const maxHeight = lines * lineHeight;

//     if (content.scrollHeight > maxHeight) {
//       let text = content.innerText;
//       while (content.scrollHeight > maxHeight) {
//         text = text.slice(0, -1);
//         content.innerText = text + '...';
//       }
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navbarLinks = document.getElementById("navbar-links");

  hamburgerMenu.addEventListener("click", () => {
    console.log("clicked")
    navbarLinks.classList.toggle("active");
  });

  // Other scripts for slider, carousel, etc.
});
