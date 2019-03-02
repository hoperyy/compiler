<template>
    <div>
        <p>{{message}}</p>
        <div v-html="mdContent"></div>
    </div>
</template>


<script>
// import HAHA from '../../../前端/a.md';

$$_IMPORT_$$

import MarkdownIt from 'markdown-it';
import hljs from 'highlightjs';

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
            message: 'Hello World',
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
        // this.mdContent = md.render(HAHA);
        $$_RENDER_$$
      }
    }
};

</script>

<style lang="less">
</style>
