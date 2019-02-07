
<template>
<div class="index-container">
    <wd-header title="WDUI Components"></wd-header>
    <wd-cell :title="item" :to="`#/${item.toLowerCase()}`" v-for="item in components" :key="item"></wd-cell>
</div>
</template>

<script>
// This file is created by "npm run build:example-route"
export default {
    data() {
        return {
            components: [
                
        'Button',
            ]
        }
    }
}
</script>

<style lang="sass">
body {
    font-family: Arial, "Microsoft YaHei";

    .iconfont.icon-zuosanjiao {
        font-size: 36px;
        // color: #fff;
        color: #000;
    }
}
</style>