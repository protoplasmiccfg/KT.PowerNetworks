// Energy meter animation
window.addEventListener('DOMContentLoaded', () => {
    const meterFill = document.getElementById('meterFill');
    let width = 0;
    const targetWidth = 100; // full width
    const speed = 20; // ms interval
    const increment = 1; // % increment

    function fillMeter() {
        if(width >= targetWidth) return;
        width += increment;
        meterFill.style.width = width + '%';
        setTimeout(fillMeter, speed);
    }

    fillMeter();
});