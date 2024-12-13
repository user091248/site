document.addEventListener('mousemove', (e) => {
    const nameElement = document.getElementById('interactive-name');
    const { top, left, width, height } = nameElement.getBoundingClientRect();

    // Calculate the cursor position relative to the element
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);

    // Calculate the intensity of the light effect
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
    const intensity = Math.max(0, 1 - distance / maxDistance);

    // Set the text-shadow dynamically based on cursor position and intensity
    nameElement.style.textShadow = `
        ${x / 10}px ${y / 10}px ${10 * intensity}px rgba(255, 255, 255, ${0.8 * intensity}),
        ${x / 5}px ${y / 5}px ${20 * intensity}px rgba(255, 255, 255, ${0.6 * intensity}),
        ${x / 2}px ${y / 2}px ${30 * intensity}px rgba(255, 255, 255, ${0.4 * intensity})
    `;
});

