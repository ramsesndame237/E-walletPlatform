<template>
  <v-app>
    <TopNav />
    <v-content>
      <Sidebar />
      <div class="app-content">
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>

<script>

import TopNav from '@/containers/TopNav'
import Sidebar from '@/containers/Sidebar'

export default {
  name: 'App',
  components: { TopNav, Sidebar },
  data: () => ({
    //
  })
};
</script>

<style lang="scss" src="@/assets/scss/dashboard.scss">
