<template>
    <div class="container">
        <nav>
            <router-link to="/">Головна сторінка</router-link> |
            <router-link :to="{ name: 'drivers' }">Водії</router-link> |
            <router-link :to="{ name: 'buses' }">Автобуси</router-link> |
            <router-link :to="{ name: 'assignments' }">Призначення</router-link>
        </nav>
        <slot></slot>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'MainMasterPage',

    created() {
        this.loadBusesList()
        this.loadDriversList()
        this.loadAssignmentsList()
    },

    methods: {
        ...mapActions('buses', ['loadBusesList']),
        ...mapActions('drivers', ['loadDriversList']),
        ...mapActions('assignments', ['loadAssignmentsList', 'deleteAssignment']),
    },
}
</script>

<style lang="scss" scoped>
</style>