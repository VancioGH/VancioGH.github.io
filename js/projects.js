let projectsData = [];
let activeFilter = "all";

async function loadProjects() {
  try {
    const response = await fetch("data/projects.json");
    projectsData = await response.json();
    renderProjects();
  } catch (error) {
    console.error("Error loading projects:", error);
    const grid = document.getElementById("projects-grid");
    if (grid) {
      grid.innerHTML = '<p class="error-msg">Error loading projects.</p>';
    }
  }
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const lang = currentLang || "es";
  const filtered = activeFilter === "all"
    ? projectsData
    : projectsData.filter(p => p.categories.includes(activeFilter));

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-projects">${lang === "es" ? "No hay proyectos en esta categoría." : "No projects in this category."}</p>`;
    return;
  }

  const detailsLabel = translations[lang]["proyectos.details"];
  const viewProjectLabel = translations[lang]["proyectos.view"];
  const viewCodeLabel = translations[lang]["proyectos.code"];

  grid.innerHTML = filtered.map(project => `
    <article class="project-card">
      <a href="project.html?id=${project.id}" class="project-card-link">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title[lang]}" loading="lazy">
        </div>
        <div class="project-content">
          <h3>${project.title[lang]}</h3>
          <p>${project.description[lang]}</p>
          <div class="project-tags">
            ${project.categories.map(cat => `<span class="tag">${cat}</span>`).join("")}
          </div>
        </div>
      </a>
      <div class="project-actions">
        ${project.hasProject ? `<a href="${project.link}" target="_blank" class="btn-project">${viewProjectLabel}</a>` : ""}
        ${project.github ? `<a href="${project.github}" target="_blank" class="btn-code">${viewCodeLabel}</a>` : ""}
      </div>
    </article>
  `).join("");
}

function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;

      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      renderProjects();
    });
  });
}
