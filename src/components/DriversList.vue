<template>
    <div v-if="isLoading">Loading ....</div>
    <div v-else-if="hasError">Error</div>
    <template v-else>
        <div class="drivers__content">
            <div class="drivers__list-header">
                <h6 class="small-title">ПІБ</h6>
                <h6 class="small-title">Стаж</h6>
            </div>
            <ul class="drivers__list">
                <li v-for="driver in getFilteredDriversList" :key="driver.id" class="drivers__item item-drive">
                    <div class="item-drive__info">
                        <h5 class="item-drive__name">{{ driver.name }}</h5>
                        <h5 class="item-drive__exp">{{ driver.experience }}</h5>
                    </div>
                    <div class="item-drive__actions">
                        <button class="item-drive__button" @click="onEdit(driver.id)">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                        </button>
                        <button class="item-drive__button" @click="deleteDriver(driver.id)">
                            <font-awesome-icon :icon="['far', 'trash-can']" />
                        </button>
                    </div>
                </li>
            </ul>
            <router-link :to="{ name: 'driver' }">
                <v-btn class="list-button" elevation="8">Додати водія</v-btn></router-link
            >
        </div>
    </template>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'DriversList',

    computed: {
        ...mapGetters('drivers', ['getDriversList', 'isLoading', 'hasError', 'getFilteredDriversList']),
    },

    created() {
        this.loadDriversList()
    },

    methods: {
        ...mapActions('drivers', ['deleteDriver', 'loadDriversList']),
        onEdit(id) {
            console.log(id)
            this.$router.push({
                name: 'driver',
                params: {
                    driverId: id,
                },
            })
        },
    },
}
</script>
<style scoped lang="scss">
</style>
