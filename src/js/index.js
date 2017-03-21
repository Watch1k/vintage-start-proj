'use strict';

/**
 * App entry point.
 *
 * @module App
 */

/** Import page controllers */
import Main from 'js/pages/main.page';

/** Import utils */
import { currentPage } from 'js/modules/dev/helpers';

/**
 * Run appropriate scripts for each page.
 **/
switch (currentPage) {
  /** Main page */
  case 'main': {
    Main.init();
    break;
  }
}
