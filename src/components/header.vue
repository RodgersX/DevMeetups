<template>
    <div class="heading">        
        <v-toolbar dark class="red darken-1 toolbar">
      <v-app-bar-nav-icon
      class="hidden-sm-and-up"
      @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <!-- for larger screens -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
        text 
        dark 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>{{ item.title }}
        </v-btn>
        <v-btn 
        text 
        dark
        v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>mdi-logout</v-icon>Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list>
        <v-list-item 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" @click="onLogout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
          drawer: false
        }
    },

    computed: {
      menuItems() {
        let menuItems = [
          {icon: 'mdi-home-plus', title: 'Sign Up', link: '/signup'},
          {icon: 'mdi-login', title: 'Sign In', link: '/signin'}
        ]
        if(this.userIsAuthenticated) {
          menuItems = [
            {icon: 'mdi-account-group', title: 'View Meetups', link: '/meetups'}, 
            {icon: 'mdi-plus-thick', title: 'Organize Meetup', link: '/meetup/new'},
            // {icon: 'mdi-face-profile', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated() {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
}
</script>

<style scoped>

</style>