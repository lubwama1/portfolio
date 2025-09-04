document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
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
