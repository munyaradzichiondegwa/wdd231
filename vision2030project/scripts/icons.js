document.addEventListener('DOMContentLoaded', () => {
    // Custom Icon System
    class IconManager {
        constructor() {
            this.iconMap = {
                'home': '🏠',
                'overview': '📊',
                'programs': '📋',
                'sectors': '🏭',
                'news': '📰',
                'resources': '📁',
                'chart': '📈',
                'industry': '🏗️',
                'globe': '🌍',
                'sun': '☀️',
                'moon': '🌙',
                'bars': '☰',
                'download': '⬇️',
                'pdf': '📄'
            };
        }

        // Create an icon element
        createIcon(name, options = {}) {
            const icon = document.createElement('span');
            icon.className = `icon icon-${name} ${options.class || ''}`;
            icon.innerHTML = this.iconMap[name] || '❓';
            
            // Size options
            if (options.size) {
                icon.style.fontSize = `${options.size}px`;
            }

            // Color options
            if (options.color) {
                icon.style.color = options.color;
            }

            return icon;
        }

        // Replace text with icons
        replaceTextWithIcons() {
            document.querySelectorAll('[data-icon]').forEach(element => {
                const iconName = element.getAttribute('data-icon');
                const icon = this.createIcon(iconName);
                element.prepend(icon);
            });
        }

        // Animate icons
        animateIcon(iconElement, animation) {
            const animations = {
                spin: 'icon-spin',
                pulse: 'icon-pulse',
                bounce: 'icon-bounce'
            };

            if (animations[animation]) {
                iconElement.classList.add(animations[animation]);
            }
        }
    }

    // Initialize Icon Manager
    window.IconManager = new IconManager();

    // Auto-replace icons on page load
    window.IconManager.replaceTextWithIcons();
});