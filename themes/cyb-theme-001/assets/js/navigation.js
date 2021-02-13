// @todo jquery
// import * as $ from 'jquery';
// import * as jQuery from 'jquery';
// const $ = jQuery;

import browser from "js/vendor/browser";
import breakpoints from "js/vendor/breakpoints";

class Navigation {
    constructor() {
        this.head = document.getElementsByTagName('head')[0];
        this.body = document.getElementsByTagName('body')[0];
        this.headerIcons = document.querySelector('#header .icons');

        this.breakPoints = breakpoints;
        this.breakPoints({
            xlarge: ['1200px', '1200px'],
            large: ['992px', '992px'],
            medium: ['768px', '768px'],
            small: ['576px', '576px'],
        });

        this.navigation();
    }

    showSidebar(visible) {
        this.headerIcons.style.display = this.breakPoints.active('>large') || visible ? 'block' : 'none';
        if (visible) {
            this.sidebar.classList.add('inactive');
        } else {
            this.sidebar.classList.remove('inactive');
        }
    }

    navigation() {
        let instance = this;
        this.sidebar = document.getElementById('sidebar');
        this.sidebarInner = this.sidebar.querySelector('.inner');

        // Inactive by default on <= large.
        this.breakPoints.on('<=large', function () {
            instance.sidebar.classList.add('inactive');
        });

        this.breakPoints.on('>large', function () {
            instance.sidebar.classList.remove('inactive');
        });

        // Hack: Workaround for Chrome/Android scrollbar position bug.
        if (browser.os === 'android' && browser.name === 'chrome') {
            $('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>').appendTo($(this.head));
        }

        let toggle = document.createElement("a");
        toggle.href = '#sidebar';
        toggle.classList.add('toggle');
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        toggle.title = 'Toggle';
        this.sidebar.appendChild(toggle);

        toggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            instance.showSidebar(!instance.sidebar.classList.contains('inactive'));
        });

        // On link click, fancy close an load
        this.sidebarInner.querySelectorAll('a').forEach(link => {
            if (!link.href || link.href === '#' || link.dataset.toggle && link.dataset.toggle === 'collapse') {
                return;
            }

            link.addEventListener('click', function(event) {
                if (instance.breakPoints.active('>large')) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();

                instance.sidebar.classList.add('inactive');

                setTimeout(function () {
                    if (link.target && link.target === '_blank') {
                        window.open(link.href);
                    } else {
                        window.location.href = link.href;
                    }
                }, 500);
            });
        });

        // Prevent certain events inside the panel from bubbling.
        // this.sidebar.on('click touchend touchstart touchmove', function (event) {
        /*this.addEventListenerMulti(this.body, 'click touchend touchstart touchmove', function (event) {
            if (instance.breakPoints.active('>large')) {
                return;
            }
            event.stopPropagation();
        });*/

        // Hide panel on body click/tap.
        // this.body.on('click touchend', function (event) {
        this.addEventListenerMulti(this.body, 'click touchend', function (event) {
            if (instance.breakPoints.active('>large')) {
                return;
            }
            if (event.target.closest("#sidebar")) {
                return; // Exclude clicks on sidebar
            }
            instance.sidebar.classList.add('inactive');
        });

        // Scroll lock.
        // Note: If you do anything to change the height of the sidebar's content, be sure to
        // trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.
        // $window.on('load.sidebar-lock', function () {
        window.addEventListener('load.sidebar-lock', function(event) {
            var sh, wh, st;

            // Reset scroll position to 0 if it's 1.
            if ($(window).scrollTop() === 1) {
                $(window).scrollTop(0);
            }

            // $window.on('scroll.sidebar-lock', function () {
            window.addEventListener('scroll.sidebar-lock', function(event) {
                var x, y;

                if (instance.breakPoints.active('<=large')) {
                    $(instance.sidebarInner).data('locked', 0).css('position', '').css('top', '');
                    return;
                }

                // Calculate positions.
                x = Math.max(sh - wh, 0);
                y = Math.max(0, $(window).scrollTop() - x);

                // Lock/unlock.
                if ($(instance.sidebarInner).data('locked') === 1) {
                    if (y <= 0) {
                        $(instance.sidebarInner).data('locked', 0).css('position', '').css('top', '');
                    } else {
                        $(instance.sidebarInner).css('top', -1 * x);
                    }
                } else {
                    if (y > 0) {
                        $(instance.sidebarInner).data('locked', 1).css('position', 'fixed').css('top', -1 * x);
                    }
                }
            });
        // .on('resize.sidebar-lock', function () {
            window.addEventListener('resize.sidebar-lock', function(event) {
                // Calculate heights.
                wh = $(window).height();
                sh = $(instance.sidebarInner).outerHeight() + 30;

                // Trigger scroll.
                // $(window).trigger('scroll.sidebar-lock');
                window.dispatchEvent(new CustomEvent('scroll.sidebar-lock'));
            }).trigger('resize.sidebar-lock');
        });
    }

    addEventListenerMulti(element, types, fn) {
        types.split(' ').forEach(type => element.addEventListener(type, fn, false));
    }
}
module.exports = {Navigation};
