<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
            icon
            v-bind="attrs"
            v-on="on">
                <v-icon>mdi-pencil-outline</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field 
                                name="title" 
                                label="Title" 
                                id="title"
                                v-model="editedTitle"
                                required></v-text-field>
                                <v-textarea 
                                name="description" 
                                label="Description" 
                                id="description"
                                v-model="editedDescription"
                                required></v-textarea>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn depressed class="blue--text text--darken-1" @click="editDialog =false">close</v-btn>
                            <v-btn depressed class="blue--text text--darken-1" @click="onSaveChanges">Save</v-btn>
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
            editedTitle: this.meetup.title,
            editedDescription: this.meetup.description
        }
    },
    methods: {
        onSaveChanges() {
            if(this.editedTitle.trim() == '' || this.editedDescription == '') {
                return
            }
            this.editDialog = false
            this.$store.dispatch('updateMeetupData', {
                id: this.meetup.id,
                title: this.editedTitle,
                description: this.editedDescription
            })
        }
    }
}
</script>