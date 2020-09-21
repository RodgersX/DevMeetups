<template>
    <div class="profile">
        <div class="heading">
            <main-header />
        </div>

        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card>
                        <v-card-title>
                            <h6 class="red--text text--darken-1">{{ meetup.title }}</h6>
                        </v-card-title>
                        <v-img height="130px" :src="meetup.imageUrl"></v-img>
                        <v-card-text>
                            <div class="info--text">{{ meetup.date }} - Where it takes place</div>
                            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit id soluta eius laboriosam.</div>
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
        }
    }
}
</script>

<style scoped>

</style>