<template>
    <h2 v-if="getFilledAssignmentsList.length" class="assignments__title title">{{ title }}</h2>
    <div class="assignments__content">
        <div v-if="getFilledAssignmentsList.length" class="assignments__list-header">
            <h6 class="small-title">Шофер</h6>
            ---
            <h6 class="small-title">Автобус</h6>
        </div>
        <ul class="assignments__list">
            <li
                v-for="assignment in getFilledAssignmentsList"
                :key="assignment.id"
                class="assignments__item item-assignments"
            >
                <div class="item-assignments__info">
                    <h5 class="small-title">{{ assignment.driverName }}</h5>
                    <h5 class="small-title">{{ assignment.busNumber }}</h5>
                </div>
                <div class="item-assignments__action">
                    <button class="item-assignments__button" @click="deleteAssignment(assignment.id)">
                        <font-awesome-icon :icon="['far', 'trash-can']" />
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AssignmentsList',

    props: {
        title: {
            type: String,
            required: true,
        },
    },

    computed: {
        ...mapGetters('assignments', ['getAssignmentsList', 'getFilledAssignmentsList']),
    },

    created() {
        this.loadAssignmentsList()
    },

    methods: {
        ...mapActions('assignments', ['deleteAssignment', 'loadAssignmentsList']),
    },
}
</script>

<style lang="scss" scoped>
</style>