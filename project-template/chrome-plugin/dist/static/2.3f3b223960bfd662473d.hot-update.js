webpackHotUpdate(2,{

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(88);

var _jquery2 = _interopRequireDefault(_jquery);

var _config = __webpack_require__(110);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// content script 无法获取页面的 window 等对象，但可以共享 DOM
var localStorageStateName = _config2.default.pluginName + '-local-storage';

// 监听 popup 发来的信息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (!request) {
        return;
    }

    if (request.action === _config2.default.pluginName + '-get-state') {
        sendResponse({ state: window.localStorage.getItem(localStorageStateName) });
    }

    if (request.action === _config2.default.pluginName + '-set-state') {
        // 同步到 localStorage
        window.localStorage.setItem(localStorageStateName, request.targetState);
        sendResponse({ msg: 'success' });
    }
});

var currentState = window.localStorage.getItem(localStorageStateName);

if (currentState == 'on') {
    // $('body').css('background', 'green');
    var $button = (0, _jquery2.default)('#su');
    var $input = (0, _jquery2.default)('#kw');

    if ($input.length) {
        // 创建一个浮层
        var $inputLayer = (0, _jquery2.default)('<input id="lyy" />');
        var css = {
            position: 'fixed',
            left: $input.offset().left,
            top: $input.offset().top,
            height: $input.height(),
            width: $input.width(),
            background: '#fff',
            border: '0',
            'z-index': 10000
        };
        $inputLayer.css(css);
        $inputLayer.appendTo('body');

        // 初始化浮层的值
        $inputLayer.val($input.val());

        $inputLayer.on('change', function () {
            var val = $inputLayer.val();
            if (val && val.indexOf(' -baijiahao') === -1) {
                val += ' -baijiahao';
            }
            $input.val(val);
        });
    }
}

/***/ })

})