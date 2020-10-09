<template>
    <div class="profile">
        <div class="heading">
            <main-header />
        </div>

        <v-container>
            <v-layout row v-if="loading" class="my-4">
                <v-row justify="center">
                    <v-progress-circular
                    indeterminate
                    color="red darken-1"
                    :width="7"
                    :size="70"
                    ></v-progress-circular>
                </v-row>
            </v-layout>
            <v-layout row wrap v-else>
                <v-flex xs12>
                    <v-card>
                        <v-card-title>
                            <h6 class="red--text text--darken-1">{{ meetup.title }}</h6>
                            <template v-if="userIsCreator">
                                <v-spacer></v-spacer>
                                <app-edit-dialog
                                :meetup="meetup"></app-edit-dialog>
                            </template>
                        </v-card-title>
                        <v-img height="330px" :src="meetup.imageUrl"></v-img>
                        <v-card-text>
                            <div class="info--text">
                                {{ meetup.date }} - {{ meetup.location }}
                                <div>
                                    <app-date-dialog :meetup="meetup"  v-if="userIsCreator" />
                                    <app-time-dialog :meetup="meetup" v-if="userIsCreator"/>
                                </div>
                            </div>
                            <div class="subtitle-1">{{ meetup.description }}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"/>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import Header from '@/components/header'

export default {
    components: {
        'main-header': Header
    },
    props: ['id'],
    computed: {
        meetup() {
            return this.$store.getters.loadedMeetup(this.id)
        },
        userIsAuthenticated() {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator() {
            if(!this.userIsAuthenticated) {
                return false
            }
            return this.$store.getters.user.id === this.meetup.creatorId
        },
        loading() {
            return this.$store.getters.loading
        }
    }
}
</script>

<style scoped>

</style>