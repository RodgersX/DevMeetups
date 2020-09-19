<template>
  <v-app class="vapp">
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        {icon: 'mdi-account-group', title: 'View Meetups', link: '/meetups'}, 
        {icon: 'mdi-plus-thick', title: 'Organize Meetup', link: '/meetup/new'},
        {icon: 'mdi-face-profile', title: 'Profile', link: '/profile'},
        {icon: 'mdi-home-plus', title: 'Sign Up', link: '/signup'},
        {icon: 'mdi-login', title: 'Sign In', link: '/signin'}
      ]
    }
  }
}
</script>

<style scoped>

</style>