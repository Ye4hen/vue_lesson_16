<template>
    <main-master-page>
        <div class="home">Вітаємо Вас на сторінці автопарку</div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
// @ is an alias to /src

export default {
    name: 'HomeView',
    components: {
        MainMasterPage,
    },
}
</script>

<style lang="scss" scoped>
.home {
    text-align: center;
}
</style>
