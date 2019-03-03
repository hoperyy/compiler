import Vue from 'vue';
import VueRouter from 'vue-router';

import './reset.less';
import './index.less';

$$_IMPORT_$$

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [$$_ROUTES_$$],
});

new Vue({
    router,
}).$mount('#app');
