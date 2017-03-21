/**
 * Main page scripts.
 *
 * @module Main
 */

/** Import utils */
import { Resp } from 'js/modules/dev/helpers';

/** Class representing a website's Main page functions. Initialized only on web site's main page. */
export default class Main {

  static test = () => {
    console.log('isTouch: ', Resp.isTouch);
    console.log('isDesk: ', Resp.isDesk);
    console.log('isTablet: ', Resp.isTablet);
    console.log('isMobile: ', Resp.isMobile);
  };

  /**
   * Initialize Main page scripts.
   *
   * @static
   */
  static init() {
    this.test();
  }
}
