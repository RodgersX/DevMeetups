<template>
    <div class="new-meetup">
        <div class="heading">
            <main-header />
        </div>

        <v-container>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <h4>Create a new Meetup</h4>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <form @submit.prevent="onCreateMeetup">
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <v-text-field 
                                name="title" 
                                label="Title" 
                                id="title" 
                                v-model="title"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <v-text-field
                                name="location" 
                                label="Location" 
                                id="location" 
                                v-model="location"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <v-text-field 
                                name="imageUrl" 
                                label="Image URL" 
                                id="image_url"
                                v-model="imageUrl"
                                required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <v-img :src="imageUrl" height="150"></v-img>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <v-textarea 
                                name="description" 
                                label="Description" 
                                id="description"
                                v-model="description"
                                required></v-textarea>
                            </v-flex>
                        </v-layout>
                        <!-- <v-layout row class="mb-2">
                            <v-flex xs12 sm6 offset-sm3>
                                <v-date-picker v-model="datePicked"></v-date-picker>
                                <p>{{ datePicked }}</p>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <v-time-picker v-model="time" format="24hr"></v-time-picker>
                                <p>{{ time }}</p> 
                            </v-flex>
                        </v-layout> -->
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <v-btn
                                type="submit"
                                dark 
                                class="red darken-1" 
                                :disabled="!formIsValid">Create Meetup</v-btn>
                                <!-- {{ submittableDateTime }} -->
                            </v-flex>
                        </v-layout>
                    </form>
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

    data() {
        return {
            title: '',
            location: '',
            imageUrl: '',
            description: '',
            // datePicked: new Date(),
            // time: new Date()
        }
    },
    computed: {
        formIsValid() {
            return this.title !== '' && 
                this.location !== '' && 
                this.imageUrl !== '' && 
                this.description !== ''
        },
        // submittableDateTime() {
        //     const date = new Date(this.date)
        //     if(typeof this.time === 'string') {
        //         const hours = this.time.match(/^(\d+)/)[1]
        //         const minutes = this.time.match(/:(\d+)/)[1]
        //         date.setHours(hours)
        //         date.setMinutes(minutes)
        //     } else {
        //         date.setHours(this.time.getHours())
        //         date.setMinutes(this.time.getMinutes())
        //     }
        //     return date
        // }
    },
    methods: {
        onCreateMeetup() {
            if(!this.formIsValid) {
                return 
            }
            const meetupData = {
                title: this.title,
                location: this.location,
                imageUrl: this.imageUrl,
                description: this.description,
                // date: this.submittableDateTime
            }
            this.$store.dispatch('createMeetup', meetupData)
            this.$router.push('/meetups')
        }
    }
}
</script>

<style scoped>

</style>