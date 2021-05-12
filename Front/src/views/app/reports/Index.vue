<template>
  <v-container fluid grid-list-xl>
    <v-dialog v-model="dialog" width="800px">
      <v-card elevation="15" class="special-scroll">
        <v-card-title>Ajouter Site</v-card-title>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1">Enrégistrement <small>Renseigner les détails sur le site</small></v-stepper-step>
          <v-stepper-content step="1">
            <v-row class="mx-2">
              <v-col cols="12">
                <v-text-field v-model="editedSite.nom" clearable prepend-inner-icon="mdi-camera-iris" label="Nom du Client / Société" />
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedSite.adresse" clearable prepend-inner-icon="mdi-camera-control" label="Adresse / N° téléphone" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="editedSite.email" clearable prepend-inner-icon="mdi-orbit" label="E-mail"/>
              </v-col>
              <v-col cols="6">
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="editedSite.date" prepend-inner-icon="mdi-calendar" label="Date" readonly v-on="on"/>
                  </template>
                  <v-date-picker v-model="editedSite.date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedSite.pays" disabled prepend-inner-icon="mdi-orbit" label="Pays"/>
                <!-- <v-select v-model="editedSite.pays" :items="pays" clearable prepend-inner-icon="mdi-camera-control" label="Pays" /> -->
              </v-col>
              <v-row v-show="editedSite.pays">
                <v-col cols="6">
                  <v-select v-model="editedSite.ville" :items="villes" @change="setZone()" clearable prepend-inner-icon="mdi-camera-control" label="Ville" />
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="editedSite.zone" disabled prepend-inner-icon="mdi-orbit" label="Zone d'Intervention"/>
                </v-col>
              </v-row>
            </v-row>
            <v-row>
              <v-col cols="12" v-show="editedSite.nom && editedSite.date && editedSite.pays && editedSite.ville">
                <v-chip light class="ma-2 elevation-5 white--text" color="amber darken-3" @click="save">
                  <v-avatar left><v-icon small>mdi-telegram</v-icon></v-avatar>
                  <span>Enrégistrer</span>
                </v-chip>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-dialog>
    <v-layout wrap class="px-0">
      <v-flex sm12 xs12 md4 lg4>
        <v-card class="mx-auto" tile>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Nombre de sites(s)</div>
              <v-list-item-title class="display-1" style="color: #FF6F00" v-if="sites">{{ sites.length }} <small class="caption font-weight-light">Site(s)</small></v-list-item-title>
              <v-list-item-subtitle class="ml-2 caption grey--text font-weight-light">Enrégistrés ...</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="80" tile color="amber darken-3" style="border-radius: 5px" class="elevation-5">
              <v-icon dark size="40">mdi-currency-sign</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-flex>
      <v-flex sm12 xs12 md12 lg12>
        <v-card tile class="mx-auto mt-5">
          <v-sheet class="v-sheet--offset mx-auto py-3 px-3" color="amber darken-4" elevation="10" max-width="calc(100% - 32px)">
            <v-card-text class="pt-0">
              <div class="title font-weight-thin mb-0 white--text">
                Sites enrégistrés
                <div class="float-right" style="position: relative; top: 35px">
                  <v-chip light class="ma-2 elevation-5 float-right white--text" color="amber darken-3" @click="dialog = !dialog">
                    <v-avatar left><v-icon small>mdi-plus</v-icon></v-avatar>
                    <span>Ajouter</span>
                  </v-chip>
                </div>
              </div>
            </v-card-text>
          </v-sheet>

          <v-card-text class="pt-0" v-if="sites">
            <v-data-table :headers="headers" :items="sites" :items-per-page="10" class="mb-3">
              <template v-slot:item.date="{ item }">
                <span>{{ new Date(item.date).toLocaleDateString() }}</span>
              </template>
              <template v-slot:item.action="{ item }">
                <v-chip outlined light class="ma-2 elevation-5" color="amber darken-3" @click="editSite(item)">
                  <v-avatar left><v-icon small>mdi-pencil-outline</v-icon></v-avatar>
                  <span>Modifier</span>
                </v-chip>
                <v-chip outlined light class="ma-2 elevation-5" color="red darken-3" @click="deleteSite(item)">
                  <v-avatar left><v-icon small>mdi-delete-outline</v-icon></v-avatar>
                  <span>Supprimer</span>
                </v-chip>
                <v-chip outlined dark fab :to="'/app/dashboard/' + item.siteID" class="elevation-3 secondary--text" color="secondary">
                  <v-avatar left><v-icon color="red" small>>mdi-currency-sign</v-icon></v-avatar>
                  <span>Gérer</span>
                </v-chip>
              </template>
              <template v-slot:no-data>
                <p class="dark mt-5">Aucune site enrégistrée pour le moment</p>
              </template>
            </v-data-table>
              <v-chip outlined light class="ma-2 elevation-5" color="green darken-3" style="position: absolute; bottom: 15px; left: 110px" @click="printExcel()">
                <v-avatar left><v-icon small>mdi-microsoft-excel</v-icon></v-avatar>
                <span>Excel</span>
              </v-chip>
              <v-chip outlined light class="ma-2 elevation-5"  style="position: absolute; bottom: 15px" color="blue darken-3" @click="printCSV()">
                <v-avatar left><v-icon small>mdi-microsoft-windows-classic</v-icon></v-avatar>
                <span>CSV</span>
              </v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import exportFromJSON from 'export-from-json'

export default {
  data () {
    return {
      currentUser: null,
      editedIndex: -1,
      dialog: false,
      e6: 1,
      menu2: false,
      localisations: null,
      editedSite: {
        siteID: null,
        userID: null,
        geolocalisationID: null,
        nom: '',
        adresse: '',
        email: '',
        pays: 'Cameroun',
        ville: '',
        zone: '',
        date: ''
      },
      newSite: {
        siteID: null,
        userID: null,
        geolocalisationID: null,
        nom: '',
        adresse: '',
        email: '',
        pays: 'Cameroun',
        ville: '',
        zone: '',
        date: ''
      },
      sites: [],
      // pays: [],
      villes: [],
      headers: [
        { text: 'Nom Client', value: 'nom' },
        { text: 'Adresse', value: 'adresse' },
        { text: 'Email', value: 'email' },
        { text: 'Pays', value: 'pays' },
        { text: 'Ville', value: 'ville' },
        { text: 'Date', value: 'date' },
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
    printCSV () {
      const items = this.sites
      const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
      const header = Object.keys(items[0])
      let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      let link = document.createElement('a')

      csv.unshift(header.join(','))
      csv = csv.join('\r\n')

      link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)
      link.download = 'testCsv.csv'
      link.click()
    },

    printExcel () {
      const data = this.sites
      const fileName = 'textExcel'
      const exportType = exportFromJSON.types.xls

      exportFromJSON({ data, fileName, exportType })
    },

    saveToLocal () {
      let data = JSON.stringify(this.sites)
      window.localStorage.setItem('sites-' + this.currentUser.id, data)
    },

    editSite (item) {
      this.editedIndex = this.sites.indexOf(item)
      this.editedSite = Object.assign({}, item)
      this.dialog = true
    },

    deleteSite (item) {
      const index = this.sites.indexOf(item)
      if (confirm('Êtes vous sûr de vouloir supprimer cette site ?')) {
        this.sites.splice(index, 1)
        this.saveToLocal()
      }
    },

    setZone () {
      this.localisations.forEach(local => {
        if (local.region === this.editedSite.ville) {
          this.editedSite.zone = local.site
        }
      })
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedSite = Object.assign({}, this.newSite)
        this.editedIndex = -1
        this.e6 = 1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.sites[this.editedIndex], this.editedSite)
      } else {
        this.sites.push({
          siteID: Math.floor(new Date () * Math.random() * Math.floor(9)),
          userID: this.currentUser.id,
          geolocalisationID: this.editedSite.geolocalisationID,
          nom: this.editedSite.nom,
          adresse: this.editedSite.adresse,
          email: this.editedSite.email,
          pays: this.editedSite.pays,
          ville: this.editedSite.ville,
          zone: this.editedSite.zone,
          date: this.editedSite.date
        })
      }
      this.saveToLocal()
      this.close()
    }
  },

  mounted () {
    this.currentUser = JSON.parse(window.localStorage.getItem('jules-user-connected'))
    if (window.localStorage.getItem('sites-' + this.currentUser.id) !== null && window.localStorage.getItem('sites-' + this.currentUser.id).length > 0) { this.sites = JSON.parse(window.localStorage.getItem('sites-' + this.currentUser.id)) }
    if (window.localStorage.getItem('jules-app-localisation') !== null && window.localStorage.getItem('jules-app-localisation').length > 0) {
      this.localisations = JSON.parse(window.localStorage.getItem('jules-app-localisation'))
      this.localisations.forEach(local => {
        this.villes.push(local.region)
      })
    }
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
