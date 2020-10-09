<template>
    <v-dialog width="500px" persistent v-model="registerDialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
            depressed
            dark
            class="red darken-1"
            v-bind="attrs"
            v-on="on">
                {{ userIsRegistered ? 'Drop' : 'Register' }}
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title v-if="userIsRegistered">Drop the meetup?</v-card-title>
                        <v-card-title v-else>Register for meetup?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider class="mb-5"></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>You can always change your decision later</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-card-actions>
                            <v-btn 
                            depressed 
                            class="red--text darken-1"
                            @click="registerDialog = false">Cancel</v-btn>
                            <v-btn 
                            depressed 
                            class="green--text darken-1"
                            @click="onAgree">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['meetupId'],
    data() {
        return {
            registerDialog: false
        }
    },
    computed: {
        userIsRegistered() {
            return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                return meetupId === this.meetupId
            }) >= 0
        }
    },
    methods: {
        onAgree() {
            if(this.userIsRegistered) {
                this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
            } else {
                this.$store.dispatch('registerUserForMeetup', this.meetupId)
            }
        }
    }
}
</script>