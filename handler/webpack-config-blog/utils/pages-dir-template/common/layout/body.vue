<template>
    <div class="g-body g-full-width">
        <div class="g-full-width__content">
            <div class="body__area-content">
                <slot></slot>
            </div>
            <div class="body__area-sidebar">
                <ul class="list">
                    <li class="list-item list-item-text">
                        <div class="title">简介</div>
                        <div class="desc">一名独立开发者</div>
                    </li>
                    <li class="list-item list-item-links">
                        <div class="title">分类</div>
                        <div>
                            <a v-for="item in links" :href="item.link" target="self" class="link-item">{{ item.type }}（{{ item.num }}）</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import filesData from '../data/index';

export default {
    props: ['mdContent'],
    data() {
        return {
            links: []
        }
    },
    mounted() {
        this.generateClassifiedData();
    },
    methods: {
        generateClassifiedData() {
            const map = {};

            filesData.allDocsAry.forEach(item => {
                if (!map[item.type]) {
                    map[item.type] = 0;
                }

                map[item.type] += 1;
            });

            const result = [];
            Object.keys(map).forEach(type => {
                result.push({
                    type,
                    num: map[type]
                });
            });

            this.links = result;
        }
    }
};
</script>

<style lang="less" scoped>
.g-body {
    flex: 1;

    .g-full-width__content {
        display: flex;
        justify-content: space-between; // margin: 0 auto;
        margin: 0 auto;
        padding: 120px 0 20px 0;
    }
}

.body__area-content {
    flex: 1;
    margin-right: 60px;
}

.body__area-sidebar {
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
    }

    .list-item-desc {
        .desc {
            margin-left: 14px;
            font-size: 14px;
        }
    }

    .list-item-links {
        .link-item {
            display: block;
            font-size: 14px;
            color: #000;
            margin-bottom: 10px;
        }
    }
}
</style>
