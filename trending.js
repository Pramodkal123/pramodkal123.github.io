/* Trending Stones (home page) – plain JS. Edit freely. */
window.initTrending = function () {
    window.__trendingGrid = document.getElementById("trendingGrid");
    if (!window.__trendingGrid) return;
    const allowMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    // Header reveal
    const header = document.querySelector(".trending-header");
    if (header && "IntersectionObserver" in window) {
      const headerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              headerObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      headerObserver.observe(header);
    } else if (header) {
      header.classList.add("visible");
    }

    // Card reveals
    const cards = document.querySelectorAll(".trending-card");
    if ("IntersectionObserver" in window) {
      const cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              cardObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      cards.forEach((card) => cardObserver.observe(card));
    } else {
      cards.forEach((card) => card.classList.add("visible"));
    }

    // Gallery videos: auto-play only when visible
    const galleryVideos = document.querySelectorAll(".trending-card video");

    if (allowMotion && "IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.25 }
      );

      galleryVideos.forEach((video) => videoObserver.observe(video));
    }

    // ===== Zoom Lightbox with Left / Right navigation =====
    const lightbox = document.getElementById("trendingLightbox");
    const lightboxVideo = document.getElementById("trendingLightboxVideo");
    const lightboxClose = document.getElementById("trendingLightboxClose");
    const lightboxPrev = document.getElementById("trendingLightboxPrev");
    const lightboxNext = document.getElementById("trendingLightboxNext");

    if (lightbox && lightboxVideo) {
      const videoSources = Array.from(galleryVideos).map((v) => v.src);
      let lightboxIndex = 0;

      function loadLightboxVideo() {
        const src = videoSources[lightboxIndex];
        if (!src) return;

        lightboxVideo.src = src;
        lightboxVideo.load();
        lightboxVideo.play().catch(() => {});

        // Replay switch animation
        lightboxVideo.classList.remove("switch");
        void lightboxVideo.offsetWidth;
        lightboxVideo.classList.add("switch");
      }

      function openVideoLightbox(index) {
        lightboxIndex = index;

        // Pause all gallery videos
        galleryVideos.forEach((v) => v.pause());

        loadLightboxVideo();
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("trending-lightbox-active");
      }

      function closeVideoLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxVideo.pause();
        lightboxVideo.removeAttribute("src");
        lightboxVideo.load();
        document.body.classList.remove("trending-lightbox-active");
      }

      function showPrevVideo() {
        lightboxIndex = (lightboxIndex - 1 + videoSources.length) % videoSources.length;
        loadLightboxVideo();
      }

      function showNextVideo() {
        lightboxIndex = (lightboxIndex + 1) % videoSources.length;
        loadLightboxVideo();
      }

      // Open lightbox when clicking a card
      cards.forEach((card, index) => {
        card.addEventListener("click", () => {
          openVideoLightbox(index);
        });
      });

      // Close when clicking dark background
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeVideoLightbox();
      });

      // Buttons
      lightboxClose.addEventListener("click", closeVideoLightbox);
      lightboxPrev.addEventListener("click", showPrevVideo);
      lightboxNext.addEventListener("click", showNextVideo);

      // Keyboard controls
      if (window.__trendingKey) document.removeEventListener("keydown", window.__trendingKey);
      window.__trendingKey = (e) => {
        if (!lightbox.classList.contains("open")) return;

        if (e.key === "Escape") closeVideoLightbox();
        if (e.key === "ArrowLeft") showPrevVideo();
        if (e.key === "ArrowRight") showNextVideo();
      };
      document.addEventListener("keydown", window.__trendingKey);
    }
  };

/* Re-run automatically if the page re-renders the section (e.g. after navigating back to Home) */
if (!window.__trendingWatch) {
  window.__trendingWatch = new MutationObserver(function () {
    var g = document.getElementById("trendingGrid");
    if (g && g !== window.__trendingGrid) window.initTrending();
  });
  window.__trendingWatch.observe(document.body, { childList: true, subtree: true });
}
