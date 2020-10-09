<template>
    <div class="home">
        <div class="heading">
            <main-header />
        </div>

        <v-container>
            <v-layout row wrap>
                <v-row justify="space-around">
                    <v-btn large router to="/meetups" class="info" dark>Explore Meetups</v-btn>
                    <v-btn large router to="/meetup/new" class="info" dark>Organize Meetup</v-btn>
                </v-row>
            </v-layout>
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
            <v-layout row wrap class="mt-2" v-if="!loading">
                <v-flex xs12>
                    <v-carousel style="cursor: pointer">
                        <v-carousel-item
                        v-for="meetup in meetups"
                        :src="meetup.imageUrl"
                        :key="meetup.id"
                        @click="onLoadMeetup(meetup.id)">
                        <div class="title">{{ meetup.title }}</div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex> 
            </v-layout>
            <v-layout row wrap justify="center">
                <v-flex xs12 class="text-xs-center">
                    <p>Join our awesome meetups!</p>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    computed: {
        meetups() {
            return this.$store.getters.featuredMeetups
        },
        loading() {
            return this.$store.getters.loading
        }
    },
    methods: {
        onLoadMeetup(id) {
            this.$router.push('/meetups/' + id)
        }
    }
}
</script>

<style scoped>
.title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.3);
    color: white;
    font-size: 2em;
    padding: 20px;
}
</style>