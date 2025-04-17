// menuGenerator.js

// Configuration: define your categories here
const categories = [
  {
    id: "bio",
    name: "Bio",
    icon: "magefan_blog/bio-1.jpg",
    subcategories: [
      { name: "Capillaire", link: "/bio/capillaire.html", image: "magefan_blog/imgs/capillaire-1.png" },
      { name: "Natural Soap", link: "/natural-soap", image: "magefan_blog/imgs/capillaire-1.png" }
    ],
    banners: [
      "magefan_blog/banners/banner_D1.jpg",
      "magefan_blog/banners/banner_D2.jpg",
      "magefan_blog/banners/banner_D3.jpg",
      "magefan_blog/banners/banner_D4.jpg"
    ]
  },
  {
    id: "capillaire",
    name: "Capillaire",
    icon: "magefan_blog/capillaire-2.png",
    subcategories: [
      { name: "Hair Care", link: "/bio/capillaire.html", image: "magefan_blog/imgs/capillaire-1.png" }
    ],
    banners: [
      "magefan_blog/banners/banner_D1.jpg"
    ]
  },
  {
    id: "corps-bain",
    name: "Corps & Bain",
    icon: "magefan_blog/corps-bain-1.png",
    subcategories: [
      { name: "Body Wash", link: "/body-wash", image: "bio.jpg" },
      { name: "Moisturizer", link: "/moisturizer", image: "bio.jpg" }
    ],
    banners: ["magefan_blog/banners/banner_D1.jpg"]
  },
  // add more items here...
];

// Initialization: generate menu and bind events
document.addEventListener("DOMContentLoaded", function() {
  const sidebarList = document.getElementById("sidebarList");
  const contentArea = document.getElementById("categoryContent");

  categories.forEach((cat, index) => {
    // Sidebar item
    const li = document.createElement("li");
    li.className = "sidebar-item";
    li.dataset.category = cat.id;
    li.innerHTML = `
      <a class=\"category-link\" href=\"#${cat.id}\">
        <img class=\"category-icon\" src=\"{{media url=\"${cat.icon}\"}}\" alt=\"${cat.name}\"> ${cat.name}
      </a>`;
    sidebarList.appendChild(li);

    // Category content
    const section = document.createElement("div");
    section.className = "category-content" + (index === 0 ? " active" : "");
    section.id = cat.id;

    // Subcategories
    const grid = document.createElement("div");
    grid.className = "subcategory-grid";
    grid.innerHTML = cat.subcategories.map(sub => `
      <div class=\"subcategory-item\">
        <a href=\"${sub.link}\"\>
          <img src=\"{{media url=\"${sub.image}\"}}\" alt=\"${sub.name}\">\n          <p>${sub.name}</p>
        </a>
      </div>
    `).join("");

    // Banners
    const bannerWrap = document.createElement("div");
    bannerWrap.className = "banners";
    bannerWrap.innerHTML = cat.banners.map(src => `
      <a href=\"/${cat.id}-banner\"\>
        <img src=\"{{media url=\"${src}\"}}\" alt=\"${cat.name} Banner\">\n      </a>
    `).join("");

    section.appendChild(grid);
    section.appendChild(bannerWrap);
    contentArea.appendChild(section);

    // Click event for sidebar items
    li.addEventListener("click", () => {
      document.querySelectorAll(".sidebar-item").forEach(i => i.classList.remove("active"));
      document.querySelectorAll(".category-content").forEach(c => c.classList.remove("active"));
      li.classList.add("active");
      section.classList.add("active");
    });
  });

  // Toggle menu button
  const alertBtn = document.getElementById("alertButton");
  const menu = document.getElementById("menuContainer");
  alertBtn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});
