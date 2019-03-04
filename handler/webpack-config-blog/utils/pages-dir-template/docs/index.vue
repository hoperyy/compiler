<template>
    <section>
        <b-header></b-header>
        <b-body>
            <div class="body__area-detail" v-html="mdContent"></div>
        </b-body>
        <b-footer></b-footer>
    </section>
</template>

<script>
$$_IMPORT_$$

import hljs from '$$_SRCDIR_$$/common/docs/highlightjs';
import '$$_SRCDIR_$$/common/docs/highlightjs/styles/Railscasts.css';

import Header from '$$_SRCDIR_$$/common/layout/header.vue';
import Body from '$$_SRCDIR_$$/common/layout/body.vue';
import Footer from '$$_SRCDIR_$$/common/layout/footer.vue';

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

<style lang="less">
.body__area-detail {
    img {
        width: 100%;
        border-radius: 6px;
    }
}
</style>


