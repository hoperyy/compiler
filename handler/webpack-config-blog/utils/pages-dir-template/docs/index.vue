<template>
    <section>
        <b-header></b-header>
        <b-body :mdContent="mdContent"></b-body>
        <b-footer></b-footer>
    </section>
</template>

<script>
$$_IMPORT_$$

import hljs from '$$_SRCDIR_$$/common/docs/highlightjs';
import '$$_SRCDIR_$$/common/docs/highlightjs/styles/Railscasts.css';

import Header from '$$_SRCDIR_$$/common/docs/layout-components/header.vue';
import Body from '$$_SRCDIR_$$/common/docs/layout-components/body.vue';
import Footer from '$$_SRCDIR_$$/common/docs/layout-components/footer.vue';

export default {
    components: {
        'b-header': Header,
        'b-body': Body,
        'b-footer': Footer
    },
    data() {
        return {
            mdContent: MD
        }
    },
    mounted() {
        this.$nextTick(() => {
            document.querySelectorAll('pre code').forEach(e => { hljs.highlightBlock(e) });
        });
    }
};
</script>

