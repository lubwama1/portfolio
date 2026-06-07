document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const experience = document.getElementById("experience");
  const startDate = 2023;
  experience.innerHTML = new Date().getFullYear() - startDate;

  // Scroll portfolio (web projects) animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const delay = card.dataset.delay || "0s";

          // Apply staggered delay
          card.style.transitionDelay = delay;

          // Animate in
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
          card.style.transform = "translateY(0)";

          // Add animation class if specified
          const animation = card.dataset.animation;
          if (animation) {
            card.classList.add("animate__animated", `animate__${animation}`);
          }

          // Stop observing this card
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.3, rootMargin: "0px 0px -50px 0px" },
  );

  // Apply to each card container (the col-md-4 divs)
  document
    .querySelectorAll(".col-md-4[data-animation]")
    .forEach((card, index) => {
      // Set initial hidden state
      card.style.opacity = "0";
      card.style.transform = "scale(0.8)";
      card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

      // If no delay specified, add sequential delay
      if (!card.dataset.delay) {
        card.dataset.delay = `${0.1 + index * 0.1}s`;
      }

      // Observe each card
      observer.observe(card);
    });
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("bg-dark");
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("bg-dark");
      navbar.classList.remove("navbar-scrolled");
    }
  });
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop default form submission

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        msg.textContent = "✅ Message sent successfully!";
        console.log("Submitted");
        form.reset();
      } else {
        msg.textContent = "⚠️ Oops! Something went wrong.";
      }
    } catch (error) {
      msg.textContent = "⚠️ Network error. Try again later.";
    }
  });
});
