
/**
 * This file is created by "npm run build:example-route"
*/

import Index from './index.vue'
import Button from './example-list/Button.vue'

export default {
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/quickstart',
            redirect: '/'
        },
        
    {
        path: '/button',
        name: 'Button',
        component: Button
    },
    ]
}