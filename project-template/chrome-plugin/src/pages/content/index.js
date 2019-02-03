

// content script 无法获取页面的 window 等对象，但可以共享 DOM
import $ from 'jquery';
import config from '../../common/config';

const localStorageStateName = `${config.pluginName}-local-storage`;

// 监听 popup 发来的信息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (!request) {
        return;
    }

    if (request.action === `${config.pluginName}-get-state`) {
        sendResponse({ state: window.localStorage.getItem(localStorageStateName) });
    }
    
    if (request.action === `${config.pluginName}-set-state`) {
        // 同步到 localStorage
        window.localStorage.setItem(localStorageStateName, request.targetState);
        sendResponse({ msg: 'success' });
    }
});

const currentState = window.localStorage.getItem(localStorageStateName);

if (currentState == 'on') {
    // $('body').css('background', 'green');
    const $button = $('#su');
    const $input = $('#kw');

    if ($input.length) {
        // 创建一个浮层
        // const $inputLayer = $(`<input id="lyy" />`);
        // const css = {
        //     position: 'fixed',
        //     left: $input.offset().left,
        //     top: $input.offset().top,
        //     height: $input.height(),
        //     width: $input.width(),
        //     background: '#fff',
        //     border: '0',
        //     'z-index': 10000
        // };
        // $inputLayer.css(css);
        // $inputLayer.appendTo('body');

        // // 初始化浮层的值
        // $inputLayer.val($input.val());

        // $inputLayer.on('change', () => {
        //     let val = $inputLayer.val();
        //     if (val && val.indexOf(' -baijiahao') === -1) {
        //         val += ' -baijiahao';
        //     }
        //     $input.val(val);
        // });

        $button.on('click', () => {
            let val = $input.val();
            if (val && val.indexOf(' -baijiahao') === -1) {
                val += ' -baijiahao';
            }
            $input.val(val);
        });
    }
}
