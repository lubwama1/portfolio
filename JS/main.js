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
document.getElementById("current-year").textContent = new Date().getFullYear();
