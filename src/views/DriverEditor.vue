<template>
    <div class="editor">
        <div v-if="isLoading">Loading ....</div>
        <div v-else-if="hasError">Error</div>
        <template v-else>
            <div class="container">
                <div class="driver-editor__item editor-item">
                    <v-text-field
                        v-model="driver.name"
                        label="ПІБ"
                        hide-details="auto"
                        @keydown="isNameValid"
                    ></v-text-field>
                </div>
                <div class="driver-editor__item editor-item">
                    <v-text-field
                        v-model="driver.experience"
                        label="Стаж"
                        hide-details="auto"
                        type="number"
                    ></v-text-field>
                </div>
                <div class="editor-actions">
                    <v-btn class="list-button" elevation="8" @click="onAction">{{ buttonActionTitle }}</v-btn>
                    <router-link :to="{ name: 'drivers' }"
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
    name: 'DriverEditor',

    data() {
        return {
            driver: {},
        }
    },

    computed: {
        ...mapGetters(['errorMessage']),
        ...mapGetters('drivers', ['getDriverById', 'isLoading', 'hasError']),
        driverId() {
            return this.$route.params.driverId
        },
        buttonActionTitle() {
            return this.driverId ? 'Зберегти' : 'Додати'
        },
    },

    created() {
        this.loadDriversList()
        this.driver = { ...this.getDriverById(this.driverId) }
        console.log(this.driver)
        this.setErrorMessage(null)
    },

    methods: {
        ...mapActions(['setErrorMessage']),
        ...mapActions('drivers', ['updateDriver', 'addDriver', 'loadDriversList']),
        isNameValid(event) {
            const keyCode = event.keyCode || event.which
            if (keyCode >= 48 && keyCode <= 57) {
                event.preventDefault()
            }
        },
        onAction() {
            if (this.driver.name && this.driver.experience) {
                this.setErrorMessage(null)
                if (!this.driverId) this.addDriver(this.driver)
                else
                    this.updateDriver({
                        itemId: this.driver.id,
                        data: this.driver,
                    })
                this.$router.push({
                    name: 'drivers',
                })
            } else this.setErrorMessage("Заповнення обох полів є обов'язковим")
        },
    },
}
</script>

<style lang="scss" scoped>
</style>