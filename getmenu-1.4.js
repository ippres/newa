document.addEventListener('DOMContentLoaded', () => {
  const sidebarList = document.querySelector(".sidebar-list");
  const content = document.querySelector("main.content");

  fetch('https://dev.dibitel.com/rest/V1/category-thumbnails')
    .then(res => res.json())
    .then(data => {
      const root = data.find(c => c.id === "2");
      if (!root) return;

      const categories = root.children.map(cat => ({
        id: cat.id,
        name: cat.name,
        image: cat.thumbnail || '',
        url: cat.url,
        children: Array.isArray(cat.children) ? cat.children : []
      }));

      // Populate sidebar
      categories.forEach(cat => {
        const li = document.createElement("li");
        li.className = "sidebar-item";
        li.setAttribute("data-category", `cat-${cat.id}`);
        li.innerHTML = `
          <a class="category-link" href="${cat.url}">
            <img class="category-icon" src="${cat.image}" alt="${cat.name}">
            ${cat.name}
          </a>`;
        sidebarList.appendChild(li);
      });

      // Populate content
      categories.forEach(cat => {
        const section = document.createElement("div");
        section.id = `cat-${cat.id}`;
        section.className = "category-content";

        const grid = document.createElement("div");
        grid.className = "subcategory-grid";

        cat.children.forEach(sub => {
          const item = document.createElement("div");
          item.className = "subcategory-item";
          item.innerHTML = `
            <a href="${sub.url}">
              <img src="${sub.thumbnail || ''}" alt="${sub.name}">
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

        const categoryId = item.getAttribute("data-category");

        document.querySelectorAll(".category-content").forEach(sec =>
          sec.classList.remove("active")
        );

        const activeSection = document.getElementById(categoryId);
        if (activeSection) activeSection.classList.add("active");
      });
    });
});
