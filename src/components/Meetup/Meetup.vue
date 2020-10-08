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
                        <v-img height="130px" :src="meetup.imageUrl"></v-img>
                        <v-card-text>
                            <div class="info--text">
                                {{ meetup.date }} - {{ meetup.location }}
                                <div class="pl-7">
                                    <app-date-dialog class="mr-5" :meetup="meetup" v-if="userIsCreator" />
                                </div>
                                <div class="pl-7">
                                     <app-time-dialog class="ml-5" :meetup="meetup" v-if="userIsCreator"/>
                                </div>
                            </div>
                            
                            <div>{{ meetup.description }}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn dark class="red darken-1">Register</v-btn>
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