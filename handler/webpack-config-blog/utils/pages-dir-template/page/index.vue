<template>
    <div>
        <div v-html="mdContent"></div>
    </div>
</template>


<script>
$$_IMPORT_$$

import hljs from '$$_SRCDIR_$$/common/highlightjs';
import '$$_SRCDIR_$$/common/highlightjs/styles/Railscasts.css';

export default {
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

<style lang="less">
</style>
