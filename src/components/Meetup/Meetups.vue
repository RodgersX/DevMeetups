<template>
    <div class="Meetups">
        <div class="heading">
            <main-header />
        </div>

        <v-container>
            <v-layout
            row 
            wrap 
            v-for="meetup in meetups" 
            :key="meetup.id"
            class="mb-3">
                <v-flex xs12 sm10 md8 offset-sm1 offser-md2>
                    <v-card
                    class="info pl-3 mx-4"
                    >
                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs5 sm4 md3>
                                    <v-img height="130px" :src="meetup.imageUrl"> </v-img>
                                </v-flex>
                                <v-flex xs7 sm8 md9>
                                    <v-card-title primary-title>
                                        <div>
                                            <h5 class="white--text">{{ meetup.title }}</h5>
                                            <div>{{ meetup.date }}</div>  
                                        </div>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-btn text :to="'/meetups/' + meetup.id">
                                            <v-icon left>mdi-arrow-right</v-icon>
                                            View Meetup
                                        </v-btn>
                                    </v-card-actions>
                                </v-flex>
                            </v-layout>
                        </v-container>
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

    computed: {
        meetups() {
            return this.$store.getters.loadedMeetups
        }
    }
}
</script>

<style scoped>

</style>