<template>
    <main-master-page class="container">
        <div class="drivers">
            <h2 class="drivers__title title">Водії</h2>
            <div class="drivers__body">
                <drivers-filter />
                <drivers-list />
            </div>
        </div>
        <!-- </template> -->
    </main-master-page>
</template>

<script>
import { mapGetters } from 'vuex'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import DriversList from '@/components/DriversList.vue'
import DriversFilter from '@/components/DriversFilter.vue'

export default {
    name: 'DriversView',

    components: {
        MainMasterPage,
        DriversList,
        DriversFilter,
    },

    computed: {
        ...mapGetters('drivers', ['isLoading', 'hasError']),
    },
}
</script>

<style lang="scss" scoped>
</style>