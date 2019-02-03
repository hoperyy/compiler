/**
 * @author 刘远洋
 * @class 工具类
 */
import $ from 'jquery';

export default {
  addCss(href, id) {
    $(`<link href="${chrome.extension.getURL(href)}" ${id ? 'id="' + id + '"' : ''} rel="stylesheet" type="text/css" />`).appendTo('head');
  },
  addJs(src, id) {
    $(`<script src="${chrome.extension.getURL(src)}" ${id ? 'id="' + id + '"' : ''}></script>`).appendTo('body');
  },
  removeDomById(id) {
    $(document).find(`#${id}`).remove();
  },
  isSupportLocalStorage() {
    try {
      window.localStorage.setItem('ChromePluginDemo_testLs', '1');
      window.localStorage.getItem('ChromePluginDemo_testLs');
      window.localStorage.removeItem('ChromePluginDemo_testLs');
      return true;
    }
    catch (err) {
      return false;
    }
  }
};
