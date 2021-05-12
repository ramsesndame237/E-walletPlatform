<template>
  <div>
    <v-app-bar app color="#0C0C0B" dark>
      <v-app-bar-nav-icon @click.stop="setSidebar" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">E-Wallet <span class="font-style-italic caption font-weight-light"></span></span>
      </v-toolbar-title>
      <!-- <v-text-field flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Rechercher ..." class="hidden-sm-and-down"/> -->
      <v-spacer />
      <!-- <v-btn icon><v-icon>mdi-apps</v-icon></v-btn> -->
      <v-badge v-if="forNotifications.length === 0" color="warning" content="0" value="0" overlap>
        <v-menu transition="slide-y-transition" :offset-y="true" bottom>
          <template v-slot:activator="{ on }">
            <v-btn light color="white" fab x-small dark v-on="on">
              <v-icon color="#0C0C0B" x-small>mdi-bell</v-icon>
            </v-btn>
          </template>
        </v-menu>
      </v-badge>
      <v-badge v-if="forNotifications.length > 0" color="warning" :content="forNotifications.length" :value="forNotifications.length" overlap>
        <v-menu transition="slide-y-transition" :offset-y="true" bottom>
          <template v-slot:activator="{ on }">
            <v-btn light color="white" fab x-small dark v-on="on">
              <v-icon x-small color="#0C0C0B">mdi-bell</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in forNotifications" :key="i">
              <v-list-item-title v-if="souscriptions">La souscription au service <strong style="color: ff6f00">{{ item.service }}</strong> de <strong style="color: ff6f00">{{ item.fournisseur }}</strong> se termine dans <strong style="color: ff6f00">{{ item.nbrDaysRemaining }}</strong> Jour(s)</v-list-item-title>
              <v-divider class="mx-4 my-0"></v-divider>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-badge>
      <v-btn @click="toggleFullScreen" color="white" light text icon dense class="ml-2">
        <v-icon icon large>mdi-fullscreen</v-icon>
      </v-btn>
      <!-- <span>{{ currentUser.login }}</span> -->
      <div class="text-center ml-2">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-chip light class="ma-2 elevation-5" color="white" text-color="black" v-on="on">
              <v-avatar left><v-icon>mdi-account-circle</v-icon></v-avatar>
              <span>{{ username }}</span>
              <!-- {{ currentUser.login }} -->
            </v-chip>
          </template>
          <v-list class="mt-3">
            <v-list-item @click="logout">
              <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
              <v-list-item-content><v-list-item-title>Se déconnecter</v-list-item-title></v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <bpd-breadcrumb />
  </div>
</template>

<script>
export default {
  name: 'TopNav',
  data () {
    return {
      sidebarVisible: true,
      forNotifications: [],
      souscriptions: [],
      currentUser: null,
      username: '',
      baseSouscriptionUri: 'http://api.wayfoster.com/api/souscriptions/'
    }
  },
  methods: {
    setSidebar () {
      let sidebar = document.querySelector('.sidebar')

      if (this.sidebarVisible) {
        sidebar.classList.add('hide-sidebar')
        setTimeout(() => {
          sidebar.classList.add('no-width')
        }, 100);
      } else {
        sidebar.classList.remove('hide-sidebar')
        sidebar.classList.remove('no-width')
      }

      this.sidebarVisible = !this.sidebarVisible
    },
    msToDay (nbr) { return nbr / (1000 * 3600 * 24)},
    logout () {
      localStorage.removeItem('jules-user-connected')
      window.location.reload()
    },
    toggleFullScreen () {
      const isInFullScreen = this.isInFullScreen()

      var docElm = document.documentElement
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
      this.fullScreen = !isInFullScreen
    },
    isInFullScreen () {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      )
    }
  },
  mounted () {
    this.currentUser = JSON.parse(window.localStorage.getItem('jules-user-connected'))
    this.username = this.currentUser.username
  }
}
</script>