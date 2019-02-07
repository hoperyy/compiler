
<template>
    <div :class="`${component}-container markdown`" v-html="content"></div>
</template>

<script>
/*global hljs*/
import MarkdownIt from 'markdown-it'
import Button from '../../docs/zh-cn/Button.md'
import Quickstart from '../../docs/zh-cn/Quickstart.md'
import Rem from '../../docs/zh-cn/Rem.md'

import {highlightInit} from '../../util/utils.js'

const mdList = {
   ['Button'.toLowerCase()]: Button,
   ['Quickstart'.toLowerCase()]: Quickstart,
   ['Rem'.toLowerCase()]: Rem,

}

const md = new MarkdownIt({
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, str).value
        }
        return ''
    }
})

export default {
    name: 'Components',
    props: {
        component: {
        type: String
        },
    },
    data() {
        return {
        content: ''
        }
    },
    mounted() {
        this.render()
    },
    watch: {
        component() {
        this.render()
        }
    },
    methods: {
        render() {
        this.content = md.render(mdList[this.component])
        this.$nextTick(() => {
            highlightInit(hljs)
        })
        }
    }
}
</script>

<style lang="sass">
.markdown {
    h1 {
        font-size: 20px;
        line-height: 30px;
        font-weight: bold;
        color: #222;
    }

    h2 {
        margin-top: 50px;
        font-size: 16px;
        line-height: 24px;
        color: #222;
        font-weight: bold;
    }

    p {
        margin-top: 10px;
        color: #737373;

        &+p {
        margin-top: 5px;
        }
    }

    ul,ol {
        margin-top: 10px;
    }

    li {
        a {
        color: #737373;
        }
    }
}
</style>
        