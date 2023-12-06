<template>
    <div class="filters">
        <div class="filters__container">
            <div class="filters__list">
                <div class="filters__item item-filter">
                    <label>
                        Ім'я
                        <input v-model="filterObj.name" type="text" />
                    </label>
                    <!-- <v-text-field v-model="filterObj.name" label="Ім'я" hide-details="auto"></v-text-field> -->
                </div>
                <div class="filters__item item-filter">
                    <label>
                        Від
                        <input v-model="filterObj.expFrom" type="number" />
                    </label>
                    <!-- <v-text-field v-model="filterObj.expFrom" label="Від" hide-details="auto"></v-text-field> -->
                </div>
                <div class="filters__item item-filter">
                    <label>
                        До
                        <input v-model.lazy="filterObj.expTo" type="number" />
                    </label>
                    <!-- <v-text-field v-model.lazy="filterObj.expTo" label="До" hide-details="auto"></v-text-field> -->
                </div>
            </div>
            <div v-if="errorMessage" class="err-msg">{{ errorMessage }}</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DriversFilter',

    data() {
        return {
            filterObj: {
                name: null,
                expFrom: null,
                expTo: null,
            },
        }
    },

    computed: {
        ...mapGetters('drivers', ['errorMessage']),
    },

    watch: {
        filterObj: {
            handler(newVal) {
                this.updateFilter(newVal)
            },
            deep: true,
        },
    },

    methods: {
        ...mapActions('drivers', ['updateFilter']),
    },
}
</script>

<style lang="scss" scoped>
</style>