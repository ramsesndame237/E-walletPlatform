<template>
  <v-container fluid grid-list-xl>
    <v-dialog v-model="dialog" width="800px">
      <v-card elevation="15" class="special-scroll">
        <v-card-title>Nouvel Utilisateur</v-card-title>
        <v-container>
          <v-form class="mx-5">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field v-model="editedSolution.label" label="Solution" required></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field v-model="editedSolution.description" label="Type de besoin à couvrir"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-row v-show="editedSolution.label">
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
                Solutions à supporter
                <div class="float-right" style="position: relative; top: 35px">
                  <v-chip light class="ma-2 elevation-5 float-right white--text" color="amber darken-3" @click="dialog = !dialog">
                    <v-avatar left><v-icon small>mdi-plus</v-icon></v-avatar>
                    <span>Ajouter</span>
                  </v-chip>
                </div>
              </div>
            </v-card-text>
          </v-sheet>

          <v-card-text class="pt-0" v-if="solutions">
            <v-data-table :headers="headers" :items="solutions" :items-per-page="10" class="mb-3">
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
      editedSolution: {
        id: null,
        label: null,
        description: null
      },
      newSolution: {
        id: null,
        label: null,
        description: null
      },
      solutions: [],
      headers: [
        { text: 'Solution', value: 'label' },
        { text: 'Type de besoin à couvrir', value: 'description' },
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
      this.editedIndex = this.solutions.indexOf(item)
      this.editedSolution = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.solutions.indexOf(item)
      if (confirm('Êtes vous sûr de vouloir supprimer cette solution ?')) {
        this.solutions.splice(index, 1)
        this.saveToLocal()
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedSolution = Object.assign({}, this.newSolution)
        this.editedIndex = -1
      }, 300)
    },
    saveToLocal () {
      let data = JSON.stringify(this.solutions)
      window.localStorage.setItem('jules-app-solution', data)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.solutions[this.editedIndex], this.editedSolution)
      } else {
        this.solutions.push({
          id: Math.floor(new Date () * Math.random() * Math.floor(9)),
          label: this.editedSolution.label,
          description: this.editedSolution.description
        })
      }
      this.saveToLocal()
      this.close()
    }
  },
  mounted () {
    this.currentUser = JSON.parse(window.localStorage.getItem('jules-user-connected'))
    if (window.localStorage.getItem('jules-app-solution') !== null && window.localStorage.getItem('jules-app-solution').length > 0) { this.solutions = JSON.parse(window.localStorage.getItem('jules-app-solution')) }
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