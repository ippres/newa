document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById("categoryCarousel");
  const outerContainer = document.getElementById("carouselOuter");

  fetch('https://dev.dibitel.com/rest/V1/category-thumbnails')
    .then(res => res.json())
    .then(data => {
      const root = data.find(c => c.id === "2");
      if (!root) return;

      const categories = root.children.map(cat => ({
        url: cat.url,
        name: cat.name,
        image: cat.thumbnail || ''
      }));

      let html = "";
      // Repeat items to allow smooth infinite-like scroll
      for (let i = 0; i < 10; i++) {
        categories.forEach(cat => {
          html += `
            <a href="${cat.url}" class="category-item">
              <div class="category-icon">
                <img src="${cat.image}" alt="${cat.name}">
              </div>
              <div class="category-label">${cat.name}</div>
            </a>`;
        });
      }

      carousel.innerHTML = html;

      setTimeout(() => {
        const middle = carousel.scrollWidth / 2 - outerContainer.offsetWidth / 2;
        outerContainer.scrollLeft = middle;
      }, 100);
    });
});
