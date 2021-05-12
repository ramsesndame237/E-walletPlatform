<template>
  <div class="sidebar rounded-container">
    <v-list class="v-list-sidebar" ref="sidebar">
      <v-list-item-group v-model="model">
        <v-list-item v-for="(item, index) in menus" :key="index" :to="item.uri">
          <v-list-item-icon>
            <v-icon light v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="setSubMenu()">
          <v-list-item-icon>
            <v-icon light>mdi-cogs</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
              <v-list-item-title>Paramètres</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div class="sub-menu fade-in-left" transition="slide-x-transition" v-show="subMenu">
      <span class="close-sub-menu elevation-4" @click="setSubMenu()">x</span>
      <v-list dense class="inherit" rounded>
        <v-subheader class="caption">Configurations</v-subheader>
        <v-list-item-group v-model="setModel0">
          <v-list-item to="/app/localisation-settings">
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-buffer</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption">Localisation</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
        <v-subheader class="caption">Techniques</v-subheader>
        <v-list-item-group v-model="setModel1">
          <v-list-item to="/app/solution-settings">
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-buffer</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption">Solutions à supporter</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/app/poses-settings">
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-graph-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption">Types de pose</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/app/installation-settings">
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-puzzle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption">Type d'installation</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/app/obstacle-settings">
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-buffer</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption">Obstacles</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/app/equipement-settings">
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-graph-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption">Equipements</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/app/conditionnement-settings">
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-puzzle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption">Modes d'Intégration</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item to="/app/tension-settings">
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-puzzle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption">Tension</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
        </v-list-item-group>
        <v-subheader class="caption">Outils</v-subheader>
        <v-list-item-group>
          <v-menu :close-on-content-click="false" open-on-hover bottom offset-x>
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-icon class="mr-1">
                  <v-icon small>mdi-buffer</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="caption">Batteries</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list>
              <v-list-item-group v-model="setModel2">
                <v-list-item to="/app/fabricant-batteries-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-buffer</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Fabriquant</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/app/type-batteries-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-graph-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Types</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/app/capacites-batteries-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-puzzle-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Carractéristiques</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <v-menu :close-on-content-click="false" open-on-hover bottom offset-x>
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-icon class="mr-1">
                  <v-icon small>mdi-buffer</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="caption">Regulateur</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list>
              <v-list-item-group v-model="setModel2">
                <v-list-item to="/app/fabricant-regulateur-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-buffer</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Fabriquant</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/app/type-regulateur-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-graph-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Types</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/app/capacites-regulateur-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-puzzle-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Carractéristiques</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <v-menu :close-on-content-click="false" open-on-hover bottom offset-x>
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-icon class="mr-1">
                  <v-icon small>mdi-buffer</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="caption">Onduleurs</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list>
              <v-list-item-group v-model="setModel2">
                <v-list-item to="/app/fabricant-onduleurs-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-buffer</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Fabriquant</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/app/type-onduleurs-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-graph-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Types</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/app/capacites-onduleurs-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-puzzle-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Carractéristiques</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
          <v-menu :close-on-content-click="false" open-on-hover bottom offset-x>
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-icon class="mr-1">
                  <v-icon small>mdi-buffer</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="caption">Panneaux</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <v-list>
              <v-list-item-group v-model="setModel2">
                <v-list-item to="/app/fabricant-panneaux-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-buffer</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Fabriquant</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/app/type-panneaux-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-graph-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Types</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/app/capacites-panneaux-settings">
                  <v-list-item-icon class="mr-1">
                    <v-icon small>mdi-puzzle-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="caption">Carractéristiques</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-list-item-group>
        <v-subheader class="caption">Utilisateur</v-subheader>
        <v-list-item-group v-model="setModel3">
          <v-list-item to="/app/user-settings">
            <v-list-item-icon class="mr-1">
              <v-icon small>mdi-account-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="caption">Utilisateurs</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Sidebar',
  data () {
    return {
      menus: [
        { icon: 'mdi-desktop-mac-dashboard', text: 'Sites', uri: '/app/reports' }
      ],
      model: 0,
      setModel0: 0,
      setModel1: 0,
      setModel2: null,
      setModel3: 0,
      subMenu: false,
      items: [
        {
          action: 'local_activity',
          title: 'Attractions',
          items: [
            { title: 'List Item' }
          ]
        },
        {
          action: 'restaurant',
          title: 'Dining',
          active: true,
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' }
          ]
        }
      ]
    }
  },
  methods: {
    setSubMenu () {
      if (!this.subMenu) {
        this.$refs.sidebar.$el.classList.add('hide-sidebar')
      } else {
        this.$refs.sidebar.$el.classList.remove('hide-sidebar')
      }
      this.subMenu = !this.subMenu
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-menu {
  position: absolute;
  top: 0;
  left: 0px;
  background: #eee;
  width: 200px;
  height: 100%;
  z-index: 9999;

  .close-sub-menu {
    position: absolute;
    right: -15px;
    display: block;
    width: 40px;
    height: 40px;
    background: #eee;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    cursor: pointer;

    &:hover {
      background: #ddd;
      transition-duration: .3s;
      transform: scale(.9) rotate(360deg);
    }
  }
}
.inherit {
  background: inherit !important;
  margin: 0 !important;
}
.fade-in-left {
  animation : fadeInLeft .3s both;
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
