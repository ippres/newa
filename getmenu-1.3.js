function slugify(str) {
  return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

document.addEventListener('DOMContentLoaded', () => {
  const sidebarList = document.querySelector(".sidebar-list");
  const content = document.querySelector("main.content");

  fetch('https://dev.dibitel.com/rest/V1/category-thumbnails')
    .then(res => res.json())
    .then(data => {
      const root = data.find(c => c.id === "2");
      if (!root) return;

      const categories = root.children.map(cat => {
        const slug = slugify(cat.name);
        return {
          slug,
          name: cat.name,
          image: cat.thumbnail || '',
          children: Array.isArray(cat.children) ? cat.children : []
        };
      });

      // Populate sidebar
      categories.forEach(cat => {
        const li = document.createElement("li");
        li.className = "sidebar-item";
        li.setAttribute("data-category", cat.slug);
        li.innerHTML = `
          <a class="category-link" href="${cat.slug}.html">
            <img class="category-icon" src="${cat.image}" alt="${cat.name}">
            ${cat.name}
          </a>`;
        sidebarList.appendChild(li);
      });

      // Populate content
      categories.forEach(cat => {
        const section = document.createElement("div");
        section.id = cat.slug;
        section.className = "category-content";

        const grid = document.createElement("div");
        grid.className = "subcategory-grid";

        cat.children.forEach(sub => {
          const subSlug = slugify(sub.name);
          const href = `/${cat.slug}/${subSlug}.html`;
          const thumb = sub.thumbnail || '';

          const item = document.createElement("div");
          item.className = "subcategory-item";
          item.innerHTML = `
            <a href="${href}">
              <img src="${thumb}" alt="${sub.name}">
              <p>${sub.name}</p>
            </a>`;
          grid.appendChild(item);
        });

        section.appendChild(grid);
        content.appendChild(section);
      });

      // Activate first
      const first = content.querySelector(".category-content");
      if (first) first.classList.add("active");

      // ✅ Switch on hover
      sidebarList.addEventListener("mouseover", e => {
        const item = e.target.closest(".sidebar-item");
        if (!item) return;

        const category = item.getAttribute("data-category");

        document.querySelectorAll(".category-content").forEach(sec =>
          sec.classList.remove("active")
        );

        const activeSection = document.getElementById(category);
        if (activeSection) activeSection.classList.add("active");
      });
    });
});
