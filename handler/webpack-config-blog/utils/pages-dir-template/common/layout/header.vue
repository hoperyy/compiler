<template>
    <header class="g-full-width">
        <div class="g-full-width__content">
            <div class="left">hoperyy</div>
            <div class="right">
                <a class="link" href="javascript:;">首页</a>
                <a class="link" href="javascript:;">作品</a>
                <a class="link" href="javascript:;">关于</a>
            </div>
        </div>
    </header>
</template>


<style lang="less" scoped>
header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: #000;
    
    .g-full-width__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        color: #fff;
    }
    .right {
        display: flex;
    }
    .link {
        display: flex;
        color: #fff;
        justify-content: center;
        align-items: center;
        margin: 0 10px;
    }
}
</style>
