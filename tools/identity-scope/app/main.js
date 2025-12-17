const input = document.getElementById("addressInput");
const addressFields = document.querySelectorAll("[data-bind='address']");

input.addEventListener("input", () => {
    const value = input.value.trim();

    addressFields.forEach(el => {
        el.querySelector(".mono").textContent =
            value || "same value";
    });
});

// Collapsible network cards
const cards = document.querySelectorAll('.collapsible');

cards.forEach(card => {
    const details = card.querySelector('.card-details');
    if (!details) return;

    // Start collapsed
    details.style.display = 'none';

    card.addEventListener('click', (e) => {
        // Prevent text selection issues
        e.stopPropagation();

        const isOpen = details.style.display === 'block';
        details.style.display = isOpen ? 'none' : 'block';
    });
});