<template>
    <div class="editor">
        <div v-if="isLoading">Loading ....</div>
        <div v-else-if="hasError">Error</div>
        <template v-else>
            <div class="container">
                <div class="bus-editor__item editor-item">
                    <v-text-field v-model="bus.number" label="Номер" :rules="rules" hide-details="auto"></v-text-field>
                </div>
                <div class="bus-editor__item editor-item">
                    <v-text-field
                        v-model="bus.placesAmount"
                        label="Кількість місць"
                        :rules="rules"
                        hide-details="auto"
                        type="number"
                    ></v-text-field>
                </div>
                <div class="editor-actions">
                    <v-btn class="list-button" elevation="8" @click="onAction">{{ buttonActionTitle }}</v-btn>
                    <router-link :to="{ name: 'buses' }"
                        ><v-btn class="list-button" elevation="8">Відмінити</v-btn></router-link
                    >
                </div>
            </div>
            <div v-if="errorMessage" class="err-msg">{{ errorMessage }}</div>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'BusesEditor',

    data() {
        return {
            bus: {},
        }
    },

    computed: {
        ...mapGetters(['errorMessage']),
        ...mapGetters('buses', ['getBusById', 'isLoading', 'hasError']),
        busId() {
            return this.$route.params.busId
        },
        buttonActionTitle() {
            return this.busId ? 'Зберегти' : 'Додати'
        },
    },

    created() {
        this.loadBusesList()
        this.bus = { ...this.getBusById(this.busId) }
        console.log(this.bus)
        this.setErrorMessage(null)
    },

    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('buses', ['updateBus', 'addBus', 'loadBusesList']),
        isNameValid(event) {
            const keyCode = event.keyCode || event.which
            if (keyCode >= 48 && keyCode <= 57) {
                event.preventDefault()
            }
        },
        onAction() {
            if (this.bus.number && this.bus.placesAmount) {
                this.setErrorMessage(null)
                if (!this.busId) this.addBus(this.bus)
                else
                    this.updateBus({
                        itemId: this.bus.id,
                        data: this.bus,
                    })
                this.$router.push({
                    name: 'buses',
                })
            } else this.setErrorMessage("Заповнення обох полів є обов'язковим")
        },
    },
}
</script>

<style lang="scss" scoped>
</style>