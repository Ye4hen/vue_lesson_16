<template>
    <main-master-page class="container">
        <div class="buses">
            <h2 class="buses__title title">Автобуси</h2>
            <div class="buses__body">
                <buses-list />
            </div>
        </div>
        <!-- </template> -->
    </main-master-page>
</template>

<script>
import { mapGetters } from 'vuex'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import BusesList from '@/components/BusesList.vue'

export default {
    name: 'BusesView',

    components: {
        MainMasterPage,
        BusesList,
    },

    computed: {
        ...mapGetters('buses', ['isLoading', 'hasError']),
    },
}
</script>

<style lang="scss" scoped>
</style>