<template>
    <div class="signup">
        <div class="heading">
            <main-header />
        </div>

        <v-container>
            <v-layout row v-if="error">
                <v-flex xs12 sm6 offset-sm3>
                    <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <form @submit.prevent="onSignup">
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                            name="email"
                                            label="Mail"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                            name="password"
                                            label="Password"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            v-model="confirmPassword"
                                            type="password"
                                            :rules="[comparePasswords]"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-btn type="submit" :disabled="loading" :loading="loading">Sign Up</v-btn>
                                        </v-flex>
                                    </v-layout>
                                </form>
                            </v-container>
                        </v-card-text>
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

    data() {
        return {
            email: '',
            password: '',
            confirmPassword: ''
        }
    },

    computed: {
        comparePasswords() {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
        user() {
            return this.$store.getters.user
        },
        error() {
            return this.$store.getters.error
        },
        loading() {
            return this.$store.getters.loading
        }
    },

    watch: {
        user(value) {
            if(value !== null && value !==undefined) {
                this.$router.push('/')
            }
        }
    },

    methods: {
        onSignup() {
            this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
        },
        onDismissed() {
            this.$store.dispatch('clearError')
        }
    }
}
</script>

<style>
  /* .custom-loader {
    animation: loader 1s;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  } */
</style>