<template>
    <div>
        <div class="demo-title">demo</div>
        <ul class="demo-list">
            <li @click="changeState">
                <span :class="{ state: true, active: active }"></span>
            </li>
        </ul>
        <div class="feedback">
            <a href="https://github.com/hoperyy" target="_blank">contact mantainer</a>
        </div>
    </div>
</template>

<script>
import config from '../../common/config';

export default {
    data() {
        return {
            active: false
        }
    },
    methods: {
        changeState() {
            const shouldOpen = !this.active;
            this.active = shouldOpen;

            // 同步到 localstorage
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

                chrome.tabs.sendMessage(tabs[0].id, {
                    action: `${config.pluginName}-set-state`,
                    targetState: shouldOpen ? 'on' : 'off'
                }, (response) => {});
            });
        },
        initState() {
            const that = this;
            chrome.tabs.query(
                { 
                    active: true, 
                    currentWindow: true 
                },
                (tabs) => {
                    chrome.tabs.sendMessage(
                        tabs[0].id, 
                        { action: `${config.pluginName}-get-state` }, 
                        (response) => {
                            if (!response) {
                                return;
                            }

                            that.active = response.state === 'on';
                        });
                }
            );
        }
    },
    mounted() {
        this.initState();
    }
}
</script>

