document.addEventListener('DOMContentLoaded', () => {
    function checkColorContrast() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            try {
                const style = window.getComputedStyle(el);
                const bgColor = style.backgroundColor;
                const textColor = style.color;
                
                // Basic contrast check (you might want to implement a more sophisticated algorithm)
                const contrastRatio = calculateContrastRatio(bgColor, textColor);
                
                if (contrastRatio < 4.5) {
                    console.warn('Low color contrast', el, `Contrast Ratio: ${contrastRatio}`);
                }
            } catch (error) {
                console.error('Error checking contrast', error);
            }
        });
    }

    function calculateContrastRatio(bg, text) {
        // Implement a basic contrast ratio calculation
        // This is a placeholder and should be replaced with a proper algorithm
        return 5; // Example return
    }

    // Run contrast check
    checkColorContrast();
});