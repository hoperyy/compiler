<template>
    <section class="g-page">
        <b-header></b-header>
        <b-body>
            <div class="body__area-list"></div>
        </b-body>
        <b-footer></b-footer>
    </section>
</template>

<script>
import Header from '$$_SRCDIR_$$/common/layout/header.vue';
import Body from '$$_SRCDIR_$$/common/layout/body.vue';
import Footer from '$$_SRCDIR_$$/common/layout/footer.vue';

export default {
    components: {
        'b-header': Header,
        'b-body': Body,
        'b-footer': Footer
    },
};
</script>

<style lang="less">

</style>


