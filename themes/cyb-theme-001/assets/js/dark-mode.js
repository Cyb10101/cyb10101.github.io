class DarkMode {
    constructor() {
        let instance = this;
        this.toogler = document.getElementById('dark-mode-toggle');
        this.tooglerIcon = this.toogler.querySelector('i');
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        if (localStorage.getItem('palette')) {
            instance.setTheme(localStorage.getItem('palette'));
        } else if (darkModeMediaQuery.matches) {
            instance.setTheme('dark');
        }

        this.toogler.addEventListener('click', (event) => {
            event.preventDefault();
            instance.setTheme(document.body.classList.contains('palette-dark') ? '' : 'dark');
        });

        darkModeMediaQuery.addEventListener('change', (event) => {
            instance.setTheme(event.matches ? 'dark' : '');
        });
    }

    isDark() {
        return document.body.classList.contains('palette-dark');
    }

    setTheme(theme) {
        document.body.classList.remove('palette-dark');
        if (theme) {
            document.body.classList.add('palette-' + theme);
            localStorage.setItem('palette', theme);
        } else {
            localStorage.removeItem('palette');
        }

        this.changeTooglerIcon();
    }

    changeTooglerIcon() {
        if (this.isDark()) {
            this.tooglerIcon.classList.add('fa-sun');
            this.tooglerIcon.classList.remove('fa-moon');
        } else {
            this.tooglerIcon.classList.remove('fa-sun');
            this.tooglerIcon.classList.add('fa-moon');
        }
    }
}
module.exports = {DarkMode};
