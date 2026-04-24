const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const copyButtons = document.querySelectorAll("[data-copy-target]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });
}

// Mark the active navigation item without hard-coding page state in every file.
const pathParts = window.location.pathname.split("/").filter(Boolean);
const currentPath = pathParts[pathParts.length - 1] || "index.html";
const isProjectDetail = pathParts.includes("projects") && currentPath !== "projects.html";

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPath = link.getAttribute("href")?.split("/").pop();

  if (linkPath === currentPath || (isProjectDetail && linkPath === "projects.html")) {
    link.setAttribute("aria-current", "page");
  }
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.getAttribute("data-copy-target");
    const target = targetId ? document.getElementById(targetId) : null;
    const status = document.querySelector("[data-copy-status]");
    const text = target?.textContent?.trim();

    if (!text) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      if (status) {
        status.textContent = "Copied.";
      }
    } catch {
      if (status) {
        status.textContent = "Copy failed. Select the email address manually.";
      }
    }
  });
});
