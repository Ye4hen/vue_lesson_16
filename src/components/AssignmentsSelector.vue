<template>
    <div v-if="isLoading">Loading ....</div>
    <div v-else-if="hasError">Error</div>
    <div class="assignments-selector">
        <h3 class="assignments-selector__title title">{{ title }}</h3>
        <div class="assignments-selector__selectors">
            <div class="assignments-selector__item item-selector">
                <v-select
                    v-model="assignment.driverId"
                    label="Шофер"
                    :items="getDriversList"
                    item-title="name"
                    item-value="id"
                >
                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :subtitle="item.raw.experience" :value="item.raw.id"></v-list-item>
                    </template>
                </v-select>
            </div>
            <div class="assignments-selector__item item-selector">
                <v-select
                    v-model="assignment.busId"
                    label="Автобус"
                    :items="getBusesList"
                    item-title="number"
                    item-value="id"
                >
                    <template v-slot:item="{ props, item }">
                        <v-list-item
                            v-bind="props"
                            :subtitle="item.raw.placesAmount"
                            :value="item.raw.id"
                        ></v-list-item>
                    </template>
                </v-select>
            </div>
        </div>
        <div v-if="errorMessage" class="err-msg">{{ errorMessage }}</div>
        <v-btn class="assignments-selector__button" elevation="8" size="large" rounded="lg" @click="onAdd"
            >Додати призначення</v-btn
        >
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AssignmentsSelector',

    data() {
        return {
            assignment: {},
        }
    },

    props: {
        title: {
            type: String,
            required: true,
        },
    },

    computed: {
        ...mapGetters('drivers', ['getDriversList']),
        ...mapGetters('buses', ['getBusesList']),
        ...mapGetters('assignments', ['isLoading', 'hasError']),
        ...mapGetters(['errorMessage']),
    },

    methods: {
        ...mapActions('assignments', ['addAssignment']),
        ...mapActions(['setErrorMessage']),
        onAdd() {
            if (this.assignment.busId && this.assignment.driverId) {
                this.addAssignment(this.assignment)
                this.assignment = {}
                this.setErrorMessage(null)
            } else {
                this.setErrorMessage('Виберіть водія та автобус')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
</style>