<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
            icon
            v-bind="attrs"
            v-on="on">
                Edit Time
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup Time</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider class="mb-5"></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
                            <template>
                                <v-btn
                                class="red--text darken-1"
                                depressed
                                @click.native="editDialog = false">Close</v-btn>
                                <v-btn
                                class="blue--text darken-1"
                                depressed
                                @click.native="onSaveChanges">Save</v-btn>
                            </template>
                        </v-time-picker>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['meetup'],
    data() {
        return {
            editDialog: false,
            editableTime: null
        }
    },
    methods: {
        onSaveChanges() {
            const newDate = new Date(this.meetup.date)
            const hours = this.editableTime.match(/^(\d+)/)[1]
            const minutes = this.editableTime.match(/:(\d+)/)[1]
            newDate.setHours(hours)
            newDate.setMinutes(minutes)
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                date: newDate
            })
        },
        created() {
            this.editableTime = new Date(this.meetup.date).toTimeString()
        }
    }
}
</script>