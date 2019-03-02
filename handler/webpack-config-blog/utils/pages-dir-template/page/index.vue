<template>
    <div>
        <div v-html="mdContent"></div>
    </div>
</template>


<script>
$$_IMPORT_$$

import hljs from '$$_SRCDIR_$$/common/highlightjs';
import '$$_SRCDIR_$$/common/highlightjs/styles/Railscasts.css';
import MarkdownIt from 'markdown-it';

function highlightInit(hljs) {
  document.querySelectorAll('pre code').forEach(e => {
    hljs.highlightBlock(e)
  })
}

const md = new MarkdownIt({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value
    }
    return '';
  }
})

export default {
    data() {
        return {
            mdContent: ''
        };
    },
    mounted() {
        this.render();  
        this.$nextTick(() => {
            highlightInit(hljs)
        })
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
