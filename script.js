window.addEventListener("DOMContentLoaded", () => {
  const meterFill = document.getElementById("meter");
  const softwareGrid = document.getElementById("software-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Add or edit software here. Each object creates one marketplace card.
  const softwareItems = [
    {
      category: "utility/management",
      badge: "Utility",
      version: "Pack",
      name: "JobForce FS",
      description:
        "A Way to simply make it easier to keep your jobs organised and secured!",
      meta: ["Training support", "Free access", "PDF resources"],
      primaryLabel: "Download",
      primaryHref: "https://drive.google.com/file/d/1zKKIZiLSgGlTcXfYUIhLSzoaFr43gZIt/view?usp=drive_link",
      secondaryLabel: "Details",
      secondaryHref: "#"
    }
  ];

  function createSoftwareCard(item) {
    const metaItems = item.meta.map((entry) => `<li>${entry}</li>`).join("");

    return `
      <article class="software-card" data-category="${item.category}">
        <div class="software-top">
          <span class="software-badge">${item.badge}</span>
          <span class="software-version">${item.version}</span>
        </div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <ul class="software-meta">
          ${metaItems}
        </ul>
        <div class="software-actions">
          <a class="primary-btn small" href="${item.primaryHref}">${item.primaryLabel}</a>
          <a class="text-link" href="${item.secondaryHref}">${item.secondaryLabel}</a>
        </div>
      </article>
    `;
  }

  if (softwareGrid) {
    softwareGrid.innerHTML = softwareItems.map(createSoftwareCard).join("");
  }

  if (meterFill) {
    requestAnimationFrame(() => {
      meterFill.style.width = "100%";
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter || "all";
      const softwareCards = document.querySelectorAll(".software-card");

      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      softwareCards.forEach((card) => {
        const category = card.dataset.category || "";
        const shouldShow = filter === "all" || category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        // Ignore registration failures for simple static hosting.
      });
    });
  }
});
