const year = document.querySelector("[data-year]");
const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const typingTitle = document.querySelector("[data-type-text]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

const revealText = () => {
  if (!typingTitle) return;
  const text = typingTitle.dataset.typeText || "";
  let index = 0;

  const typeNext = () => {
    typingTitle.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      window.setTimeout(typeNext, index === 1 ? 180 : 92);
    } else {
      window.setTimeout(() => typingTitle.classList.add("is-complete"), 680);
    }
  };

  typeNext();
};

updateHeader();
revealText();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
