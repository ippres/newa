document.addEventListener('DOMContentLoaded', function() {
    const columnMain = document.querySelector('.column.main');

    // Check for exact layout
    const isExactLayout = columnMain && document.querySelector('.row.main-inner') && 
                          document.querySelector('.product-media-wrapper') && 
                          document.querySelector('.product-main-wrapper');

    if (isExactLayout) {
        function updateColumnWidth() {
            const screenWidth = window.innerWidth;

            if (screenWidth <= 768) {
                // Mobile
                columnMain.style.width = '100%';
            } else if (screenWidth <= 1024) {
                // Laptops
                columnMain.style.width = '90vw';
            } else {
                // Large screens
                columnMain.style.width = '80vw';
            }
        }

        // Initial call
        updateColumnWidth();

        // Update on window resize
        window.addEventListener('resize', updateColumnWidth);
    }
});