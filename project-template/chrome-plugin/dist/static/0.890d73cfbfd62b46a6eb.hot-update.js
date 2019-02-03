webpackHotUpdate(0,{

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(110);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            active: false
        };
    },

    methods: {
        changeState: function changeState() {
            var shouldOpen = !this.active;
            this.active = shouldOpen;

            // 同步到 localstorage
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

                chrome.tabs.sendMessage(tabs[0].id, {
                    action: _config2.default.pluginName + '-set-state',
                    targetState: shouldOpen ? 'on' : 'off'
                }, function (response) {});
            });
        },
        initState: function initState() {
            var that = this;
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: '${config.pluginName}-get-state' }, function (response) {
                    if (!response) {
                        return;
                    }

                    that.active = response.state === 'on';
                });
            });
        }
    },
    mounted: function mounted() {
        this.initState();
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = exports['default'];

/***/ })

})