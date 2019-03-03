<template>
    <section>
        <b-header></b-header>
        <b-body></b-body>
        <b-footer></b-footer>
    </section>
</template>

<script>
$$_IMPORT_$$

import './reset.less';
import './index.less';

import Header from './components/header.vue';
import Body from './components/body.vue';
import Footer from './components/footer.vue';

import hljs from '$$_SRCDIR_$$/common/highlightjs';
import '$$_SRCDIR_$$/common/highlightjs/styles/Railscasts.css';

export default {
    components: {
        'b-header': Header,
        'b-body': Body,
        'b-footer': Footer
    },
    data() {
        return {
            mdContent: ''
        };
    },
    mounted() {
        this.render();  
        this.$nextTick(() => {
            document.querySelectorAll('pre code').forEach(e => { hljs.highlightBlock(e) });
        });
    },
    methods: {
      render() {
          $$_RENDER_$$
      }
    }
};
</script>

