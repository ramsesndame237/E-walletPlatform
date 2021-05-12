<template>
  <v-container fluid grid-list-xl>
    <v-dialog v-model="dialog" width="800px">
      <v-card elevation="15" class="special-scroll">
        <v-card-title>Carractéristiques de l'onduleur</v-card-title>
        <v-container>
          <v-form class="mx-5">
            <v-row>
              <v-col cols="12" md="12">
                <v-select v-model="editedCapacite.types" :items="types" attach chips label="Type (s)" multiple></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field v-model="editedCapacite.capacite" label="Capacité Nominale (Ah)" required></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field v-model="editedCapacite.tension" label="Tension (V)"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-row v-show="editedCapacite.types && editedCapacite.capacite">
            <v-col cols="12">
              <v-chip light class="ma-2 elevation-5 white--text" color="amber darken-3" @click="save">
                <v-avatar left><v-icon small>mdi-telegram</v-icon></v-avatar>
                <span>Enrégistrer</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-layout wrap class="px-0">
      <v-flex sm12 xs12 md12 lg12>
        <v-card tile class="mx-auto mt-8">
          <v-sheet class="v-sheet--offset mx-auto py-3 px-3" color="amber darken-4" elevation="10" max-width="calc(100% - 32px)">
            <v-card-text class="pt-0">
              <div class="title font-weight-thin mb-0 white--text">
                Carractéristiques des onduleurs enrégistrés
                <div class="float-right" style="position: relative; top: 35px">
                  <v-chip light class="ma-2 elevation-5 float-right white--text" color="amber darken-3" @click="dialog = !dialog">
                    <v-avatar left><v-icon small>mdi-plus</v-icon></v-avatar>
                    <span>Ajouter</span>
                  </v-chip>
                </div>
              </div>
            </v-card-text>
          </v-sheet>

          <v-card-text class="pt-0" v-if="capacites">
            <v-data-table :headers="headers" :items="capacites" :items-per-page="10" class="mb-3">
              <template v-slot:item.action="{ item }">
                <v-chip style="float: right" outlined light class="ma-2 elevation-5" color="red darken-3" @click="deleteItem(item)">
                  <v-avatar left><v-icon small>mdi-delete-outline</v-icon></v-avatar>
                  <span>Supprimer</span>
                </v-chip>
                <v-chip style="float: right" outlined light class="ma-2 elevation-5" color="amber darken-3" @click="editItem(item)">
                  <v-avatar left><v-icon small>mdi-pencil-outline</v-icon></v-avatar>
                  <span>Modifier</span>
                </v-chip>
              </template>
              <template v-slot:no-data>
                <p class="dark mt-15">Aucune donnée enrégistrée pour le moment</p>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      currentUser: null,
      editedIndex: -1,
      dialog: false,
      editedCapacite: {
        id: null,
        types: [],
        capacite: null,
        tension: null
      },
      newCapacite: {
        id: null,
        types: [],
        capacite: null,
        tension: null
      },
      capacites: [],
      types: [],
      headers: [
        { text: 'Type (s) batterie', value: 'types' },
        { text: 'Capacité Nominale (Ah)', value: 'capacite' },
        { text: 'Tension (V)', value: 'tension' },
        { text: '', value: 'action', sortable: false }
      ],
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.capacites.indexOf(item)
      this.editedCapacite = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.capacites.indexOf(item)
      if (confirm('Êtes vous sûr de vouloir supprimer ?')) {
        this.capacites.splice(index, 1)
        this.saveToLocal()
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedCapacite = Object.assign({}, this.newCapacite)
        this.editedIndex = -1
      }, 300)
    },
    saveToLocal () {
      let data = JSON.stringify(this.capacites)
      window.localStorage.setItem('jules-app-capacite-batterie', data)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.capacites[this.editedIndex], this.editedCapacite)
      } else {
        this.capacites.push({
          id: Math.floor(new Date () * Math.random() * Math.floor(9)),
          types: this.editedCapacite.types,
          capacite: this.editedCapacite.capacite,
          tension: this.editedCapacite.tension
        })
      }
      this.saveToLocal()
      this.close()
    }
  },
  mounted () {
    this.currentUser = JSON.parse(window.localStorage.getItem('jules-user-connected'))
    if (window.localStorage.getItem('jules-app-type-batterie') !== null && window.localStorage.getItem('jules-app-type-batterie').length > 0) {
      let type = JSON.parse(window.localStorage.getItem('jules-app-type-batterie'))
      type.forEach(fab => {
        this.types.push(fab.label)
      })
    }
    if (window.localStorage.getItem('jules-app-capacite-batterie') !== null && window.localStorage.getItem('jules-app-capacite-batterie').length > 0) { this.capacites = JSON.parse(window.localStorage.getItem('jules-app-capacite-batterie')) }
  },
}
</script>

<style lang="scss" scoped>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
  .card-prepend {
    width: 90%;
    margin-left: 5%;

    .card-offset {
      height: 200px;
    }

    .card-content {
      position: absolute;
      top: 0;
    }
  }
</style>