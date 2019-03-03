<template>
    <div class="body g-outer">
        <div class="g-inner">
            <div class="area-detail" v-html="mdContent"></div>
            <div class="area-sidebar">
                <ul class="list">
                    <li class="list-item">
                        <div class="title">简介</div>
                        <div class="desc">致力于成为一名独立开发者</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['mdContent']
};
</script>

<style lang="less" scoped>
.body {
    .g-inner {
        flex: 1;
        display: flex;
        justify-content: space-between; // margin: 0 auto;
        margin: 0 auto;
        padding: 120px 0 20px 0;
    }
}

.area-detail {
    flex: 1;
    margin-right: 60px;
    img {
        width: 100%;
        border-radius: 6px;
    }
}

.area-sidebar {
    width: 260px;
    padding-top: 60px;

    .list,
    .list-item {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .list-item {
        padding-bottom: 20px;
        .title {
            font-size: 16px;
            font-weight: bold;
            border-left: 4px solid #000;
            padding-left: 10px;
            margin-bottom: 20px;
        }
        .desc {
            margin-left: 14px;
            font-size: 14px;
        }
    }
}
</style>
