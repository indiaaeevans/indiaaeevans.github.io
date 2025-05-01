// Handle viewport height changes
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Only update on actual resize events, not address bar show/hide
let resizeTimeout;
window.addEventListener('resize', () => {
    // Clear the timeout if it exists
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    
    // Set a timeout to only update after scrolling has stopped
    resizeTimeout = setTimeout(() => {
        // Only update if the width changed (real resize) or if it's a significant height change
        const newVh = window.innerHeight * 0.01;
        const widthChanged = window.innerWidth !== document.documentElement.clientWidth;
        const heightChangedSignificantly = Math.abs(newVh - vh) > 1;
        
        if (widthChanged || heightChangedSignificantly) {
            vh = newVh;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
    }, 150); // Wait for scrolling to stop
}); 