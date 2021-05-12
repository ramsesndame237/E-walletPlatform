<template>
  <div>
    <v-btn bottom color="#ff4e00" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card elevation="15" class="special-scroll">
        <v-card-title>Ajouter Souscription</v-card-title>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1">Enrégistrement <small>Renseigner les détails sur la souscription</small></v-stepper-step>
          <v-stepper-content step="1">
            <v-row class="mx-2">
              <v-col cols="4">
                <v-text-field v-model="editedSouscription.fournisseur" clearable prepend-inner-icon="mdi-camera-iris" label="Fournisseur" />
                <!-- <v-select v-model="editedSouscription.fournisseur" :items="fournisseur" clearable prepend-inner-icon="mdi-camera-iris" label="Fournisseur" /> -->
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="editedSouscription.service" clearable prepend-inner-icon="mdi-camera-control" label="Service" />
                <!-- <v-select v-model="editedSouscription.service" :items="service" clearable prepend-inner-icon="mdi-camera-control" label="Service" /> -->
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="editedSouscription.cout" type="number" min="0" clearable prepend-inner-icon="mdi-orbit" label="Prix de la souscription"/>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedSouscription.syntheseOffre" clearable prepend-inner-icon="mdi-text" label="Notes de l'offre" />
              </v-col>
              <v-col cols="3">
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="editedSouscription.dateDebut" prepend-inner-icon="mdi-calendar" label="Début ..." readonly v-on="on"/>
                  </template>
                  <v-date-picker v-model="editedSouscription.dateDebut" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="editedSouscription.dateFin" prepend-inner-icon="mdi-calendar" label="Fin ..." readonly v-on="on"/>
                  </template>
                  <v-date-picker v-model="editedSouscription.dateFin" @input="menu3 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="editedSouscription.delaisAlertePaiement" type="number" min="2" clearable prepend-inner-icon="mdi-orbit" label="Delai d'alerte (en Jrs)"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" v-show="editedSouscription.fournisseur && editedSouscription.service && editedSouscription.cout && editedSouscription.dateDebut && editedSouscription.dateFin && editedSouscription.delaisAlertePaiement">
                <v-btn color="green darken-3" dark small fab class="ml-3 white--text" @click="save">
                  <v-icon small>
                    mdi-telegram
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-dialog>
    <v-layout wrap class="px-0 py-12">
      <v-flex sm12 xs12 md12 lg12 class="my-0 py-0" v-if="forNotifications.length > 0">
        <v-alert outlined class="mt-1 mb-0" border="left" elevation="2" type="error">
          Vous avez des souscriptions qui finissent bientôt
        </v-alert>
      </v-flex>
    </v-layout>
    <div class="page">
      <div class="year-navigation">
        <v-btn @click="changeYear(0)" id="forTooltip" class="hover-rotate ml-1" width="30" height="30" color="#ff4e00" dark fab small>
          <v-icon small dark>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="year" v-show="currentYear"> {{ currentYear }} </span>
        <v-btn @click="changeYear(1)" class="hover-rotate ml-1" width="30" height="30" color="#ff4e00" dark fab small>
          <v-icon small dark>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <div class="gantt-container">
        <div class="gantt-header">
          <div class="gantt-month" v-for="(item, index) in month" :key="index">
            <span class="month-abb"> {{ item.abbr }} </span>
            <span class="month-name"> {{ item.name }} </span>
            <div class="month-day">
              <span class="elt-date" v-for="(n, i) in item.nbrJour" :key="i"></span>
            </div>
          </div>
        </div>
        <div class="gantt-content" v-show="toShow.length > 0" v-for="item in toShow" :key="item.id">
          <div class="gantt-name">
            <span class="gantt-name__name text-truncate">{{ item.fournisseur }}</span>
          </div>
          <div class="gantt-elt lines-bg">
            <div class="gantt-elt__elt text-truncate" @click="editSouscription(item)" alt="Cliquer pour modifier"> {{ item.service }} </div>
          </div>
          <div class="gantt-actions">
            <v-icon @click="editSouscription(item)" small dark color="warning" class="mx-1" style="font-size: .8em">mdi-pencil</v-icon>
            <v-icon @click="deleteSouscription(item)" small dark color="red" style="font-size: .8em">mdi-delete</v-icon>
          </div>
        </div>
        <div class="gantt-content" v-if="toShow.length === 0">
          <div class="gantt-name" style="background: transparent !important; box-shadow: none !important">
          </div>
          <div class="gantt-elt lines-bg">
            <div> <span class="alert-text">Aucun enrégistrement pour le moment</span> </div>
          </div>
          <div class="gantt-actions"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      currentUser: null,
      editedIndex: -1,
      dialog: false,
      valid: false,
      e6: 1,
      currentDate: new Date(),
      currentYear: null,
      modalHide: true,
      edit: false,
      oldId: null,
      addStep: 0,
      countUpdate: 0,
      totalNbrDay: 0,
      toShow: [],
      souscriptions: [],
      forNotifications: [],
      menu2: false,
      menu3: false,
      categorie: [
        { text: 'TV', value: 'TV'},
        { text: 'Téléphone', value: 'Téléphone'},
        { text: 'Chauffage', value: 'Chauffage'},
        { text: 'Data', value: 'Data'},
        { text: 'Electricité', value: 'Electricité'},
        { text: 'Assurance', value: 'Assurance'},
        { text: 'Eau', value: 'Eau'},
        { text: 'Sport', value: 'Sport'}
      ],
      abonnement: [
        { text: 'SFR Adsl fixe', value: 'SFR Adsl fixe' },  
        { text: 'Total Gaz', value: 'Total Gaz' },  
        { text: 'AWS Cloud', value: 'AWS Cloud' },  
        { text: 'Energie', value: 'Energie' },  
        { text: 'AXA', value: 'AXA' },  
        { text: 'Véolia eau', value: 'Véolia eau' },  
        { text: 'Illimité', value: 'Illimité' }  
      ],
      editedSouscription: {
        souscriptionID: null,
        fournisseur: null,
        service: null,
        cout: null,
        syntheseOffre: null,
        alerteMail: true,
        dateDebut: null,
        dateFin: null,
        delaisAlertePaiement: null,
        delaisAlerteResiliation: null,
        userID: null
      },
      newSouscription: {
        souscriptionID: null,
        fournisseur: null,
        service: null,
        cout: null,
        syntheseOffre: null,
        alerteMail: true,
        dateDebut: null,
        dateFin: null,
        delaisAlertePaiement: null,
        delaisAlerteResiliation: null,
        userID: null
      },
      month: [
        { name: 'Janvier', abbr: 'Jan.', nbrJour: null },
        { name: 'Février', abbr: 'Fév.', nbrJour: null },
        { name: 'Mars', abbr: 'Mars.', nbrJour: null },
        { name: 'Avril', abbr: 'Avr.', nbrJour: null },
        { name: 'Mai', abbr: 'Mai.',brJour: null },
        { name: 'Juin', abbr: 'Juin.', nbrJour: null },
        { name: 'Juillet', abbr: 'Jul.', nbrJour: null },
        { name: 'Août', abbr: 'Août.', nbrJour: null },
        { name: 'Septembre', abbr: 'Sept.', nbrJour: null },
        { name: 'Octobre', abbr: 'Oct.', nbrJour: null },
        { name: 'Novembre', abbr: 'Nov.', nbrJour: null },
        { name: 'Décembre', abbr: 'Déc.', nbrJour: null }
      ],
      editedSouscriptionId: null,
      baseSouscriptionUri: 'http://api.wayfoster.com/api/souscriptions/'
    }),
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      changeYear(id) {
        this.toShow = []
        if (id === 0) { this.currentYear--} else { this.currentYear++}
        this.souscriptions.forEach(elt => {
          if(new Date(elt.dateDebut).getFullYear() === this.currentYear || new Date(elt.dateFin).getFullYear() === this.currentYear) {
            this.toShow.push(elt)
          }
        })
        this.initDraw()
      },
      initDraw () {
        for (let i = 0; i< this.toShow.length; i++) {
          this.drawGantElt(i)
        }
      },
      drawGantElt (id) {
        let parent = document.querySelector('.gantt-elt')
        let elts = document.querySelectorAll('.gantt-elt > .gantt-elt__elt')
        let elt = elts[id]
        let y_start = new Date ('1/1/' + this.currentYear)
        let t_start = new Date (this.toShow[id].dateDebut)
        let t_end = new Date (this.toShow[id].dateFin)
        let t_diff = t_end.getTime() - t_start.getTime()
        let y_diff = t_start.getTime() - y_start.getTime()

        t_diff /= (1000 * 3600 * 24)
        y_diff /= (1000 * 3600 * 24)

        if (elt) {
          if (new Date(this.toShow[id].dateDebut).getFullYear() < this.currentYear) {
            let temp_diff = new Date(this.toShow[id].dateFin).getTime() - new Date('1/1/' + this.currentYear).getTime()
            temp_diff /= (1000 * 3600 * 24)
            elt.style.width = (parent.clientWidth / 365) * temp_diff + 'px'
            elt.style.marginLeft = '0px'
          } else {
            elt.style.width = (parent.clientWidth / 365) * t_diff + 'px'
            elt.style.marginLeft = (parent.clientWidth / 365) * y_diff + 1 + 'px'
          }

          // if (this.toShow[id].delaiAlerte)
          let ecartDate = Math.round(this.msToDay(new Date(this.toShow[id].dateFin) - new Date()))
          
          if (ecartDate < 0) {
            elt.style.background = 'gray'
          } else if (ecartDate < this.toShow[id].delaisAlertePaiement) {
            elt.style.background = '#ff4e00'
          } else {
            elt.style.background = '#388e3c'
          }
        }
      },
      setYearDayNbr (year) {
        for (let i = 0; i < this.month.length; i++) {
          this.month[i].nbrJour = new Date(year, i + 1, -1).getDate() + 1
          this.totalNbrDay += this.month[i].nbrJour
        } // Algormithme pour attribuer correctement le nombre de jours en fonction de l'année en cours
      },
      msToDay (nbr) { return nbr / (1000 * 3600 * 24)},
      dayToMs (nbr) { return nbr * (1000 * 3600 * 24)},

      editSouscription (item) {
        this.editedIndex = this.souscriptions.indexOf(item)
        this.editedSouscription = Object.assign({}, item)
        this.editedSouscription.dateDebut = item.dateDebut.split('T')[0]
        this.editedSouscription.dateFin = item.dateFin.split('T')[0]
        this.editedSouscriptionId = item.souscriptionID
        this.dialog = true
      },
      async loadSouscriptions () {
        let today = new Date()
        let id = 0
        this.toShow = []
        await axios.get(this.baseSouscriptionUri + 'GetSouscriptionPerUser/' +this.currentUser.userID)
        .then(response => (this.souscriptions = response.data))
        .catch(e => (console.log(e)))

        if(this.souscriptions.length > 0) {
          this.souscriptions.forEach(souscription => {
            let lastDay = new Date(souscription.dateFin)
            if (Math.round(this.msToDay(lastDay - today)) - 1 < souscription.delaisAlertePaiement && Math.round(this.msToDay(lastDay - today)) >= 0) {
              this.forNotifications.push(souscription)
              this.forNotifications[id].nbrDaysRemaining = Math.round(this.msToDay(lastDay - today)) + 1
              id += 1
            }
          })
        }

        this.souscriptions.forEach(souscription => {
          if(new Date(souscription.dateDebut).getFullYear() === this.currentYear || new Date(souscription.dateFin).getFullYear() === this.currentYear) {
            this.toShow.push(souscription)
          }
        })
      },
      async deleteSouscription (item) {
        const index = item.souscriptionID
        if (confirm('Êtes vous sûr de vouloir supprimer cette souscription ?')) {
          await axios.delete(this.baseSouscriptionUri + 'DeleteSouscription/' + index)
          this.loadSouscriptions()
        }
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedSouscription = Object.assign({}, this.newSouscription)
          this.editedIndex = -1
          this.e6 = 1
          this.initDraw()
        }, 300)
      },
      async save () {
        if (this.editedIndex > -1) {
          let tmp = {
            souscriptionID: this.editedSouscriptionId,
            fournisseur: this.editedSouscription.fournisseur,
            service: this.editedSouscription.service,
            cout: this.editedSouscription.cout,
            syntheseOffre: this.editedSouscription.syntheseOffre,
            alerteMail: false,
            dateDebut: this.editedSouscription.dateDebut,
            dateFin: this.editedSouscription.dateFin,
            delaisAlertePaiement: this.editedSouscription.delaisAlertePaiement,
            delaisAlerteResiliation: 0,
            userID: this.currentUser.userID
          }
          await axios.put(this.baseSouscriptionUri + 'PutSouscription/' + this.editedSouscriptionId, tmp)
          .catch(e => (console.error(e)))
        } else {
          let tmp = {
            souscriptionID: 13,
            fournisseur: this.editedSouscription.fournisseur,
            service: this.editedSouscription.service,
            cout: this.editedSouscription.cout,
            syntheseOffre: this.editedSouscription.syntheseOffre,
            alerteMail: false,
            dateDebut: this.editedSouscription.dateDebut,
            dateFin: this.editedSouscription.dateFin,
            delaisAlertePaiement: this.editedSouscription.delaisAlertePaiement,
            delaisAlerteResiliation: 0,
            userID: this.currentUser.userID
          }
          await axios.post(this.baseSouscriptionUri + 'PostSouscription/' + this.currentUser.userID, tmp)
          .catch(e => (console.error(e)))
        }
        this.loadSouscriptions()
        this.close()
      }
    },
    mounted () {
      this.currentUser = JSON.parse(window.localStorage.getItem('alpha-user-connected'))
      this.currentYear = this.currentDate.getFullYear()
      this.setYearDayNbr(this.currentDate.getFullYear())
      this.loadSouscriptions()
    },
    updated () {
      let counter = 0
      if (counter === 0) {
        this.initDraw()
        counter++
      }
    }
  }
</script>

<style lang="css">
.tippy {
  position: absolute;
  top: 0;
  left: 0;
  max-width: 350px;
  background: rgb(22, 22, 22, .9);
  padding: 10px 15px;
  font-size: .815em;
  color: #fff;
  opacity: 0;
  border-radius: 20px;
  transform: translateX(-20px);
  transform-origin: 50% 100%;
  transition: opacity .3s, transform .3s, border-radius .3s;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
  -webkit-transition: opacity .3s, transform .3s, border-radius .3s;
  -moz-transition: opacity .3s, transform .3s, border-radius .3s;
  -ms-transition: opacity .3s, transform .3s, border-radius .3s;
  -o-transition: opacity .3s, transform .3s, border-radius .3s;
  -webkit-transform: translateX(-20px);
  -moz-transform: translateX(-20px);
  -ms-transform: translateX(-20px);
  -o-transform: translateX(-20px);
}

.tippy::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -6px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #222;
}

.tippy.visible {
  display: block !important;
  opacity: 1;
  border-radius: 3px;
  transform: translateX(0);
  -webkit-transform: translateX(0);
  -moz-transform: translateX(0);
  -ms-transform: translateX(0);
  -o-transform: translateX(0);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  -o-border-radius: 3px;
}

.hided { display: none;}
</style>
