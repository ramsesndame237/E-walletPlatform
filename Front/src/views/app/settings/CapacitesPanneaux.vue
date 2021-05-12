<template>
  <v-container fluid grid-list-xl>
    <v-dialog v-model="dialog" width="800px">
      <v-card elevation="15" class="special-scroll">
        <v-card-title>Carractéristiques panneau</v-card-title>
        <v-container>
          <v-form class="mx-5">
            <v-row>
              <v-col cols="12" md="12">
                <v-select v-model="editedCapacite.types" :items="types" attach chips label="Type (s)" multiple></v-select>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field v-model="editedCapacite.puissanceNominale" label="Puissance Nominale (Wc)" required></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field v-model="editedCapacite.tensionMax" label="Tension à puissance maximale (Vmpp)" required></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field v-model="editedCapacite.courantMax" label="Courant à puissance maximale (Impp)" required></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field v-model="editedCapacite.tensionVoc" label="Tension à circuit ouvert (Voc)" required></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field v-model="editedCapacite.courantIsc" label="Courant de court-circuit (Isc)" required></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="editedCapacite.largeur" label="Longueur de pose panneau (m)" required></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="editedCapacite.longueur" label="Largeur de pose panneau (m)" required></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="editedCapacite.surface" label="Surface de pose panneau (m²)"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-row v-show="editedCapacite.types">
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
                Carractéristiques de panneau enrégistrés
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
        types: null,
        puissanceNominale: null,
        tensionMax: null,
        courantMax: null,
        tensionVoc: null,
        courantIsc: null,
        longueur: null,
        largeur: null,
        surface: null
      },
      newCapacite: {
        id: null,
        types: null,
        puissanceNominale: null,
        tensionMax: null,
        courantMax: null,
        tensionVoc: null,
        courantIsc: null,
        longueur: null,
        largeur: null,
        surface: null
      },
      capacites: [],
      types: [],
      headers: [
        { text: 'Type (s) panneau', value: 'types' },
        { text: 'Puissance Nominale (Wc)', value: 'puissanceNominale' },
        { text: 'Tension max (Vmpp)', value: 'tensionMax' },
        { text: 'Courant max (Impp)', value: 'courantMax' },
        { text: 'Tension circuit ouvert (Voc)', value: 'tensionVoc' },
        { text: 'Courant court-circuit (Isc)', value: 'courantIsc' },
        { text: 'Longueur (m)', value: 'longueur' },
        { text: 'Largeur (m)', value: 'largeur' },
        { text: 'Surface (m²)', value: 'surface' },
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
      window.localStorage.setItem('jules-app-capacite-panneau', data)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.capacites[this.editedIndex], this.editedCapacite)
      } else {
        this.capacites.push({
          id: Math.floor(new Date () * Math.random() * Math.floor(9)),
          types: this.editedCapacite.types,
          puissanceNominale: this.editedCapacite.puissanceNominale,
          tensionMax: this.editedCapacite.tensionMax,
          courantMax: this.editedCapacite.courantMax,
          tensionVoc: this.editedCapacite.tensionVoc,
          courantIsc: this.editedCapacite.courantIsc,
          longueur: this.editedCapacite.longueur,
          largeur: this.editedCapacite.largeur,
          surface: this.editedCapacite.surface
        })
      }
      this.saveToLocal()
      this.close()
    }
  },
  mounted () {
    this.currentUser = JSON.parse(window.localStorage.getItem('jules-user-connected'))
    if (window.localStorage.getItem('jules-app-type-panneau') !== null && window.localStorage.getItem('jules-app-type-panneau').length > 0) {
      let type = JSON.parse(window.localStorage.getItem('jules-app-type-panneau'))
      type.forEach(fab => {
        this.types.push(fab.label)
      })
    }
    if (window.localStorage.getItem('jules-app-capacite-panneau') !== null && window.localStorage.getItem('jules-app-capacite-panneau').length > 0) { this.capacites = JSON.parse(window.localStorage.getItem('jules-app-capacite-panneau')) }
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