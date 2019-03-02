import Vue from 'vue';
import VueRouter from 'vue-router';

import './index.less';

import Index from './index.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/',
        component: Index,
    }],
});

new Vue({
    router,
}).$mount('#app');
