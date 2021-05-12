<template>
  <v-container fluid grid-list-xl>
    <v-dialog v-model="dialog" width="800px">
      <v-card elevation="15" class="special-scroll">
        <v-card-title>Nouvel Localisation</v-card-title>
        <v-container>
          <v-form class="mx-5">
            <v-row>
              <v-col cols="12">
                <v-select v-model="editedLocalisation.region" :items="regions" label="Chef lieu de Région" @change="setEditedLocalisation" clearable/>
              </v-col>
            </v-row>
            <v-row v-show="editedLocalisation.region">
              <v-col cols="8" md="8">
                <v-text-field v-model="editedLocalisation.site" label="Site"></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="editedLocalisation.elevation" label="Elévation"></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field v-model="editedLocalisation.longitude" label="Longitude"></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field v-model="editedLocalisation.lagitude" label="Lagitude"></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="editedLocalisation.inclinaison" label="Inclinaison (°)"></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="editedLocalisation.orientation" label="Orientation / Azimuth (°)"></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field v-model="editedLocalisation.perteIrradiation" label="Irradiation annuelle perdue (%)"></v-text-field>
              </v-col>
            </v-row>
            <v-row v-show="editedLocalisation.region" v-for="(item, index) in editedLocalisation.irradiations" :key="index">
              <v-col cols="3" md="3">
                <v-text-field label="Hh" :value="item.moi"></v-text-field>
              </v-col>
              <v-col cols="3" md="3">
                <v-text-field v-model="editedLocalisation.irradiations[index].hh" label="Hh"></v-text-field>
              </v-col>
              <v-col cols="3" md="3">
                <v-text-field v-model="editedLocalisation.irradiations[index].hopt" label="Hopt"></v-text-field>
              </v-col>
              <v-col cols="3" md="3">
                <v-text-field v-model="editedLocalisation.irradiations[index].iopt" label="Iopt"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-row>
            <v-col cols="12">
              <v-chip outlined light class="ma-2 elevation-5" color="amber darken-3" @click="save">
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
                Données géographiques
                <div class="float-right" style="position: relative; top: 35px">
                  <v-chip light class="ma-2 elevation-5 float-right white--text" color="amber darken-3" @click="dialog = !dialog">
                    <v-avatar left><v-icon small>mdi-plus</v-icon></v-avatar>
                    <span>Ajouter</span>
                  </v-chip>
                </div>
              </div>
            </v-card-text>
          </v-sheet>

          <v-card-text class="pt-0" v-if="localisations">
            <v-data-table :headers="headers" :items="localisations" :items-per-page="10" class="mb-3">
              <template v-slot:item.longitude="{ item }">
                <span> {{ item.longitude + '" Nord' }} </span>
              </template>
              <template v-slot:item.lagitude="{ item }">
                <span> {{ item.lagitude + '" Est' }} </span>
              </template>
              <template v-slot:item.inclinaison="{ item }">
                <span> {{ item.inclinaison + '°' }} </span>
              </template>
              <template v-slot:item.perteIrradiation="{ item }">
                <span> {{ item.perteIrradiation + '%' }} </span>
              </template>
              <template v-slot:item.elevation="{ item }">
                <span> {{ item.elevation + ' m' }} </span>
              </template>
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
                <span>Aucune donnée enrégistrée pour le moment</span>
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
      editedLocalisation: {
        id: null,
        region: null,
        site: null,
        elevation: null,
        longitude: null,
        lagitude: null,
        inclinaison: null,
        orientation: null,
        perteIrradiation: null,
        irradiations: [ { moi: 'Jan', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Fev', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Mar', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Avr', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Mai', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Juin', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Juil', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Aou', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Sep', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Oct', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Nov', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Dec', hh: 0, hopt: 0, iopt: 0 } ]
      },
      newLocalisation: {
        id: null,
        region: null,
        site: null,
        elevation: null,
        longitude: null,
        lagitude: null,
        inclinaison: null,
        orientation: null,
        perteIrradiation: null,
        irradiations: [ { moi: 'Jan', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Fev', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Mar', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Avr', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Mai', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Juin', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Juil', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Aou', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Sep', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Oct', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Nov', hh: 0, hopt: 0, iopt: 0 }, { moi: 'Dec', hh: 0, hopt: 0, iopt: 0 } ]
      },
      regions: ['Sud', 'Adamaoua', 'Centre', 'Ouest', 'Est', 'Nord', 'Extrême-Nord', 'Littoral', 'Nord-ouest', 'Sud-ouest'],
      localisations: [],
      headers: [
        { text: 'Region', value: 'region' },
        { text: 'Site', value: 'site' },
        { text: 'Longitude', value: 'longitude' },
        { text: 'Lagitude', value: 'lagitude' },
        { text: 'Elevation', value: 'elevation' },
        { text: 'ORientation / Azimuth', value: 'orientation' },
        { text: 'Inclinaison', value: 'inclinaison' },
        { text: 'Perte en Irradiation', value: 'perteIrradiation' },
        { text: '', value: 'action', sortable: false }
      ],
      allLocalisation: [
        { region: 'Sud', site: '2°55\'12" Nord, 10°37\'47" Est', elevation: '543 m.n.s.m', longitude: '2.9200421', lagitude: '10.629749', inclinaison: '7 degrés', perteIrradiation: '0.0', irradiations: [ { moi: 'Jan', hh: 5830, hopt: 6100, iopt: 31 }, { moi: 'Fev', hh: 5590, hopt: 5730, iopt: 20 }, { moi: 'Mar', hh: 5820, hopt: 5840, iopt: 6 }, { moi: 'Avr', hh: 5010, hopt: 4910, iopt: -11 }, { moi: 'Mai', hh: 4770, hopt: 4600, iopt: -23 }, { moi: 'Juin', hh: 4270, hopt: 4120, iopt: -26 }, { moi: 'Juil', hh: 3680, hopt: 3680, iopt: -21 }, { moi: 'Aou', hh: 4000, hopt: 3930, iopt: -11 }, { moi: 'Sep', hh: 4430, hopt: 4410, iopt: -1 }, { moi: 'Oct', hh: 4390, hopt: 4440, iopt: 13 }, { moi: 'Nov', hh: 4670, hopt: 4820, iopt: 25 }, { moi: 'Dec', hh: 5540, hopt: 5820, iopt: 33 } ] },
        { region: 'Adamaoua', site: '7°4\'56" Nord, 12°5\'23" Est', elevation: '1126 m.n.s.m', longitude: '7.0823999', lagitude: '12.0899586', inclinaison: '12 degrés', perteIrradiation: '0.0', irradiations: [ { moi: 'Jan', hh: 6440, hopt: 7100, iopt: 36 }, { moi: 'Fev', hh: 6630, hopt: 7030, iopt: 26 }, { moi: 'Mar', hh: 7030, hopt: 7110, iopt: 11 }, { moi: 'Avr', hh: 5880, hopt: 5690, iopt: -7 }, { moi: 'Mai', hh: 5850, hopt: 5460, iopt: -20 }, { moi: 'Juin', hh: 5470, hopt: 5050, iopt: -26 }, { moi: 'Juil', hh: 4820, hopt: 4510, iopt: -22 }, { moi: 'Aou', hh: 4690, hopt: 4510, iopt: -11 }, { moi: 'Sep', hh: 5170, hopt: 5140, iopt: 4 }, { moi: 'Oct', hh: 5530, hopt: 5720, iopt: 19 }, { moi: 'Nov', hh: 6190, hopt: 6720, iopt: 33 }, { moi: 'Dec', hh: 6220, hopt: 6930, iopt: 39 } ] },
        { region: 'Centre', site: '4°42\'10" Nord, 10°38\'0" Est', elevation: '418 m.n.s.m', longitude: '4.7028644', lagitude: '10.6334799', inclinaison: '8 degrés', perteIrradiation: '2.1', irradiations: [ { moi: 'Jan', hh: 5930, hopt: 6270, iopt: 32 }, { moi: 'Fev', hh: 5700, hopt: 5880, iopt: 21 }, { moi: 'Mar', hh: 5850, hopt: 5880, iopt: 7 }, { moi: 'Avr', hh: 5880, hopt: 5690, iopt: -7 }, { moi: 'Mai', hh: 5280, hopt: 5180, iopt: -20 }, { moi: 'Juin', hh: 5470, hopt: 5050, iopt: -26 }, { moi: 'Juil', hh: 4280, hopt: 4510, iopt: -22 }, { moi: 'Aou', hh: 4690, hopt: 4510, iopt: -11 }, { moi: 'Sep', hh: 5170, hopt: 5140, iopt: 4 }, { moi: 'Oct', hh: 5530, hopt: 5720, iopt: 19 }, { moi: 'Nov', hh: 4670, hopt: 4820, iopt: 25 }, { moi: 'Dec', hh: 5540, hopt: 5820, iopt: 33 } ] },
        { region: 'Ouest', site: '5°35\'8" Nord, 10°2\'27" Est', elevation: '2076 m.n.s.m', longitude: '5.5858177', lagitude: '10.0408476', inclinaison: '11 degrés', perteIrradiation: '0.0', irradiations: [ { moi: 'Jan', hh: 5830, hopt: 6100, iopt: 31 }, { moi: 'Fev', hh: 5590, hopt: 5730, iopt: 20 }, { moi: 'Mar', hh: 5820, hopt: 5840, iopt: 6 }, { moi: 'Avr', hh: 5010, hopt: 4910, iopt: -11 }, { moi: 'Mai', hh: 4770, hopt: 4600, iopt: -23 }, { moi: 'Juin', hh: 4270, hopt: 4120, iopt: -26 }, { moi: 'Juil', hh: 3680, hopt: 3680, iopt: -21 }, { moi: 'Aou', hh: 4000, hopt: 3930, iopt: -11 }, { moi: 'Sep', hh: 4430, hopt: 4410, iopt: -1 }, { moi: 'Oct', hh: 4390, hopt: 4440, iopt: 13 }, { moi: 'Nov', hh: 4670, hopt: 4820, iopt: 25 }, { moi: 'Dec', hh: 5540, hopt: 5820, iopt: 33 } ] },
        { region: 'Est', site: '2°55\'12" Nord, 10°37\'47" Est', elevation: '543 m.n.s.m', longitude: '3.8716338', lagitude: '12.1136202', inclinaison: '7 degrés', perteIrradiation: '0.0', irradiations: [ { moi: 'Jan', hh: 5830, hopt: 6100, iopt: 31 }, { moi: 'Fev', hh: 5590, hopt: 5730, iopt: 20 }, { moi: 'Mar', hh: 5820, hopt: 5840, iopt: 6 }, { moi: 'Avr', hh: 5010, hopt: 4910, iopt: -11 }, { moi: 'Mai', hh: 4770, hopt: 4600, iopt: -23 }, { moi: 'Juin', hh: 4270, hopt: 4120, iopt: -26 }, { moi: 'Juil', hh: 3680, hopt: 3680, iopt: -21 }, { moi: 'Aou', hh: 4000, hopt: 3930, iopt: -11 }, { moi: 'Sep', hh: 4430, hopt: 4410, iopt: -1 }, { moi: 'Oct', hh: 4390, hopt: 4440, iopt: 13 }, { moi: 'Nov', hh: 4670, hopt: 4820, iopt: 25 }, { moi: 'Dec', hh: 5540, hopt: 5820, iopt: 33 } ] },
        { region: 'Nord', site: '8°37\'30" Nord, 12°47\'25" Est', elevation: '287 m.n.s.m', longitude: '8.3252703', lagitude: '12.7903478', inclinaison: '13 degrés', perteIrradiation: '0.0', irradiations: [ { moi: 'Jan', hh: 6120, hopt: 6810, iopt: 37 }, { moi: 'Fev', hh: 6310, hopt: 6720, iopt: 17 }, { moi: 'Mar', hh: 5590, hopt: 5730, iopt: 20 }, { moi: 'Avr', hh: 5820, hopt: 5840, iopt: 6 }, { moi: 'Mai', hh: 5010, hopt: 4910, iopt: -11 }, { moi: 'Juin', hh: 4770, hopt: 4600, iopt: -23 }, { moi: 'Juil', hh: 4270, hopt: 4120, iopt: -26 }, { moi: 'Aou', hh: 3980, hopt: 3860, iopt: -21 }, { moi: 'Sep', hh: 4000, hopt: 3930, iopt: -11 }, { moi: 'Oct', hh: 4430, hopt: 4410, iopt: -1 }, { moi: 'Nov', hh: 4390, hopt: 4440, iopt: 13 }, { moi: 'Dec', hh: 4670, hopt: 4820, iopt: 25 } ] },
        { region: 'Extrême-Nord', site: '11°30\'16" Nord, 13°24\'12" Est', elevation: '340 m.n.s.m', longitude: '11.5044622', lagitude: '13.4033854', inclinaison: '15 degrés', perteIrradiation: '0.0', irradiations: [ { moi: 'Jan', hh: 5910, hopt: 6770, iopt: 41 }, { moi: 'Fev', hh: 6350, hopt: 6770, iopt: 31 }, { moi: 'Mar', hh: 7360, hopt: 7550, iopt: 16 }, { moi: 'Avr', hh: 6720, hopt: 6500, iopt: -2 }, { moi: 'Mai', hh: 6410, hopt: 5920, iopt: -17 }, { moi: 'Juin', hh: 5880, hopt: 5340, iopt: -22 }, { moi: 'Juil', hh: 5460, hopt: 5050, iopt: -19 }, { moi: 'Aou', hh: 5000, hopt: 4790, iopt: -7 }, { moi: 'Sep', hh: 5720, hopt: 5740, iopt: 8 }, { moi: 'Oct', hh: 6200, hopt: 6590, iopt: 25 }, { moi: 'Nov', hh: 6040, hopt: 6810, iopt: 38 }, { moi: 'Dec', hh: 5780, hopt: 6710, iopt: 43 } ] },
        { region: 'Littoral', site: '4°18\'23" Nord, 9°6\'33" Est', elevation: '870 m.n.s.m', longitude: '4.306612', lagitude: '9.1093448', inclinaison: '8 degrés', perteIrradiation: '0.1', irradiations: [ { moi: 'Jan', hh: 4410, hopt: 4580, iopt: 28 }, { moi: 'Fev', hh: 3870, hopt: 3930, iopt: 16 }, { moi: 'Mar', hh: 3850, hopt: 3850, iopt: 4 }, { moi: 'Avr', hh: 3250, hopt: 3210, iopt: -6 }, { moi: 'Mai', hh: 2930, hopt: 2870, iopt: -13 }, { moi: 'Juin', hh: 2590, hopt: 2530, iopt: -15 }, { moi: 'Juil', hh: 2570, hopt: 2520, iopt: -13 }, { moi: 'Aou', hh: 2520, hopt: 2490, iopt: -6 }, { moi: 'Sep', hh: 2770, hopt: 2760, iopt: 0 }, { moi: 'Oct', hh: 2690, hopt: 2700, iopt: 8 }, { moi: 'Nov', hh: 2970, hopt: 3030, iopt: 18 }, { moi: 'Dec', hh: 3970, hopt: 4120, iopt: 28 } ] },
        { region: 'Nord-Ouest', site: '6°26\'55" Nord, 9°51\'8" Est', elevation: '605 m.n.s.m', longitude: '6.4487852', lagitude: '9.8523518', inclinaison: '11 degrés', perteIrradiation: '0.0', irradiations: [ { moi: 'Jan', hh: 6340, hopt: 6890, iopt: 37 }, { moi: 'Fev', hh: 6390, hopt: 6710, iopt: 27 }, { moi: 'Mar', hh: 6790, hopt: 6860, iopt: 12 }, { moi: 'Avr', hh: 5510, hopt: 5340, iopt: -5 }, { moi: 'Mai', hh: 5160, hopt: 4870, iopt: -18 }, { moi: 'Juin', hh: 4870, hopt: 4560, iopt: -24 }, { moi: 'Juil', hh: 4650, hopt: 4390, iopt: -21 }, { moi: 'Aou', hh: 4530, hopt: 4390, iopt: -10 }, { moi: 'Sep', hh: 4820, hopt: 4800, iopt: 5 }, { moi: 'Oct', hh: 4840, hopt: 4970, iopt: 21 }, { moi: 'Nov', hh: 5750, hopt: 6170, iopt: 34 }, { moi: 'Dec', hh: 6000, hopt: 6570, iopt: 39 } ] },
        { region: 'Sud-Ouest', site: '5°13\'41" Nord, 8°12\'5" Est', elevation: '13 m.n.s.m', longitude: '5.2282328', lagitude: '8.2013967', inclinaison: '11 degrés', perteIrradiation: '0.0', irradiations: [ { moi: 'Jan', hh: 6050, hopt: 6530, iopt: 41 }, { moi: 'Fev', hh: 5810, hopt: 6050, iopt: 31 }, { moi: 'Mar', hh: 5900, hopt: 5920, iopt: 16 }, { moi: 'Avr', hh: 5260, hopt: 5110, iopt: -2 }, { moi: 'Mai', hh: 5040, hopt: 4770, iopt: -17 }, { moi: 'Juin', hh: 4430, hopt: 4170, iopt: -22 }, { moi: 'Juil', hh: 3890, hopt: 3700, iopt: -19 }, { moi: 'Aou', hh: 3650, hopt: 3550, iopt: -7 }, { moi: 'Sep', hh: 4200, hopt: 4170, iopt: -8 }, { moi: 'Oct', hh: 4700, hopt: 4790, iopt: 25 }, { moi: 'Nov', hh: 5170, hopt: 5480, iopt: 38 }, { moi: 'Dec', hh: 5760, hopt: 6260, iopt: 43 } ] }
      ]
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  methods: {
    setEditedLocalisation () {
      this.allLocalisation.forEach(all => {
        if (all.region.toLowerCase() === this.editedLocalisation.region.toLowerCase()) {
          this.editedLocalisation = Object.assign({}, all)
        }
      })
    },
    editItem (item) {
      this.editedIndex = this.localisations.indexOf(item)
      this.editedLocalisation = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.localisations.indexOf(item)
      if (confirm('Êtes vous sûr de vouloir supprimer?')) {
        this.localisations.splice(index, 1)
        this.saveToLocal()
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedLocalisation = Object.assign({}, this.newLocalisation)
        this.editedIndex = -1
      }, 300)
    },
    saveToLocal () {
      let data = JSON.stringify(this.localisations)
      window.localStorage.setItem('jules-app-localisation', data)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.localisations[this.editedIndex], this.editedLocalisation)
      } else {
        this.localisations.push({
          id: Math.floor(new Date () * Math.random() * Math.floor(9)),
          region: this.editedLocalisation.region,
          site: this.editedLocalisation.site,
          elevation: this.editedLocalisation.elevation,
          longitude: this.editedLocalisation.longitude,
          lagitude: this.editedLocalisation.lagitude,
          inclinaison: this.editedLocalisation.inclinaison,
          orientation: this.editedLocalisation.orientation,
          perteIrradiation: this.editedLocalisation.perteIrradiation,
          irradiations: this.editedLocalisation.irradiations
        })
      }
      this.saveToLocal()
      this.close()
    }
  },
  mounted () {
    this.currentUser = JSON.parse(window.localStorage.getItem('jules-user-connected'))
    if (window.localStorage.getItem('jules-app-localisation') !== null && window.localStorage.getItem('jules-app-localisation').length > 0) { this.localisations = JSON.parse(window.localStorage.getItem('jules-app-localisation')) }
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