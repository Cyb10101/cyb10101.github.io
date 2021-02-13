class Page {
    constructor() {
        this.head = document.getElementsByTagName('head')[0];
        this.body = document.getElementsByTagName('body')[0];
        this.preloadEvent();
        this.resizeEvent();
    }

    preloadEvent() {
        let instance = this;
        window.addEventListener('load', function(event) {
            window.setTimeout(function () {
                instance.body.classList.remove('is-preload');
            }, 100);
        });
    }

    resizeEvent() {
        let instance = this;
        let resizeTimeout;
        window.addEventListener('resize', function(event) {
            // Mark as resizing.
            instance.body.classList.add('is-resizing');

            // Unmark after delay.
            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(function () {
                instance.body.classList.remove('is-resizing');
            }, 100);
        });
    }
}
module.exports = {Page};
