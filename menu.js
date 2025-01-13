document.addEventListener('DOMContentLoaded', () => {
    const alertButton = document.getElementById("alertButton");
    const menuContainer = document.getElementById("menuContainer");
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentSections = document.querySelectorAll('.category-content');

    // Toggle menu visibility when the alertButton is clicked
    if (alertButton) {
        alertButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent event from bubbling up to the document
            menuContainer.classList.toggle('hidden');
        });
    }

    // Close menu when clicking outside of it
    document.addEventListener("click", (event) => {
        if (menuContainer && !menuContainer.classList.contains('hidden')) {
            const isClickInside = menuContainer.contains(event.target) || alertButton.contains(event.target);
            if (!isClickInside) {
                menuContainer.classList.add('hidden');
            }
        }
    });

    // Prevent clicks inside the menu from closing it
    menuContainer.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Add click functionality to sidebar items
    sidebarItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior

            // Get the category associated with the clicked item
            const category = item.getAttribute('data-category');

            // Hide all sections
            contentSections.forEach(section => section.classList.remove('active'));

            // Show the corresponding section
            const activeSection = document.getElementById(category);
            if (activeSection) {
                activeSection.classList.add('active');
            }

            // Close the menu after selection
            menuContainer.classList.add('hidden');
        });
    });
});