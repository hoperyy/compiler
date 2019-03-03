<template>
    <section>
        <b-header></b-header>
        <b-body :mdContent="mdContent"></b-body>
        <b-footer></b-footer>
    </section>
</template>

<script>
$$_IMPORT_$$

import Header from '$$_DOCS_PAGE_PATH_$$/components/header.vue';
import Body from '$$_DOCS_PAGE_PATH_$$/components/body.vue';
import Footer from '$$_DOCS_PAGE_PATH_$$/components/footer.vue';

import hljs from '$$_DOCS_PAGE_PATH_$$/highlightjs';
import '$$_DOCS_PAGE_PATH_$$/highlightjs/styles/Railscasts.css';

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
        console.log('~~~', MD);
        this.mdContent = MD;
        this.$nextTick(() => {
            document.querySelectorAll('pre code').forEach(e => { hljs.highlightBlock(e) });
        });
    },
};
</script>

