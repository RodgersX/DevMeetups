<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
            text
            v-bind="attrs"
            v-on="on">
                Edit Date
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup Date</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider class="mb-5"></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <label for="date" class="mx-4">Edit Date:</label>
                        <input type="date" v-model="editableDate" actions>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-card-actions>
                            <v-btn 
                            depressed 
                            class="red--text darken-1"
                            @click="editDialog = false">Close</v-btn>
                            <v-btn 
                            depressed 
                            class="blue--text darken-1"
                            @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
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
            editableDate: null
        }
    },
    methods: {
        onSaveChanges() {
            const newDate = new Date(this.meetup.date)
            const newDay = new Date(this.editableDate).getUTCDate()
            const newMonth = new Date(this.editableDate).getUTCMonth()
            const newYear = new Date(this.editableDate).getUTCFullYear()
            newDate.setUTCDate(newDay)
            newDate.setUTCMonth(newMonth)
            newDate.setUTCFullYear(newYear)
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                date: newDate
            })
        },
        created() {
            this.editableDate = new Date(this.meetup.Date)
        }
    }
}
</script>