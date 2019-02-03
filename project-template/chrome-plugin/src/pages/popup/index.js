
// 每次打开插件均会执行
import Vue from 'vue';
import './index.less';
import Index from './index.vue';

const App = Vue.extend(Index);
new App().$mount('#app')
