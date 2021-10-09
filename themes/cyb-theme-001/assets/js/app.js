// @todo jquery
// import 'jquery/dist/jquery';

// import * as $ from 'jquery';
import * as jQuery from 'jquery';
const $ = jQuery;

import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap';
import './fontAwesome.js';

import {Page} from './page.js';
import {Navigation} from './navigation.js';
import {DarkMode} from './dark-mode.js';

window.$ = $;
window.jQuery = jQuery;

// @todo jquery
// import {jQuery} from 'jquery/dist/jquery';
// import 'jquery/dist/jquery';
// console.log('xx', window.jQuery);
// console.log(jQuery, jQuery.version());

// @todo jquery
// export default function() {
//     console.log(jQuery, jQuery.version());
//     window.jQuery = jQuery
//     window.$ = jQuery;
    // window.jQuery.noConflict(false);
    // window.$.noConflict(false);
// }

const page = new Page();
const navigation = new Navigation();
const darkMode = new DarkMode();
