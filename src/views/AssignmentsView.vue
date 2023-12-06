<template>
    <main-master-page class="container">
        <assignments-list title="Призначення" />
        <assignments-selector title="Нове призначення" />
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import AssignmentsList from '@/components/AssignmentsList.vue'
import AssignmentsSelector from '@/components/AssignmentsSelector.vue'
export default {
    name: 'AssignmentsView',

    components: {
        MainMasterPage,
        AssignmentsList,
        AssignmentsSelector,
    },
}
</script>

<style lang="scss" scoped>
</style>