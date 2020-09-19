<template>
    <div class="home">
        <div class="heading">
            <main-header />
        </div>

        <v-container>
            <v-layout row wrap>
                <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                    <v-btn large router to="/meetups" class="info" dark>Explore Meetups</v-btn>
                </v-flex>
                <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                    <v-btn large router to="/meetup/new" class="info" dark>Organize Meetup</v-btn>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="mt-2">
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                        v-for="meetup in meetups"
                        :src="meetup.imageUrl"
                        :key="meetup.id">
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
import Header from '../components/header'

export default {
    components: {
        'main-header': Header
    },

    data() {
        return {
            meetups: [
                {imageUrl: 'https://photographyunfolded.com/wp-content/uploads/2018/08/twin-bridges-2400.jpg', id: 'sedtrjfyukgvj,h', title: 'Meetup in New York'},
                {imageUrl: 'https://felixwong.com/gallery/images/c/cars-in-paris-mar-2019-015.jpg', id: ',khjgfnbd', title: 'Meetup in Paris'},
                {imageUrl: 'https://pixy.org/src/42/428201.jpg', id: 'jhgfdsascvdfg', title: 'Meetup in Maldives'}
            ]
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