<template>
    <footer>
        <div class="g-full-width footer--part0">
            <div class="g-full-width__content">
                <div class="column--type0">
                    <div class="title">关于</div>
                    <div class="content">
                        <div class="desc">hoperyy，一名独立开发者。</div>
                    </div>
                </div>
                <div class="column--type1">
                    <div class="title">友情链接</div>
                    <div class="list content">
                        <a href="javascript:;" target="_blank" class="list-item">淘宝网</a>
                        <a href="javascript:;" target="_blank" class="list-item">淘宝网</a>
                    </div>
                </div>
                <div class="column--type1">
                    <div class="title">友情链接</div>
                    <div class="list content">
                        <a href="javascript:;" target="_blank" class="list-item">淘宝网</a>
                        <a href="javascript:;" target="_blank" class="list-item">淘宝网</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="g-full-width footer--part1">
            <div class="g-full-width__content">
                <div class="left">
                    © All rights reserved 2018 码力全开科技工作室 粤ICP备18102560号-1
                </div>
                <div class="right">
                    <a href="javascript:;" target="_blank" class="link-item">淘宝网</a>
                    <a href="javascript:;" target="_blank" class="link-item">淘宝网</a>
                </div>
            </div>
        </div>
    </footer>
    
</template>

<style lang="less" scoped>
.footer--part0 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    background: #000;
    color: #fff;

    .g-full-width__content {
        display: flex;
        justify-content: space-between;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
    }

    .content {
        font-size: 14px;
        color: #999;
    }

    .column--type1 {
        .list-item {
            display: block;
            color: #999;
            margin-bottom: 10px;
        }
    }
}

.footer--part1 {
    border-top: 1px solid #fff;
    background: #000;

    .g-full-width__content {
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 12px;
        padding: 10px 0;
    }

    .link-item {
        color: #fff;
    }
}
</style>
