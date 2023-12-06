<template>
    <div v-if="isLoading">Loading ....</div>
    <div v-else-if="hasError">Error</div>
    <template v-else>
        <div class="buses__content drivers__content">
            <div class="buses__list-header drivers__list-header">
                <h6 class="small-title">Номер</h6>
                <h6 class="small-title">Кількість місць</h6>
            </div>
            <ul class="buses__list drivers__list">
                <li v-for="bus in getBusesList" :key="bus.id" class="buses__item item-drive">
                    <div class="item-drive__info">
                        <h5 class="item-drive__name">{{ bus.number }}</h5>
                        <h5 class="item-drive__exp">{{ bus.placesAmount }}</h5>
                    </div>
                    <div class="item-drive__actions">
                        <button class="item-drive__button" @click="onEdit(bus.id)">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                        </button>
                        <button class="item-drive__button" @click="deleteBus(bus.id)">
                            <font-awesome-icon :icon="['far', 'trash-can']" />
                        </button>
                    </div>
                </li>
            </ul>
            <router-link :to="{ name: 'bus' }">
                <v-btn class="list-button" elevation="8">Додати автобус</v-btn></router-link
            >
        </div>
    </template>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'BusesList',

    computed: {
        ...mapGetters('buses', ['getBusesList', 'isLoading', 'hasError']),
    },

    methods: {
        ...mapActions('buses', ['deleteBus']),

        onEdit(id) {
            console.log(id)
            this.$router.push({
                name: 'bus',
                params: {
                    busId: id,
                },
            })
        },
    },
}
</script>
<style scoped lang="scss">
</style>
