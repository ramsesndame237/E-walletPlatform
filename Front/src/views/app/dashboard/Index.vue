<template>
  <div>
    <v-container>
      <h3 class="mb-2 text-right text-capitalize font-weight-light">Gestion du Site</h3>
      <v-dialog v-model="dialog" width="800px">
        <v-card elevation="15" class="special-scroll pa-3" v-show="dialogToShow === 'poseOptionToiture'">
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field v-model="editedPoseOptions.element" prepend-inner-icon="mdi-camera-iris" disabled />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedPoseOptions.longueur" clearable prepend-inner-icon="mdi-camera-control" label="Longueur" />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedPoseOptions.largeur" clearable prepend-inner-icon="mdi-orbit" label="Largeur"/>
            </v-col>
            <v-col cols="4">
              <v-text-field :value="editedPoseOptions.largeur * editedPoseOptions.longueur" disabled prepend-inner-icon="mdi-orbit" label="Surface"/>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="editedPoseOptions.distance" clearable prepend-inner-icon="mdi-camera-control" label="Distance toit - Local technique" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="editedPoseOptions.inclinaison" clearable prepend-inner-icon="mdi-orbit" label="Inclinaison"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-chip @click="save('poseOptionToiture')" dark class="mx-2" color="green darken-3">
                <v-avatar left><v-icon>>mdi-telegram</v-icon></v-avatar>
                <span>Sauvegarder</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-card> <!-- OK -->
        <v-card elevation="15" class="special-scroll pa-3" v-show="dialogToShow === 'poseOptionAutres'">
          <v-row class="mx-2">
            <v-col cols="6">
              <v-text-field v-model="editedPoseOptions.longueur" clearable prepend-inner-icon="mdi-camera-control" label="Longueur" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="editedPoseOptions.largeur" clearable prepend-inner-icon="mdi-orbit" label="Largeur"/>
            </v-col>
            <v-col cols="6">
              <v-text-field :value="editedPoseOptions.largeur * editedPoseOptions.longueur" disabled prepend-inner-icon="mdi-orbit" label="Surface"/>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="editedPoseOptions.distance" clearable prepend-inner-icon="mdi-camera-control" label="Distance toit - Local technique" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-chip @click="save('poseOptionAutres')" dark class="mx-2" color="green darken-3">
                <v-avatar left><v-icon>>mdi-telegram</v-icon></v-avatar>
                <span>Sauvegarder</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-card> <!-- OK -->
        <v-card elevation="15" class="special-scroll pa-3" v-show="dialogToShow === 'obstacleOptions'">
          <v-row class="mx-2">
            <v-col cols="12">
              <v-select v-model="editedObstacleOptions.obstacle" :items="obstaclesToShow" prepend-inner-icon="mdi-camera-control" label="Obstacle" />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedObstacleOptions.h1" prepend-inner-icon="mdi-camera-control" label="Hauteur H1 (m)" />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedObstacleOptions.d1" @input="setAngle1()" prepend-inner-icon="mdi-camera-control" label="Distance D1 (m)" />
            </v-col>
            <v-col cols="4">
              <v-text-field disabled v-model="editedObstacleOptions.i1" prepend-inner-icon="mdi-orbit" label="Angle I1 (°)"/>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedObstacleOptions.h2" prepend-inner-icon="mdi-camera-control" label="Hauteur H2 (m)" />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedObstacleOptions.d2" @input="setAngle2()" prepend-inner-icon="mdi-camera-control" label="Distance D2 (m)" />
            </v-col>
            <v-col cols="4">
              <v-text-field disabled v-model="editedObstacleOptions.i2" value="0" prepend-inner-icon="mdi-orbit" label="Angle I2 (°)"/>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedObstacleOptions.h3" prepend-inner-icon="mdi-camera-control" label="Hauteur H3 (m)" />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedObstacleOptions.d3" @input="setAngle3()" prepend-inner-icon="mdi-camera-control" label="Distance D3 (m)" />
            </v-col>
            <v-col cols="4">
              <v-text-field disabled v-model="editedObstacleOptions.i3" value="0" prepend-inner-icon="mdi-orbit" label="Angle I3 (°)"/>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedObstacleOptions.h4" prepend-inner-icon="mdi-camera-control" label="Hauteur H4 (m)" />
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="editedObstacleOptions.d4" @input="setAngle4()" prepend-inner-icon="mdi-camera-control" label="Distance D4 (m)" />
            </v-col>
            <v-col cols="4">
              <v-text-field disabled v-model="editedObstacleOptions.i4" value="0" prepend-inner-icon="mdi-orbit" label="Angle I4 (°)"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-chip @click="save('obstacleOptions')" dark class="mx-2" color="green darken-3">
                <v-avatar left><v-icon>>mdi-telegram</v-icon></v-avatar>
                <span>Sauvegarder</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-card> <!-- OK -->
        <v-card elevation="15" class="special-scroll pa-3" v-show="dialogToShow === 'equipementOptions'">
          <v-row class="mx-2">
            <v-col cols="12">
              <v-select v-model="editedEquipementOptions.equipement" :items="equipementsToShow" prepend-inner-icon="mdi-camera-control" label="Equipement" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="editedEquipementOptions.qte" clearable prepend-inner-icon="mdi-camera-control" label="Quantité" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="editedEquipementOptions.temps" clearable prepend-inner-icon="mdi-camera-control" label="Temps (h)" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="editedEquipementOptions.pn" clearable prepend-inner-icon="mdi-camera-control" label="PUissance Nominale (W)" />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="editedEquipementOptions.pdd" clearable prepend-inner-icon="mdi-camera-control" label="Puissance de démarage (w)" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-chip @click="save('equipementOptions')" dark class="mx-2" color="green darken-3">
                <v-avatar left><v-icon>>mdi-telegram</v-icon></v-avatar>
                <span>Sauvegarder</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-card> <!-- OK -->
        <v-card elevation="15" class="special-scroll pa-3" v-show="dialogToShow === 'capacitePanneauOptions'">
          <v-row class="mx-2">
            <v-col cols="5">
              <v-text-field v-model="final.nbrPanneauSerie" clearable prepend-inner-icon="mdi-camera-control" label="Nombre de Panneaux en série" />
            </v-col>
            <v-col cols="5">
              <v-text-field v-model="final.nbrPanneauParallele" clearable prepend-inner-icon="mdi-camera-control" label="Nombre de Panneaux en parallèle" />
            </v-col>
            <v-col cols="2">
              <v-chip @click="save('capacitePanneauOptions')" dark class="mx-2" color="green darken-3">
                <v-avatar left><v-icon>>mdi-telegram</v-icon></v-avatar>
                <span>Sauvegarder</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
        <v-card elevation="15" class="special-scroll pa-3" v-show="dialogToShow === 'devisItem'">
          <v-row class="mx-2" v-if="editedIndex !== -1">
            <v-col cols="10">
              <v-text-field v-model="editedDevisItem.pu" clearable prepend-inner-icon="mdi-camera-control" label="Entrer le prix unitaire" />
            </v-col>
            <v-col cols="2">
              <v-chip @click="save('devisItem')" dark class="mx-2" color="green darken-3">
                <v-avatar left><v-icon>>mdi-telegram</v-icon></v-avatar>
                <span>Sauvegarder</span>
              </v-chip>
            </v-col>
          </v-row>
          <v-row class="mx-2" v-if="editedIndex === -1">
            <v-col cols="6">
              <v-text-field v-model="editedDevisItem.designation" clearable prepend-inner-icon="mdi-camera-control" label="Désignation" />
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="editedDevisItem.qte" clearable prepend-inner-icon="mdi-camera-control" label="Quantité" />
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="editedDevisItem.pu" clearable prepend-inner-icon="mdi-camera-control" label="Prix Unitaire" />
            </v-col>
            <v-col cols="1">
              <v-chip @click="save('devisItem')" dark class="mx-2" color="green darken-3">
                <v-avatar left><v-icon>>mdi-telegram</v-icon></v-avatar>
                <span>Sauvegarder</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
      <v-toolbar flat color="amber darken-4" class="mb-4 rounded-container">
        <v-toolbar-title style="color: #fff" class="text-capitalize font-weight-light">{{ formSteps[activeStep].title }} <b v-show="currentSite"> </b> </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-chip @click="saveWork" dark class="mx-2" color="green darken-3">
          <v-avatar left><v-icon>>mdi-telegram</v-icon></v-avatar>
          <span>Sauvegarder</span>
        </v-chip>
      </v-toolbar>
      <article>
        <header class="rounded-container">
          <div class="progress">
            <div class="progress-step" :class="{'active':index === activeStep}" v-for="(step, index) in formSteps" :key="'step'+index"> {{ index + 1 }} </div>
          </div>
        </header>
        <section>
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 0">
            <div class="full-content flex-container">
              <div class="ma-8 flex-content first-container">
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="mb-3 pa-5 rounded-container-inside">
                    <span class="grey--text text--darken-4 font-weight-light font-italic title text-center">Avez-vous déjà effectué une installation PV ?</span>
                  </v-flex>
                  <v-flex sm12 xs12 md12 lg12>
                    <v-dialog v-model="dialog2" width="500">
                      <template v-slot:activator="{ on }">
                        <v-chip v-on="on" class="ma-2" color="green" text-color="white">
                          <v-avatar left>
                            <v-icon color="green darken-4" text-color="white">mdi-checkbox-marked-circle</v-icon>
                          </v-avatar>
                          OUI
                        </v-chip>
                      </template>

                      <v-card elevation="15" class="special-scroll pa-3">
                        <v-row class="mx-2">
                          <v-col cols="10">
                            <v-text-field v-model="firstLoadedValue" clearable prepend-inner-icon="mdi-camera-control" label="Entrer la puissance de l'ancienne installation en Kwc" />
                          </v-col>
                          <v-col cols="2">
                            <v-btn color="amber darken-3" dark small fab class="ml-3 white--text" @click="save('oldState')">
                              <v-icon small> mdi-telegram </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card>
                    </v-dialog>
                    <v-chip class="ma-2" text-color="white" @click="nextStep">
                      <v-avatar left>
                        <v-icon color="red darken-4" text-color="white">mdi-checkbox-marked-circle</v-icon>
                      </v-avatar>
                      NON
                    </v-chip>
                  </v-flex>
                </v-layout>
              </div>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 1">
            <div class="left-content">
              <v-container>
                <v-layout wrap>
                  <v-flex sm12 xs12 md4 lg4 class="pa-1" v-show="currentSite !== null">
                    <span class="caption font-weight-light grey--text">Données administratives</span>
                    <v-card flat tile class="mt-2 mb-5 rounded-container-inside">
                      <v-list dense v-show="currentSite !== null">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentSite.nom }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Nom du Client / Société</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentSite.adresse }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Adresse / N° Téléphone</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentSite.email }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Email</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentSite.pays }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Localisation</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentSite.ville + ' / ' + currentSite.zone }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Site étudié</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentSite.date }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Date</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    <span class="caption font-weight-light grey--text">Coordonnées du site</span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentLocation.site }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Longitude et Lagitude</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentLocation.elevation }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Elevation</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-flex> <!-- OK -->
                  <v-flex sm12 xs12 md8 lg8 class="pa-1 pl-5 text-truncate">
                    <span class="caption font-weight-light grey--text">Solution à supporter</span>
                    <v-select flat tile class="mt-2 mb-5 rounded-container-inside no-change" label="Quel type de besoin doit être ouvert ?" v-model="final.solution" small-chips solo :items="solutionsToShow"></v-select>
                    <span class="caption font-weight-light grey--text">Condition qui représente le mieux votre système</span>
                    <v-select flat tile class="mt-2 mb-5 rounded-container-inside no-change" label="Pour quel système de pose optez vous ?" v-model="final.pose" small-chips solo :items="posesToShow"></v-select>
                    <v-card flat tile class="my-2 rounded-container-inside" v-show="final.pose">
                      <v-data-table v-if="final.pose === 'Toiture existante'" :headers="headers1_1" :items="poseOptionToiture" :items-per-page="10" class="mb-3" hide-default-footer>
                        <template v-slot:item.action="{ item }">
                          <v-chip light class="ma-2 elevation-5 white--text" color="grey darken-3" @click="editItem(item, 'poseOptionToiture')">
                            <v-avatar left><v-icon small>mdi-pencil-outline</v-icon></v-avatar>
                            <span class="caption">Modifier</span>
                          </v-chip>
                        </template>
                        <template v-slot:no-data>
                          <p class="dark mt-5">Aucune site enrégistrée pour le moment</p>
                        </template>
                      </v-data-table>
                      <v-data-table v-else :headers="headers1_2" :items="poseOptionAutres" :items-per-page="10" class="mb-3" hide-default-footer>
                        <template v-slot:item.action="{ item }">
                          <v-chip light class="ma-2 elevation-5 white--text" color="grey darken-3" @click="editItem(item, 'poseOptionAutres')">
                            <v-avatar left><v-icon small>mdi-pencil-outline</v-icon></v-avatar>
                            <span>Modifier</span>
                          </v-chip>
                        </template>
                        <template v-slot:no-data>
                          <p class="dark mt-5">Aucune site enrégistrée pour le moment</p>
                        </template>
                      </v-data-table>
                    </v-card>
                  </v-flex> <!-- OK -->
                </v-layout>
              </v-container>
            </div>
            <div class="right-content">
              <v-container class="no-space">
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                        <v-icon small class="grey--text darken-3">mdi-alert-outline</v-icon>
                        Informations utiles
                      </span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <span class="d-inline-block px-2 pt-3">Données géographiques</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Elles permettent de déterminer les données d'iradiations via PVGIS africa disponible sur http://re.jrc.ec.europa.eu/pvgis/apps4/pvest.php?lang=fr&map=africa. pour la zone afrique</span>
                      <v-divider></v-divider>
                      <span class="d-inline-block px-2 pt-3">Système de pose</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">S'il existe plusieurs PANs de toiture, les données relatives à chaque PAN devraient être relevées pour une analyse ultérieure</span>
                    </v-card>
                    <v-card class="rounded-container-inside">
                      <v-img src="@/assets/static/img/ah.png"/>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 2">
            <div class="left-content">
              <v-container>
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                      <v-icon small class="grey--text darken-3">mdi-alert-outline</v-icon>
                      Mesures d'ombrage proche
                    </span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <v-data-table :headers="headers2" :items="final.obstacleOptions" :items-per-page="10" class="mb-3" hide-default-footer>
                        <template v-slot:item.action="{ item }">
                          <v-chip light class="ma-2 elevation-5 white--text" color="grey darken-3" @click="editItem(item, 'obstacleOptions')">
                            <v-avatar left><v-icon small>mdi-pencil-outline</v-icon></v-avatar>
                            <span>Modifier</span>
                          </v-chip>
                          <v-chip light class="ma-2 elevation-5 white--text" color="red darken-3" @click="deleteItem(item, 'obstacleOptions')">
                            <v-avatar left><v-icon small>mdi-delete-outline</v-icon></v-avatar>
                            <span>Supprimer</span>
                          </v-chip>
                        </template>
                        <template v-slot:no-data>
                          <p class="dark mt-5">Aucune donnée enrégistrée pour le moment</p>
                        </template>
                      </v-data-table>
                    </v-card>
                    <div class="pa-3">
                      <v-chip light class="ma-2 elevation-5 white--text" color="amber darken-3" @click="dialogToShow = 'obstacleOptions', dialog = !dialog">
                        <v-avatar left><v-icon small>mdi-plus</v-icon></v-avatar>
                        <span>Ajouter</span>
                      </v-chip>
                    </div>
                    <v-layout>
                      <v-flex sm6 md6 lg6 xs6 class="ma-2">
                        <v-card class="rounded-container-inside">
                          <v-img src="@/assets/static/img/ab.png"/>
                        </v-card>
                      </v-flex>
                      <v-flex sm6 md6 lg6 xs6 class="ma-2">
                        <v-card class="rounded-container-inside">
                          <v-img src="@/assets/static/img/p9.jpg"/>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
            <div class="right-content">
              <v-container>
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                      <v-icon small class="grey--text darken-3">mdi-alert-outline</v-icon>
                      Informations utiles
                    </span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <span class="d-inline-block px-2 pt-3">Symboles</span><br>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Hauteur: Hauteur en degré</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">I: Angle</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">d: Distance à l'obstacle</span>
                      <v-divider></v-divider>
                      <span class="d-inline-block px-2 pt-3">Notes</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Avant de renseigner cette étape, une déscente sur le terrain doit être effectuée. Pour ladite déscente, vous pouvez vous munir des éléments suivant : GPS, Boussole, Clinomètre & Fiche de consigne de données PV</span>
                    </v-card>
                    <v-card class="rounded-container-inside">
                      <v-img src="@/assets/static/img/ab.png"/>
                    </v-card>
                    <v-card class="mt-3 rounded-container-inside">
                      <v-img src="@/assets/static/img/p9.jpg"/>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 3">
            <div class="left-content">
              <v-container>
                <v-layout wrap>
                  <v-flex sm6 xs6 md3 lg3 class="pa-1">
                    <span class="body-2 font-weight-light orange--text darken-3">Puissance Totale </span>
                    <v-card color="yellow darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="display-1 white--text font-weight-black">{{ roundDecimal(final.dimmentionnementDetails.pt) }} <span class="caption font-weight-lighter"> Kw</span> </v-card-title>
                      <v-card-subtitle class="caption font-weight-light white--text font-italic">Besoin total en puissance</v-card-subtitle>
                    </v-card>
                  </v-flex>
                  <v-flex sm6 xs6 md3 lg3 class="pa-1">
                    <span class="body-2 font-weight-light red--text darken-3">Energie Totale / Jrs </span>
                    <v-card color="red darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="display-1 white--text font-weight-black">{{ roundDecimal(final.dimmentionnementDetails.et) }} <span class="caption font-weight-lighter"> Kwh</span> </v-card-title>
                      <v-card-subtitle class="caption font-weight-light white--text font-italic">Besoin total en Energie par jours</v-card-subtitle>
                    </v-card>
                  </v-flex>
                  <v-flex sm6 xs6 md3 lg3 class="pa-1">
                    <span class="body-2 font-weight-light green--text">Energie Totale / Mois </span>
                    <v-card color="green darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="display-1 white--text font-weight-black">{{ roundDecimal(30 * final.dimmentionnementDetails.et) }} <span class="caption font-weight-lighter"> Kwh</span> </v-card-title>
                      <v-card-subtitle class="caption font-weight-light white--text font-italic">Besoin total en Energie par mois</v-card-subtitle>
                    </v-card>
                  </v-flex>
                  <v-flex sm6 xs6 md3 lg3 class="pa-1">
                    <span class="body-2 font-weight-light indigo--text">Energie Totale / An </span>
                    <v-card color="indigo darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="display-1 white--text font-weight-black">{{ roundDecimal(365 * final.dimmentionnementDetails.et) }} <span class="caption font-weight-lighter"> Kwh</span> </v-card-title>
                      <v-card-subtitle class="caption font-weight-light white--text font-italic">Besoin total en Energie par an</v-card-subtitle>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light red--text">
                      <v-icon small class="red--text darken-3">mdi-alert-outline</v-icon>
                      Eclairage
                    </span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <v-data-table :headers="headers3" :items="final.equipementOptions" :items-per-page="10" class="mb-3" hide-default-footer>
                        <template v-slot:item.action="{ item }">
                          <v-chip light class="ma-2 elevation-5 white--text" color="grey darken-3" @click="editItem(item, 'equipementOptions')">
                            <v-avatar left><v-icon small>mdi-pencil-outline</v-icon></v-avatar>
                            <span>Modifier</span>
                          </v-chip>
                          <v-chip light class="ma-2 elevation-5 white--text" color="red darken-3" @click="deleteItem(item, 'equipementOptions')">
                            <v-avatar left><v-icon small>mdi-delete-outline</v-icon></v-avatar>
                            <span>Supprimer</span>
                          </v-chip>
                        </template>
                        <template v-slot:no-data>
                          <p class="dark mt-5">Aucune donnée enrégistrée pour le moment</p>
                        </template>
                      </v-data-table>
                    </v-card>
                    <div class="pa-3">
                      <v-chip light class="ma-2 elevation-5 white--text" color="amber darken-3" @click="dialogToShow = 'equipementOptions', dialog = !dialog">
                        <v-avatar left><v-icon small>mdi-plus</v-icon></v-avatar>
                        <span>Ajouter</span>
                      </v-chip>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
            <div class="right-content">
              <v-container>
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                      <v-icon small class="grey--text darken-3">mdi-alert-outline</v-icon>
                      Informations utiles
                    </span>
                    <v-card flat tile class="my-2 pa-2 rounded-container-inside">
                      <span class="d-inline-block px-2 pt-3 light-blue--text">Aide</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Afin de réduire les besoins énergétiques calculés ici et ainsi réduire le coût initial d'inverstissement, une feuille d'économie d'énergie vous est proposée. Entrez chaque équipment affecté de leurs puissances ainsi que leur temps d'utilisation en cliquant sur le bouton jaune (+) </span>
                    </v-card>
                    <v-card class="rounded-container-inside pa-2">
                      <v-img src="@/assets/static/img/ak.png"/>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 4">
            <div class="left-content">
              <v-container>
                <v-layout wrap>
                  <v-flex sm12 xs12 md6 lg6 class="pa-1">
                    <span class="caption font-weight-light grey--text">Entrer le coefficient d'extension (%)</span>
                    <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Entrer le coefficient " v-model="final.coefficient" small-chips solo :items="coefficients"></v-select>
                    <!-- OK -->
                    <span class="caption font-weight-light orange--text">Besoins d'énergie journalier</span>
                    <v-card color="yellow darken-3" flat tile class="mt-2 mb-5 rounded-container-inside animate-in">
                      <v-card-title class="display-1 white--text font-weight-black">{{ besoinEnergetiqueJournalier }} <span class="caption font-weight-lighter"> Kwh / Jrs</span></v-card-title>
                    </v-card>
                    <!-- OK -->
                    <span class="caption font-weight-light grey--text">Choisir la température de fontionnement des batteries</span>
                    <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Entrer la température de fontionnement de batteries" v-model="final.temperature" small-chips solo :items="temperatures" @change="setBEJ"></v-select>
                    <!-- OK -->
                    <span class="caption font-weight-light grey--text">Mode d'Intégration</span>
                    <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Entrer la condition qui représente le mieux votre système"  v-model="final.conditionnement" small-chips solo :items="conditionnementsToShow"></v-select>
                  </v-flex> <!-- OK -->
                  <v-flex sm12 xs12 md6 lg6 class="pa-1">
                    <v-layout wrap>
                      <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                        <span class="caption font-weight-light orange--text">Irradiation du site</span>
                        <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                          <v-card-title class="display-1 white--text font-weight-black">{{ final.irradiationDefavorable }} <span class="caption font-weight-lighter"> Kwh / m² / Jrs</span></v-card-title>
                        </v-card>
                      </v-flex>
                      <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                        <span class="caption font-weight-light orange--text">Tension du Système</span>
                        <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                          <v-card-title class="display-1 white--text font-weight-black">{{ final.tensionSysteme }} <span class="caption font-weight-lighter"> V</span></v-card-title>
                        </v-card>
                      </v-flex>
                      <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 text-truncate">
                        <span class="caption font-weight-light grey--text">Profondeur de décharge (%)</span>
                        <v-select flat tile class="mt-0 mb-1 rounded-container-inside editable no-change" label="Profondeur de décharge de la batterie (PD)" v-model="final.profondeur" small-chips solo :items="profondeurs"></v-select>
                      </v-flex>
                      <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                        <span class="caption font-weight-light orange--text">Coefficient de température</span>
                        <v-card color="yellow darken-3" flat tile class="mt-2 mb-2 rounded-container-inside animate-in">
                          <v-card-title class="display-1 white--text font-weight-black">{{ coefficientTemperature }}</v-card-title>
                        </v-card>
                      </v-flex>
                      <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                        <span class="caption font-weight-light orange--text">Ratio de performance (PR)</span>
                        <v-card color="yellow darken-3" flat tile class="mt-2 mb-2 rounded-container-inside animate-in">
                          <v-card-title class="display-1 white--text font-weight-black">{{ ratioPerformence }}</v-card-title>
                        </v-card>
                      </v-flex>
                      <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 text-truncate">
                        <span class="caption font-weight-light grey--text">Nombre de jours d'autonomie</span>
                        <v-select flat tile class="mt-1 mb-5 rounded-container-inside editable no-change" label="Nombre de jours" v-model="final.nbrJour" small-chips solo :items="nbrJours"></v-select>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout wrap>
                  <v-flex sm12 xs12 md3 lg3 class="pa-1">
                    <span class="body-2 font-weight-light secondary--text">Estimation de la capacité </span>
                    <v-card color="secondary" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="display-1 font-weight-black white--text">{{ estimationCapacite }} <span class="caption font-weight-lighter"> Ah</span></v-card-title>
                      <v-card-subtitle class="caption font-weight-light white--text font-italic">Besoin total en puissance (Ah)</v-card-subtitle>
                    </v-card>
                  </v-flex>
                  <v-flex sm12 xs12 md3 lg3 class="pa-1">
                    <span class="body-2 font-weight-light indigo--text">Puissance avant installation (Wc) </span>
                    <v-card color="indigo darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="display-1 font-weight-black white--text">{{ firstLoadedValue }} <span class="caption font-weight-lighter">KWc</span></v-card-title>
                      <v-card-subtitle class="caption font-weight-light white--text font-italic text-truncate">Besoin total en puissance Avant Installation (Wc)</v-card-subtitle>
                    </v-card>
                  </v-flex>
                  <v-flex sm12 xs12 md3 lg3 class="pa-1">
                    <span class="body-2 font-weight-light red--text">Nouvelle Puissance (Wc) </span>
                    <v-card color="red darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="display-1 font-weight-black white--text">{{ roundDecimal(Math.abs(besoinEnergetiqueJournalier / (ratioPerformence * final.irradiationDefavorable))) }} <span class="caption font-weight-lighter"> Wc</span></v-card-title>
                      <v-card-subtitle class="caption font-weight-light white--text font-italic">Besoin total en puissance</v-card-subtitle>
                    </v-card>
                  </v-flex>
                  <v-flex sm12 xs12 md3 lg3 class="pa-1">
                    <span class="body-2 font-weight-light green--text">Puissance à installer (Wc) </span>
                    <v-card color="green darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="display-1 font-weight-black white--text">{{ roundDecimal(Math.abs(firstLoadedValue - besoinEnergetiqueJournalier / (ratioPerformence * final.irradiationDefavorable))) }} <span class="caption font-weight-lighter"> Wc</span></v-card-title>
                      <v-card-subtitle class="caption font-weight-light white--text font-italic">Besoin total en puissance</v-card-subtitle>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
            <div class="right-content">
              <v-container class="no-space">
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                        <v-icon small class="grey--text darken-3">mdi-alert-outline</v-icon>
                        Informations utiles
                      </span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Afin d'améliorer l'éficacité énergétique, remplissez de la gauche vers la droite en cliquant juste sur chaque plage de la couleur grise puis choisir le type défini</span>
                      <v-divider></v-divider>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Choisir toutes les étapes sans sauter</span>
                    </v-card>
                    <v-card class="rounded-container-inside">
                      <v-img src="@/assets/static/img/aj.png"/>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 5">
            <div class="left-content">
              <v-container>
                <v-layout wrap>
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Fabriquant Batterie</span>
                      <v-select clearable flat tile class="mt-2 mb-5 mr-4 rounded-container-inside editable no-change" label="Quel est le Fabriquant ?" v-model="final.fabriquantBatterie" @change="setTypeBatterieToShow()" small-chips solo :items="fabriquantsBatterieToShow"></v-select>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap>
                  <v-row class="pa-2" v-show="final.fabriquantBatterie" v-for="(item, id) in typesBatterieToShow" :key="id">
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Type Batterie</span>
                      <v-text-field flat disabled tile class="mt-2 mb-5 rounded-container-inside editable no-change animate-in" solo :value="item"></v-text-field>
                    </v-flex>
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Capacités Batterie</span>
                      <v-select clearable flat tile class="mt-2 mb-5 rounded-container-inside editable no-change animate-in" v-model="final.capaciteBatterie[id]" small-chips solo :items="capacitesBatterieToShow" @change="setCapaciteBatterieToShowOnDatatable(id)"></v-select>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap v-show="final.capaciteBatterie.length > 0">
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Batterie en série</span>
                      <v-card color="yellow darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesBatterieToShowOnDatatable[0]) !== 'undefined'" class="display-1 font-weight-black white--text">{{ Math.ceil(final.tensionSysteme / capacitesBatterieToShowOnDatatable[0].tension) }} </v-card-title>
                        <v-card-title v-else class="display-1 font-weight-black white--text"> ... </v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Branche en parallèle</span>
                      <v-card color="yellow darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesBatterieToShowOnDatatable[0]) !== 'undefined'" class="display-1 font-weight-black white--text text-truncate">{{ Math.ceil(capaciteTotale / capacitesBatterieToShowOnDatatable[0].capacite) }} </v-card-title>
                        <v-card-title v-else class="display-1 font-weight-black white--text"> ... </v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Tension du parc de batterie</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="display-1 white--text font-weight-black">{{ final.tensionSysteme }} <span class="caption font-weight-lighter"> V</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Capacité globale du parc de batterie</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="display-1 white--text font-weight-black">{{ Math.ceil(capaciteTotale) }}</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Nombre total de batterie</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesBatterieToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ Math.ceil(capaciteTotale / capacitesBatterieToShowOnDatatable[0].capacite) * Math.ceil(final.tensionSysteme / capacitesBatterieToShowOnDatatable[0].tension) }}</v-card-title>
                        <v-card-title v-else class="display-1 font-weight-black white--text"> ... </v-card-title>
                      </v-card>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap>
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Fabriquant Panneau</span>
                      <v-select clearable flat tile class="mt-2 mb-5 mr-4 rounded-container-inside editable no-change" label="Quel est le Fabriquant ?" v-model="final.fabriquantPanneau" @change="setTypePanneauToShow()" small-chips solo :items="fabriquantsPanneauToShow"></v-select>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap>
                  <v-row class="pa-2" v-show="final.fabriquantPanneau" v-for="(item, id) in typesPanneauToShow" :key="id">
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Type Panneau</span>
                      <v-text-field flat disabled tile class="mt-2 mb-5 rounded-container-inside editable no-change animate-in" solo :value="item"></v-text-field>
                    </v-flex>
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Capacités Panneau</span>
                      <v-select clearable flat tile class="mt-2 mb-5 rounded-container-inside editable no-change animate-in" label="Quel type de besoin doit être ouvert ?" v-model="final.capacitePanneau[id]" @change="setCapacitePanneauToShowOnDatatable(id)" small-chips solo :items="capacitesPanneauToShow"></v-select>
                    </v-flex>
                  </v-row>
                  <v-row v-show="final.capacitePanneau.length > 0">
                    <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 text-truncate" v-show="final.capacitePanneau">
                      <v-card flat tile class="my-2 rounded-container-inside animate-in">
                        <v-data-table :headers="headers7" :items="capacitesPanneauToShowOnDatatable" :items-per-page="10" class="mb-3" hide-default-footer>
                          <template v-slot:item.action="{ item }">
                            <v-btn outlined dark fab class="elevation-3" width="30" height="30" color="grey darken-3">
                              <v-icon small @click="editItem(item, 'poseOptions')">mdi-pencil-outline</v-icon>
                            </v-btn>
                          </template>
                          <template v-slot:no-data>
                            <p class="dark mt-5">Aucune donnée enrégistrée pour le moment</p>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap v-show="final.capacitePanneau">
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">T° min</span>
                      <v-select v-if="final.temperatureFontionnementMin.length === 0" flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Dispositif de protection ?" v-model="editedTemperatureFontionnementMin" @change="setTemperatureMin" small-chips solo :items="temperatureFontionnement"></v-select>
                      <v-select  v-if="final.temperatureFontionnementMin.length > 0" flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Dispositif de protection ?" v-model="final.temperatureFontionnementMin[0].text" @change="setTemperatureMin2" small-chips solo :items="temperatureFontionnement"></v-select>
                    </v-flex>
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">T° max</span>
                      <v-select v-if="final.temperatureFontionnementMax.length === 0" flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Dispositif de protection ?" v-model="editedTemperatureFontionnementMax" @change="setTemperatureMax" small-chips solo :items="temperatureFontionnement"></v-select>
                      <v-select  v-if="final.temperatureFontionnementMax.length > 0" flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Dispositif de protection ?" v-model="final.temperatureFontionnementMax[0].text" @change="setTemperatureMax2" small-chips solo :items="temperatureFontionnement"></v-select>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Nombre de Panneaux</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesPanneauToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ Math.ceil(roundDecimal(puissanceAInstaller * 1000 / capacitesPanneauToShowOnDatatable[0].puissanceNominale)) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Puissance T du champs</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="display-1 white--text font-weight-black">{{ roundDecimal(puissanceAInstaller * 1000) }}</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">K min</span>
                      <v-card v-if="final.temperatureFontionnementMin.length > 0" color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="display-1 white--text font-weight-black">{{ final.temperatureFontionnementMin[0].coef }}</v-card-title>
                      </v-card>
                      <v-card v-else color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">K max</span>
                      <v-card v-if="final.temperatureFontionnementMax.length > 0" color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="display-1 white--text font-weight-black">{{ final.temperatureFontionnementMax[0].coef }}</v-card-title>
                      </v-card>
                      <v-card v-else color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Surface Instalée (m²)</span>
                      <v-card v-if="capacitesPanneauToShowOnDatatable.length > 0 && final.conditionnement.length > 0" color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesPanneauToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ roundDecimal(capacitesPanneauToShowOnDatatable[0].surface * puissanceAInstaller * 1000 / capacitesPanneauToShowOnDatatable[0].puissanceNominale) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                  </v-row>
                </v-layout>
              </v-container>
            </div>
            <div class="right-content">
              <v-container class="no-space">
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                      <v-icon small class="grey--text darken-3">mdi-alert-outline</v-icon>
                      Informations utiles
                    </span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <span class="d-inline-block px-2 pt-3">Remarque</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Veuillez respecter les contraintes suivantes dans le choix du régulateur : <br> IR = {{ 0.98 * Math.abs(firstLoadedValue - besoinEnergetiqueJournalier / (ratioPerformence * final.irradiationDefavorable)) / final.tensionSysteme }} A</span>
                    </v-card>
                    <v-card class="rounded-container-inside">
                      <v-img src="@/assets/static/img/aa.png"/>
                    </v-card>
                    <v-card class="rounded-container-inside mt-2">
                      <v-img src="@/assets/static/img/ac.png"/>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 6">
            <div class="left-content">
              <v-container>
                <v-layout wrap>
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Fabriquant Regulateur</span>
                      <v-select clearable flat tile class="mt-2 mb-5 mr-4 rounded-container-inside editable no-change" label="Quel est le Fabriquant ?" v-model="final.fabriquantRegulateur" @change="setTypeRegulateurToShow()" small-chips solo :items="fabriquantsRegulateurToShow"></v-select>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap>
                  <v-row class="pa-2" v-show="final.fabriquantRegulateur" v-for="(item, id) in typesRegulateurToShow" :key="id">
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Type Regulateur</span>
                      <v-text-field flat disabled tile class="mt-2 mb-5 rounded-container-inside editable no-change animate-in" solo :value="item"></v-text-field>
                    </v-flex>
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Capacités Regulateur</span>
                      <v-select clearable flat tile class="mt-2 mb-5 rounded-container-inside editable no-change animate-in" v-model="final.capaciteRegulateur[id]" small-chips solo :items="capacitesRegulateurToShow" @change="setCapaciteRegulateurToShowOnDatatable(id)"></v-select>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap>
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Fabriquant Onduleur</span>
                      <v-select clearable flat tile class="mt-2 mb-5 mr-4 rounded-container-inside editable no-change" label="Quel est le Fabriquant ?" v-model="final.fabriquantOnduleur" @change="setTypeOnduleurToShow()" small-chips solo :items="fabriquantsOnduleurToShow"></v-select>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap>
                  <v-row class="pa-2" v-show="final.fabriquantOnduleur" v-for="(item, id) in typesOnduleurToShow" :key="id">
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Type Onduleur</span>
                      <v-text-field flat disabled tile class="mt-2 mb-5 rounded-container-inside editable no-change animate-in" solo :value="item"></v-text-field>
                    </v-flex>
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Capacités Onduleur</span>
                      <v-select clearable flat tile class="mt-2 mb-5 rounded-container-inside editable no-change animate-in" v-model="final.capaciteOnduleur[id]" small-chips solo :items="capacitesOnduleurToShow" @change="setCapaciteOnduleurToShowOnDatatable(id)"></v-select>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap>
                  <v-row class="pa-2">
                    <!-- Next -->
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Nombre panneau en série validé par régulateur</span>
                      <v-text-field flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" v-model="final.NombrePanneauSerieValide" small-chips solo />
                    </v-flex>
                    <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Nombre chaine en parallèle validé par régulateur</span>
                      <v-text-field flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" v-model="final.nbrChaineParallele" small-chips solo />
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Min panneaux série</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesRegulateurToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ Math.ceil(roundDecimal(capacitesRegulateurToShowOnDatatable[0].tensionMin / (capacitesPanneauToShowOnDatatable[0].tensionVoc * final.temperatureFontionnementMax[0].coef))) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Max panneaux série</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesRegulateurToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ Math.ceil(roundDecimal(capacitesRegulateurToShowOnDatatable[0].tensionMax / (capacitesPanneauToShowOnDatatable[0].tensionVoc * final.temperatureFontionnementMin[0].coef))) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Max branches parallèle</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesRegulateurToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ Math.ceil(roundDecimal(capacitesRegulateurToShowOnDatatable[0].courantEntree / (1.25 * capacitesPanneauToShowOnDatatable[0].courantIsc))) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Nombre régulateur</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesRegulateurToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ Math.ceil(roundDecimal(puissanceAInstaller * 1000 / capacitesRegulateurToShowOnDatatable[0].puissanceNominale)) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate" v-if="capacitesOnduleurToShowOnDatatable.length > 0">
                      <span class="caption font-weight-light orange--text">Nombre Onduleur</span>
                      <v-card color="yellow darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesRegulateurToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ Math.ceil(roundDecimal(final.dimmentionnementDetails.pt * 1000 / capacitesOnduleurToShowOnDatatable[0].puissanceNominale)) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <!-- NExt -->
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light secondary--text">Tension à puissance maximale (Vmpp)</span>
                      <v-card color="secondary" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesPanneauToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ roundDecimal(final.nbrPanneauSerieValide * capacitesPanneauToShowOnDatatable[0].tensionMax) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light red--text">Courant à puissance maximale (Impp)</span>
                      <v-card color="red darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesPanneauToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ roundDecimal(final.nbrChaineParallele * capacitesPanneauToShowOnDatatable[0].courantMax) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light indigo--text">Tension en circuit ouvert (Voc)</span>
                      <v-card color="indigo darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesPanneauToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ roundDecimal(final.nbrPanneauSerieValide * capacitesPanneauToShowOnDatatable[0].tensionVoc) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light green--text">Courant de court-circuit (Isc)</span>
                      <v-card color="green darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title v-if="typeof(capacitesPanneauToShowOnDatatable[0]) !== 'undefined'" class="display-1 white--text font-weight-black">{{ roundDecimal(final.nbrChaineParallele * capacitesPanneauToShowOnDatatable[0].courantIsc) }}</v-card-title>
                        <v-card-title v-else class="display-1 white--text font-weight-black">...</v-card-title>
                      </v-card>
                    </v-flex>
                  </v-row>
                </v-layout>
              </v-container>
            </div>
            <div class="right-content">
              <v-container class="no-space">
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                        <v-icon small class="grey--text darken-3">mdi-alert-outline</v-icon>
                        Informations utiles
                      </span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <span class="d-inline-block px-2 pt-3">Remarque</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Veuillez respecter les contraintes suivantes dans le choix de l'onduleur : <br> P<small>onduleur</small> = {{ 1200 * roundDecimal(final.dimmentionnementDetails.pt) }} W</span>
                      <v-divider></v-divider>
                      <span class="d-inline-block px-2 pt-3">Consigne</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Après avoir choisi le type de panneau appuyer sur valiser</span>
                    </v-card>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <span class="d-inline-block px-2 pt-3">Remarque</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Avant tout choix, assurez vous que l'Intensté du régulateur est supérieur ou égale à l'Itensité admissible du Régulateur <br/> Ir = {{ 0.98 * roundDecimal(puissanceAInstaller) / final.tensionSysteme }} </span>
                    </v-card>
                    <v-card class="rounded-container-inside">
                      <v-img src="@/assets/static/img/ag.png"/>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 7">
            <div class="left-content">
              <v-container>
                <span class="body-1 font-weight-light amber--text text--darken-3">Côté champ</span>
                <v-layout wrap>
                  <span class="body-2 font-weight-light grey--text">Connectivité côté générateur PV</span>
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 text-truncate" v-show="final.capacitePanneau">
                      <v-card flat tile class="my-2 rounded-container-inside animate-in">
                        <v-data-table :headers="headers7" :items="capacitesPanneauToShowOnDatatable" :items-per-page="10" class="mb-3" hide-default-footer>
                          <template v-slot:item.action="{ item }">
                            <v-btn outlined dark fab class="elevation-3" width="30" height="30" color="grey darken-3">
                              <v-icon small @click="editItem(item, 'poseOptions')">mdi-pencil-outline</v-icon>
                            </v-btn>
                          </template>
                          <template v-slot:no-data>
                            <p class="dark mt-5">Aucune donnée enrégistrée pour le moment</p>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Carractéristiques sous-champs connecté à une boite de jonction</span>
                      <v-card flat tile class="my-2 rounded-container-inside animate-in">
                        <v-data-table :headers="headers70" :items="capacitesPanneauToShowOnDatatable" :items-per-page="10" class="mb-3" hide-default-footer>
                          <template v-slot:item.tensionMax="{ item }">
                            <span> {{ final.nbrPanneauSerie * item.tensionMax + ' Vmpp' }} </span>
                          </template>
                          <template v-slot:item.courantMax="{ item }">
                            <span> {{ final.nbrPanneauParallele * item.courantMax + ' Impp' }} </span>
                          </template>
                          <template v-slot:item.tensionVoc="{ item }">
                            <span> {{ final.nbrPanneauSerie * item.tensionVoc + ' Voc' }} </span>
                          </template>
                          <template v-slot:item.courantIsc="{ item }">
                            <span> {{ final.nbrPanneauParallele * item.courantIsc + ' Isc' }} </span>
                          </template>
                          <template v-slot:item.action="{ item }">
                            <v-chip light class="ma-2 elevation-5 white--text" color="grey darken-3" @click="editItem(item, 'capacitePanneauOptions')">
                              <v-avatar left><v-icon small>mdi-pencil-outline</v-icon></v-avatar>
                              <span>Modifier</span>
                            </v-chip>
                          </template>
                          <template v-slot:no-data>
                            <p class="dark mt-5">Aucune donnée enrégistrée pour le moment</p>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap>
                  <span class="body-2 font-weight-light grey--text">Estimation de protection contre surintensité et section de câble entre Panneau(x) et boite de jonction</span>
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Dispositif de protection utilisé</span>
                      <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Dispositif de protection ?" v-model="final.dispositifProtection" small-chips solo :items="dispositifProtection"></v-select>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Caractéristiques du câble utilisé</span>
                      <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="câble utilisé ?" @change="setResistivite" v-model="final.cableUtilise" small-chips solo :items="cableUtilise"></v-select>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Résistivité</span>
                      <v-text-field disabled flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Résistivité" v-model="final.resistivite" small-chips solo></v-text-field>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Choisir la température maximale</span>
                      <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Température Maximale" v-model="final.temperatureMax" small-chips solo :items="temperatureMax"></v-select>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light secondary--text">Courant d'emploie du cable B </span>
                      <v-card color="secondary" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-light">{{ roundDecimal(capacitesPanneauToShowOnDatatable[0].courantMax * 1.27) }} <span class="caption font-weight-lighter"> A</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light indigo--text">Courant assigné de la protection </span>
                      <v-card color="indigo darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-light">{{ roundDecimal(capacitesPanneauToShowOnDatatable[0].courantIsc * 1.25 * 1.1) }} &#10877; IN (A) &#10877; {{ roundDecimal(capacitesPanneauToShowOnDatatable[0].courantIsc * 2) }}</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light green--text">Tension assigné de la protection </span>
                      <v-card color="green darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-light">IN (V) &#10877; {{ roundDecimal(capacitesPanneauToShowOnDatatable[0].tensionVoc * 1.2) }}</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light red--text">Section de câble utilisé </span>
                      <v-card color="red darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-light">{{ roundDecimal(((capacitesPanneauToShowOnDatatable[0].courantMax * 1.27) * final.resistivite * capacitesPanneauToShowOnDatatable[0].longueur) / (capacitesPanneauToShowOnDatatable[0].tensionMax * 1.2 * 0.03)) }} <span class="caption font-weight-lighter"> mm²</span></v-card-title>
                      </v-card>
                    </v-flex>
                  </v-row>
                </v-layout>
                <v-layout wrap>
                  <span class="body-2 font-weight-light grey--text">Estimation de protection contre surintensité et section de câble entre Boite de Jonction et Régulateur</span>
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Dispositif de protection utilisé</span>
                      <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Dispositif de protection ?" v-model="final.dispositifProtection" small-chips solo :items="dispositifProtection"></v-select>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Câble utilisé</span>
                      <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="câble utilisé ?" @change="setResistivite" v-model="final.cableUtilise" small-chips solo :items="cableUtilise"></v-select>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Résistivité</span>
                      <v-text-field disabled flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Résistivité" v-model="final.resistivite" small-chips solo></v-text-field>
                    </v-flex>
                    <v-flex sm12 xs12 md2 lg2 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Température max</span>
                      <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Longueur entre Bj et Régulateur" v-model="final.temperatureMax" small-chips solo :items="temperatureMax"></v-select>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Longueur entre Bj et Régulateur</span>
                      <v-text-field flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" label="Longueur entre Bj et Régulateur" v-model="final.longueurBjR" small-chips solo />
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light secondary--text">Courant d'emploie du cable B </span>
                      <v-card color="secondary" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-light">{{ roundDecimal(capacitesPanneauToShowOnDatatable[0].courantMax * 1.27) }} <span class="caption font-weight-lighter"> A</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light indigo--text">Courant assigné de la protection </span>
                      <v-card color="indigo darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-light">{{ roundDecimal(capacitesPanneauToShowOnDatatable[0].courantIsc * 1.25 * 1.1) }} &#10877; IN (A) &#10877; {{ roundDecimal(capacitesPanneauToShowOnDatatable[0].courantIsc * 2) }}</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light green--text">Tension assigné de la protection </span>
                      <v-card color="green darken-3" flat tile class="mt-2 mb-3 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-light">IN (V) &#10877; {{ roundDecimal(capacitesPanneauToShowOnDatatable[0].tensionVoc * 1.2) }}</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light red--text">Section de câble utilisé </span>
                      <v-card color="red darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text">{{ roundDecimal(((capacitesPanneauToShowOnDatatable[0].courantMax * 1.27) * final.resistivite * final.longueurBjR * capacitesPanneauToShowOnDatatable[0].nbrParallele) / (capacitesPanneauToShowOnDatatable[0].tensionMax * capacitesPanneauToShowOnDatatable[0].nbrSerie * 0.03)) }} (mm²)</v-card-title>
                      </v-card>
                    </v-flex>
                  </v-row>
                </v-layout>
              </v-container>
            </div>
            <div class="right-content">
              <v-container class="no-space">
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                        <v-icon small class="grey--text darken-3">mdi-alert-outline</v-icon>
                        Informations utiles
                      </span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <span class="d-inline-block px-2 pt-3">Remarque</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Veuillez respecter les contraintes suivantes dans le choix du régulateur : <br> IR = ..... A</span>
                    </v-card>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <span class="d-inline-block px-2 pt-3">Remarque</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Le courant assigné du dispositif de protection est celui qui choisi est sur le marché et qui respecte les normes standards</span>
                    </v-card>
                    <v-card class="rounded-container-inside">
                      <v-img src="@/assets/static/img/af.png"/>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 8">
            <div class="left-content">
              <v-container>
                <v-layout wrap>
                  <v-row class="pa-2">
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light red--text">Puissance totale des charges</span>
                      <v-card color="red darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ roundDecimal(final.dimmentionnementDetails.pt) * 1000 }} <span class="caption font-weight-lighter"> W</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light green--text">Tension du parc de batteries</span>
                      <v-card color="green darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ final.tensionSysteme }} <span class="caption font-weight-lighter"> V</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light secondary--text">Courant de charge des batteries du régulateur</span>
                      <v-card color="secondary darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ capacitesPanneauToShowOnDatatable[0].tensionMax }} <span class="caption font-weight-lighter"> A</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light orange--text">Type de câble utilisé</span>
                      <v-card color="yellow darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ final.cableUtilise }}</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Résistivité du câble utilisé</span>
                      <v-card color="yellow darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ final.resistivite }} <span class="caption font-weight-lighter"> Ω / mm² / m</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light grey--text">Protection du câble utilisé</span>
                      <v-card color="yellow darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ final.dispositifProtection }}</v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 my-3">
                      <span class="body-2 font-weight-light grey--text">Estimation de la section de cable entre Parc de baterie et Onduleur / Régulateur</span>
                    </v-flex>
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light red--text">Courant d'emploi IB (A)</span>
                      <v-card color="red darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ roundDecimal(final.dimmentionnementDetails.pt * 1000 / final.tensionSysteme) }} <span class="caption font-weight-lighter"> A</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light green--text">Section du câble utilisé (mm²)</span>
                      <v-card color="green darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ roundDecimal((final.resistivite * final.longueurBjR * (final.dimmentionnementDetails.pt * 1000 / final.tensionSysteme)) / (0.03 * final.tensionSysteme)) }} <span class="caption font-weight-lighter"> mm²</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md4 lg4 class="pa-1 pl-5 text-truncate">
                      <span class="caption font-weight-light secondary--text">Intensité admissible de la protection: IN (A)</span>
                      <v-card v-if="roundDecimal(final.dimmentionnementDetails.pt * 1000 / final.tensionSysteme) > 16" color="secondary darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ roundDecimal(0.76 * 1.25 * capacitesPanneauToShowOnDatatable[0].courantIsc) }} <span class="caption font-weight-lighter"> A</span></v-card-title>
                      </v-card>
                      <v-card v-else color="secondary darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                        <v-card-title class="headline white--text font-weight-black">{{ roundDecimal(0.9 * 1.25 * capacitesPanneauToShowOnDatatable[0].courantIsc) }} <span class="caption font-weight-lighter"> A</span></v-card-title>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md12 lg12 class="pa-1 pl-5 my-3">
                      <span class="body-2 font-weight-light grey--text">Section de cable du système</span>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <v-layout wrap>
                        <v-flex sm12 xs12 md12 lg12 class="pa-1">
                          <span class="caption font-weight-light grey--text">Panneau le plus éloigné et la BJ / chutte de tension</span>
                        </v-flex>
                        <v-flex sm7 xs7 md7 lg7 class="pa-1">
                          <v-text-field flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" v-model="final.chuteTensionEloignePanneauBj" solo></v-text-field>
                        </v-flex>
                        <v-flex sm5 xs5 md5 lg5 class="pa-1">
                          <v-text-field disabled flat tile class="mt-2 mb-5 rounded-container-inside no-change" :value="roundDecimal((final.resistivite * capacitesPanneauToShowOnDatatable[0].courantMax) * (final.chuteTensionEloignePanneauBj + final.chuteTensionProchePanneauBj) / (capacitesPanneauToShowOnDatatable[0].nbrSerie * capacitesPanneauToShowOnDatatable[0].tensionMax * (final.resistivite * final.longueurBjR * (final.dimmentionnementDetails.pt * 1000 / final.tensionSysteme)) / (0.03 * final.tensionSysteme))) + ' %'" solo></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <v-layout wrap>
                        <v-flex sm12 xs12 md12 lg12 class="pa-1">
                          <span class="caption font-weight-light grey--text">Panneau le plus proche et la BJ / chutte de tension</span>
                        </v-flex>
                        <v-flex sm7 xs7 md7 lg7 class="pa-1">
                          <v-text-field flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" v-model="final.chuteTensionProchePanneauBj" solo></v-text-field>
                        </v-flex>
                        <v-flex sm5 xs5 md5 lg5 class="pa-1">
                          <v-text-field disabled flat tile class="mt-2 mb-5 rounded-container-inside no-change" :value="roundDecimal((final.resistivite * 2 * capacitesPanneauToShowOnDatatable[0].nbrParallele * capacitesPanneauToShowOnDatatable[0].courantMax) / (capacitesPanneauToShowOnDatatable[0].nbrSerie * capacitesPanneauToShowOnDatatable[0].tensionMax * (final.resistivite * final.longueurBjR * (final.dimmentionnementDetails.pt * 1000 / final.tensionSysteme)) / (0.03 * final.tensionSysteme))) + ' %'" solo></v-text-field>
                          <!-- <v-text-field v-show="final.chuteTensionEloignePanneauBj === 0 || final.chuteTensionProchePanneauBj === 0" disabled flat tile class="mt-2 mb-5 rounded-container-inside no-change" solo></v-text-field> -->
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <v-layout wrap>
                        <v-flex sm12 xs12 md12 lg12 class="pa-1">
                          <span class="caption font-weight-light grey--text">Boite de Jonction et Régulateur / chutte de tension</span>
                        </v-flex>
                        <v-flex sm7 xs7 md7 lg7 class="pa-1">
                          <v-text-field flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" v-model="final.chuteTensionRegulateurBj" solo></v-text-field>
                        </v-flex>
                        <v-flex sm5 xs5 md5 lg5 class="pa-1">
                          <v-text-field disabled flat tile class="mt-2 mb-5 rounded-container-inside no-change" :value="roundDecimal((final.resistivite * 2) * (final.dimmentionnementDetails.pt * 1000 / final.tensionSysteme) / ((final.resistivite * final.longueurBjR * (final.dimmentionnementDetails.pt * 1000 / final.tensionSysteme)) / (0.03 * final.tensionSysteme) * final.tensionSysteme)) + ' %'" solo></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex sm12 xs12 md3 lg3 class="pa-1 pl-5 text-truncate">
                      <v-layout wrap>
                        <v-flex sm12 xs12 md12 lg12 class="pa-1">
                          <span class="caption font-weight-light grey--text">Parc de batteries et Onduleur / Régulateur / chutte de tension</span>
                        </v-flex>
                        <v-flex sm7 xs7 md7 lg7 class="pa-1">
                          <v-text-field flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" v-model="final.chuteTensionBatOndulRegul" solo></v-text-field>
                        </v-flex>
                        <v-flex sm5 xs5 md5 lg5 class="pa-1">
                          <v-text-field disabled flat tile class="mt-2 mb-5 rounded-container-inside no-change" :value="roundDecimal((final.resistivite * 2) * (final.dimmentionnementDetails.pt * 1000 / final.tensionSysteme) / (((capacitesPanneauToShowOnDatatable[0].courantMax * 1.27) * final.resistivite * final.longueurBjR * capacitesPanneauToShowOnDatatable[0].nbrParallele) / (capacitesPanneauToShowOnDatatable[0].tensionMax * capacitesPanneauToShowOnDatatable[0].nbrSerie * 0.03) * final.tensionSysteme)) + ' %'" solo></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-row>
                </v-layout>
              </v-container>
            </div>
            <div class="right-content">
              <v-container class="no-space">
                <v-layout wrap>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                        <v-icon small class="grey--text darken-3">mdi-alert-outline</v-icon>
                        Informations utiles
                      </span>
                    <v-card flat tile class="my-2 rounded-container-inside">
                      <span class="d-inline-block px-2 pt-3">Remarque</span>
                      <span class="d-inline-block caption px-2 font-weight-light grey--text font-italic">Veuillez respecter les contraintes suivantes dans le choix du régulateur : <br> IR = ..... A</span>
                    </v-card>
                    <v-card class="rounded-container-inside">
                      <v-img src="@/assets/static/img/ak.png"/>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 9">
            <div class="full-content">
              <v-container style="margin: 0; min-width: 100%">
                <v-layout wrap style="margin: 0; width: 100%;">
                  <v-flex sm3 xs3 md3 lg3 class="pa-1 pl-5 text-truncate">
                    <span class="caption font-weight-light grey--text">Nombre d'année(s)</span>
                    <v-text-field flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" v-model="final.devisNbrAnnee" solo></v-text-field>
                  </v-flex>
                  <v-flex sm6 xs6 md3 lg3 class="pa-1 pl-5 text-truncate">
                    <span class="caption font-weight-light grey--text">Facteur d'émission</span>
                    <v-select flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" v-model="q0" small-chips solo :items="q0Values"></v-select>
                  </v-flex>
                  <v-flex sm3 xs3 md3 lg3 class="pa-1 pl-5 text-truncate">
                    <span class="caption font-weight-light grey--text">Quantité de CO2 émise (Kwh/An)</span>
                    <v-text-field disabled flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" :value="final.devisNbrAnnee * roundDecimal(final.dimmentionnementDetails.et) * q0" solo></v-text-field>
                  </v-flex>
                  <v-flex sm6 xs6 md3 lg3 class="pa-1 pl-5 text-truncate">
                    <span class="caption font-weight-light grey--text">TVA (%)</span>
                    <v-text-field flat tile class="mt-2 mb-5 rounded-container-inside editable no-change" v-model="final.devisTVA" solo @change="setTotalDevis()"></v-text-field>
                  </v-flex>
                  <v-flex sm12 xs12 md12 lg12 class="pa-1">
                    <span class="body-2 font-weight-light grey--text">
                      <v-icon small class="cyan--text darken-3">mdi-alert-outline</v-icon>
                      Dimensionnement - Estimation financière
                    </span>
                    <v-card color="cyan" flat tile class="my-2 rounded-container-inside">
                      <v-data-table style="background: transparent !important" :headers="headers8" :items="devisItems" :items-per-page="10" class="mb-3" hide-default-footer>
                        <template v-slot:item.action="{ item }">
                          <v-chip light class="ma-2 elevation-5 white--text" color="grey darken-3" @click="editItem(item, 'devisItem')">
                            <v-avatar left><v-icon small>mdi-pencil-outline</v-icon></v-avatar>
                            <span>Modifier</span>
                          </v-chip>
                        </template>
                        <template v-slot:no-data>
                          <p class="dark mt-5">Aucune donnée enrégistrée pour le moment</p>
                        </template>
                      </v-data-table>
                    </v-card>
                    <div class="pa-3" style="position: absolute; bottom: 160px; right: 50px">
                      <v-chip light class="ma-2 elevation-5 white--text" color="amber darken-3" @click="dialogToShow = 'devisItem', dialog = !dialog">
                        <v-avatar left><v-icon small>mdi-plus</v-icon></v-avatar>
                        <span>Ajouter</span>
                      </v-chip>
                    </div>
                  </v-flex>
                  <v-flex sm6 xs6 md4 lg4 class="pa-1 pl-5 text-truncate">
                    <span class="caption font-weight-light red--text">Prix total des équipements</span>
                    <v-card color="red lighten-1" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="headline white--text font-weight-black">{{ totalDevis.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }} <span class="caption font-weight-lighter"> Francs CFA</span></v-card-title>
                    </v-card>
                  </v-flex>
                  <v-flex sm6 xs6 md4 lg4 class="pa-1 pl-5 text-truncate">
                    <span class="caption font-weight-light red--text">Montant d'investissement</span>²
                    <v-card color="red" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="headline white--text font-weight-black">{{ (totalDevis * (11 / 10)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }} <span class="caption font-weight-lighter"> Francs CFA</span></v-card-title>
                    </v-card>
                  </v-flex>
                  <v-flex sm6 xs6 md4 lg4 class="pa-1 pl-5 text-truncate">
                    <span class="caption font-weight-light red--text">Montant Final</span>
                    <v-card color="red darken-3" flat tile class="my-2 rounded-container-inside animate-in">
                      <v-card-title class="headline white--text font-weight-black">{{ ((totalDevis * (11 / 10)) * (1 + final.devisTVA / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }} <span class="caption font-weight-lighter"> Francs CFA</span></v-card-title>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </div> <!-- OK -->
          <div :class="animation + ' rounded-container content'" v-if="activeStep === 10">
            <div class="full-content">
              <v-container style="margin: 0; min-width: 100%">
                <v-layout wrap style="margin: 0; width: 100%;">
                  <v-flex sm12 xs12 md3 lg3 class="pa-1">
                    <span class="caption font-weight-light grey--text">Système PV autonome</span>
                    <v-card flat tile class="mt-2 mb-3 rounded-container-inside">
                      <v-list dense v-show="currentSite !== null">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentSite.nom }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Nom du Client / Société</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ currentLocation.site + ' / ' + currentLocation.elevation }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Site géographique</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    <span class="caption font-weight-light grey--text">Bilan de puisssances et Energies</span>
                    <v-card flat tile class="mt-2 mb-4 rounded-container-inside">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ roundDecimal(final.dimmentionnementDetails.pt) + ' / ' + roundDecimal(final.dimmentionnementDetails.et) }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Puissance Totale (Kw) / Energie Journalière (Kw/Jrs)</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ final.nbrJour + ' / ' + final.irradiationDefavorable }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Nbre de jrs / Irradiation minimale (Kw/m²/Jrs)</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    <span class="caption font-weight-light grey--text">Parc de batteries (1)</span>
                    <v-card flat tile class="mt-2 mb-4 rounded-container-inside">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ final.fabriquantBatterie + ' / ' + final.typeBatterie }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Fabricant / Type de batterie</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ final.capaciteBatterie }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Carractéristiques de la batterie</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ Math.ceil(final.tensionSysteme / capacitesBatterieToShowOnDatatable[0].tension) + ' / ' + Math.ceil(capaciteTotale / capacitesBatterieToShowOnDatatable[0].capacite) }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Batteries en série / Branches en parrallèle</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ Math.ceil(capaciteTotale / capacitesBatterieToShowOnDatatable[0].capacite) * Math.ceil(final.tensionSysteme / capacitesBatterieToShowOnDatatable[0].tension) + ' / ' + Math.ceil(capaciteTotale) }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Nombre / Capacité globale</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    <span class="caption font-weight-light grey--text">Rapports Câbles</span>
                    <v-card flat tile class="mt-2 mb-5 rounded-container-inside">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ roundDecimal(capacitesPanneauToShowOnDatatable[0].surface * puissanceAInstaller * 1000 / capacitesPanneauToShowOnDatatable[0].puissanceNominale) + ' / ' + roundDecimal(capacitesPanneauToShowOnDatatable[0].surface * puissanceAInstaller * 1000 / capacitesPanneauToShowOnDatatable[0].puissanceNominale) }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Type / Résistivité</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-flex> <!-- OK -->
                  <v-flex sm12 xs12 md3 lg3 class="pa-1">
                    <span class="caption font-weight-light grey--text">Rapports Panneaux</span>
                    <v-card flat tile class="mt-2 mb-5 rounded-container-inside">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ final.fabriquantPanneau + ' / ' + final.typePanneau }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Fabricant / Type</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ final.capacitePanneau }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Carractéristiques du Panneau</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ roundDecimal(capacitesPanneauToShowOnDatatable[0].surface * puissanceAInstaller * 1000 / capacitesPanneauToShowOnDatatable[0].puissanceNominale) + ' / ' + roundDecimal(capacitesPanneauToShowOnDatatable[0].surface * puissanceAInstaller * 1000 / capacitesPanneauToShowOnDatatable[0].puissanceNominale) }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">CarSurface Occupée / Disponible</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ Math.ceil(roundDecimal(puissanceAInstaller * 1000 / capacitesPanneauToShowOnDatatable[0].puissanceNominale)) + ' / ' + roundDecimal(puissanceAInstaller * 1000) }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">NOmbre / Puissance Totale</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    <span class="caption font-weight-light grey--text">Rapports Régulateurs</span>
                    <v-card flat tile class="mt-2 mb-5 rounded-container-inside">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ final.fabriquantRegulateur + ' / ' + final.typeRegulateur }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Fabricant / Type</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ final.capaciteRegulateur }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Carractéristiques du Regulateur</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ Math.ceil(roundDecimal(puissanceAInstaller * 1000 / capacitesRegulateurToShowOnDatatable[0].puissanceNominale)) }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Nombre Total</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                    <span class="caption font-weight-light grey--text">Rapports Onduleurs</span>
                    <v-card flat tile class="mt-2 mb-5 rounded-container-inside">
                      <v-list dense>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ final.fabriquantOnduleur + ' / ' + final.typeOnduleur }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Fabricant / Type</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ final.capaciteOnduleur }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Carractéristiques de l'Onduleur</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{ Math.ceil(roundDecimal(final.dimmentionnementDetails.pt * 1000 / capacitesOnduleurToShowOnDatatable[0].puissanceNominale)) }}</v-list-item-title>
                            <v-list-item-subtitle class="caption font-weight-light grey--text font-italic">Nombre Total</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-flex> <!-- OK -->
                  <v-flex sm12 xs12 md6 lg6 class="pa-1 pl-5 text-truncate">
                    <span class="caption font-weight-light grey--text">Solution à supporter</span>
                    <v-flex sm12 xs12 md12 lg12 class="my-10">
                      <v-card class="mx-auto rounded-container-inside2">
                        <v-sheet class="v-sheet--offset mx-auto py-3 px-3 rounded-container-inside" elevation="10" max-width="calc(100% - 32px)">
                          <span class="caption grey--text">Irradiation Optimale (W/m²/jrs)</span>
                          <line-chart height="135px" :data="dataChart1"></line-chart>
                        </v-sheet>

                        <v-card-text class="pt-0">
                          <div class="title font-weight-light mb-2 red-text">Courbe d'Ensoleillement</div>
                          <div class="caption font-weight-light grey--text">Ensoleillement solaire</div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex sm12 xs12 md12 lg12 class="mt-15">
                      <v-card class="mx-auto rounded-container-inside2">
                        <v-sheet class="v-sheet--offset mx-auto py-3 px-3 rounded-container-inside" elevation="10" max-width="calc(100% - 32px)">
                          <span class="caption grey--text">Energie produite (Kwh)</span>
                          <column-chart height="135px" :colors="['indigo', '#fff']" :data="dataChart2"></column-chart>
                        </v-sheet>

                        <v-card-text class="pt-0">
                          <div class="title font-weight-light mb-2">Graphique de production</div>
                          <div class="subheading font-weight-light grey--text">La production de l'énergie en fonction de chaque moi</div>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-flex> <!-- OK -->
                </v-layout>
              </v-container>
            </div>
          </div>
          <div class="actions">
            <v-chip outlined color="amber darken-4" class="mr-3 elevation-5" dark tile v-if="activeStep > 0 && activeStep < formSteps.length" @click="prevStep">
              <v-avatar left><v-icon small>>mdi-chevron-left</v-icon></v-avatar>
              <span>Retour</span>
            </v-chip>
            <v-chip outlined color="amber darken-4" class="elevation-5" dark tile v-if="activeStep + 1 < formSteps.length" @click="nextStep">
              <v-avatar left><v-icon small>>mdi-chevron-right</v-icon></v-avatar>
              <span>Suivant</span>
            </v-chip>
          </div>
        </section>
      </article>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))
export default {
  data: () => {
    return {
      // VARIABLES INDÉPENDENTES DU WORKFLOW /////////////////////////////////////////////////////////////////////////////////////////
        dialog: false, // Formulaires relatifs à l'aboutissement du workflow
        dialogToShow: '', // Spécifie le formulaire à afficher
        
        stepValidated: false, // Indique si l'on peut passer à l'étape suivante
        editedIndex: -1, // Statut d'édition / Ajout

        animation: 'animate-in', // Animation du container
        formSteps: [
          { title: 'Installation Initiale ?' },
          { title: 'Données du Site' },
          { title: 'Phénomènes d\'Ombrage' },
          { title: 'Bilan des puissances / Bilan d\'Energies' },
          { title: 'Production Electrique' },
          { title: 'Dimensionnement Batterie / Panneau' },
          { title: 'Dimensionnement Régulateur / Onduleur' },
          { title: 'Dimensionnement des câbles de protection' },
          { title: 'Dimensionnement des câbles de protection' },
          { title: 'Bilan Financier' },
          { title: 'Rapports' }
        ], // toutes les étapes du workflow
        activeStep: 0, // Etape actuelle du workflow

        currentUser: null, // Utilisateur en cours
        currentSite: null, // Site sur lequel il travail
        currentSiteId: null, // ID du site en cours
        currentLocation: null, // zone d'activité en cours

      // STEP I VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        dialog2: false, // Mettre l'ancienne valeur si une installation avait été préalablement faite
        firstLoadedValue: 0, // Valeur de l'ancienne installation
        selectedOldState: false, // Statut d'un probable ancienne installation ou pas

      // STEP II VARIABLES ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        solutionsToShow: [], // Types de solutions supportées
        posesToShow: [], // Systèmes de poses utilisés
        headers1_1: [
          { text: '', value: 'element' },
          { text: 'Longueur (m)', value: 'longueur' },
          { text: 'Largeur (m)', value: 'largeur' },
          { text: 'Toit - Local (m)', value: 'distance' },
          { text: 'Inclinaison (°)', value: 'inclinaison' },
          { text: 'Surface (m²)', value: 'surface' },
          { text: '', value: 'action', sortable: false }
        ], // Entête des poses sur la surface de toiture
        headers1_2: [
          { text: 'Longueur (m)', value: 'longueur' },
          { text: 'Largeur (m)', value: 'largeur' },
          { text: 'Distance au Local (m)', value: 'distance' },
          { text: 'Surface (m²)', value: 'surface' },
          { text: '', value: 'action', sortable: false }
        ], // Entête des poses sur les autres surfaces
        poseOptionToiture: [ { element: 'PAN_1', longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { element: 'PAN_2', longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { element: 'PAN_3', longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { element: 'PAN_4', longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 } ], // Les paramètres de poses sur la toiture
        poseOptionAutres: [ { longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 } ], // Les paramètres de poses sur les autres surfaces
        editedPoseOptions: { element: null, longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, // Model de pose lors de la modification
        newPoseOptions: { element: null, longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, // Model de pose par défaut
      // STEP III VARIABLES //////////////////////////////////////////////////////////////////////////////////////////////////////////
        headers2: [
          { text: 'Obstacle', value: 'obstacle' },
          { text: 'H1 (m)', value: 'h1' },
          { text: 'D1 (m)', value: 'd1' },
          { text: 'α1 (°)', value: 'i1' },
          { text: 'H2 (m)', value: 'h2' },
          { text: 'D2 (m)', value: 'd2' },
          { text: 'α2 (°)', value: 'i2' },
          { text: 'H3 (m)', value: 'h3' },
          { text: 'D3 (m)', value: 'd3' },
          { text: 'α3 (°)', value: 'i3' },
          { text: 'H4 (m)', value: 'h4' },
          { text: 'D4 (m)', value: 'd4' },
          { text: 'α4 (°)', value: 'i4' },
          { text: '', value: 'action', sortable: false }
        ], // Entête des obstacles
        editedObstacleOptions: { obstacle: null, h1: null, d1: null, i1: null, h2: null, d2: null, i2: null, h3: null, d3: null, i3: null, h4: null, d4: null, i4: null }, // Model d'ostacle lors de la modification
        newObstacleOptions: { obstacle: null, h1: null, d1: null, i1: null, h2: null, d2: null, i2: null, h3: null, d3: null, i3: null, h4: null, d4: null, i4: null }, // Model d'obstacle par défaut
      // STEP IV VARIABLES ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        headers3: [
          { text: 'Equipements', value: 'equipement' },
          { text: 'Qté', value: 'qte' },
          { text: 'Temps Utilisation (h)', value: 'temps' },
          { text: 'Puissance Nominale (W)', value: 'pn' },
          { text: 'Puissance de démarage (W)', value: 'pdd' },
          { text: '', value: 'action', sortable: false }
        ], // Entêtes des équipements
        editedEquipementOptions: { equipement: null, qte: null, temps: null, pn: null, pdd: null },
        newEquipementOptions: { equipement: null, qte: null, temps: null, pn: null, pdd: null },
      // STEP V VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        coefficients: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'], // Coefficients d'extensions
        besoinEnergetiqueJournalier: null, // Besoin énergétique journalier
        editedFinalTemperature: null, // Valeur de la température de fonctionnement des batteries
        temperatures: [
          { text: '-20', temperature: '-20', coefficient: '0.80' },
          { text: '-10', temperature: '-10', coefficient: '0.85' },
          { text: '0', temperature: '0', coefficient: '0.90' },
          { text: '10', temperature: '10', coefficient: '0.85' },
          { text: '20', temperature: '20', coefficient: '1' },
          { text: '30', temperature: '30', coefficient: '1.04' },
          { text: '40', temperature: '40', coefficient: '1.10' },
          { text: '50', temperature: '50', coefficient: '1.13' }
        ], // Valeurs possibles de la température de fontionncment des batteries
        nbrJours: ['3', '4', '5', '6', '7', '8', '9', '10'], // Jours d'autonomie
        conditionnementsToShow: [], // Mode d'intégration
        profondeurs: ['50', '60', '65', '70', '80', '90', '100'], // Différentes valeurs possibles d la profondeur de décharge
        coefficientTemperature: 0, // Coefficient de température
        ratioPerformence: 0, // Ration de performance
        estimationCapacite: 0, // Estimation de la capacité
      // STEP VI VARIABLES ///////////////////////////////////////////////////////////////////////////////////////////////////////////
      fabriquantsBatterieToShow: [], // Chargement des différents fabiquants de batterie
      typesBatterieToShow: [], // Chargement des différents types de batterie
      capacitesBatterieToShow: [],  // Chargement des différents carractéristiques de batterie
      capacitesBatterieToShowOnDatatable: [], // Chargement des différents carractéristiques de batterie à afficher sur le datatable
      capaciteTotale: 0, // Capacité totale
      puissanceAInstaller: 0, // Puissance à installer

      countInitStep: 0,

      localisations: [],
      sites: [],
      poses: [],
      solutions: [],
      obstacles: [],
      equipements: [],
      conditionnements: [],
      dispositifProtection: ['Fusible', 'Disjoncteur'],
      cableUtilise: ['Cuivre', 'Alluminium'],
      temperatureMax: ['90', '120'],
      q0: 0,
      q0Values: ['0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
      temperatureFontionnement: [
        { text: 'Entre -6 et -10', coef: 1.14 },
        { text: 'Entre -1 et -5', coef: 1.23 },
        { text: 'Entre 4 et 0', coef: 1.21 },
        { text: 'Entre 9 et 5', coef: 1.08 },
        { text: 'Entre 14 et 10', coef: 1.06 },
        { text: 'Entre 19 et 15', coef: 1.04 },
        { text: 'Entre 20 et 24', coef: 1.02 },
        { text: 'Entre 25 et 30', coef: 1 },
        { text: 'Entre 50 et 55', coef: 0.91 },
        { text: 'Entre 64 et 60', coef: 0.89 },
        { text: 'Entre 69 et 65', coef: 0.87 },
        { text: 'Entre 74 et 70', coef: 0.85 }
      ],

      editedFinalCondition: null,
      fabriquantsBatterie: [],
      typesBatterie: [],
      capacitesBatterie: [],
      fabriquantsRegulateur: [],
      typesRegulateur: [],
      capacitesRegulateur: [],
      fabriquantsOnduleur: [],
      typesOnduleur: [],
      capacitesOnduleur: [],
      fabriquantsPanneau: [],
      typesPanneau: [],
      capacitesPanneau: [],

      realCapaticy: null,
      totalDevis: 0,

      obstaclesToShow: [],
      equipementsToShow: [],
      fabriquantsRegulateurToShow: [],
      fabriquantsOnduleurToShow: [],
      fabriquantsPanneauToShow: [],
      typesRegulateurToShow: [],
      typesOnduleurToShow: [],
      typesPanneauToShow: [],
      capacitesRegulateurToShow: [],
      capacitesRegulateurToShowOnDatatable: [],
      capacitesOnduleurToShow: [],
      capacitesOnduleurToShowOnDatatable: [],
      capacitesPanneauToShow: [],
      capacitesPanneauToShowOnDatatable: [],

      capaciteBatteries: [],
      capaciteRegulateurs: [],
      devisItems: [],

      editedDevisItem: { designation: null, qte: null, pu: null, pt: null },
      newDevisItem: { designation: null, qte: null, pu: null, pt: null },
      editedTemperatureFontionnementMin: null,
      editedTemperatureFontionnementMax: null,

      headers4: [
        { text: 'Capacité Nominale (Ah)', value: 'capacite' },
        { text: 'Tension (V)', value: 'tension' }
      ],
      headers5: [
        { text: 'Tension du système (V)', value: 'tensionSystème' },
        { text: 'Puissance nominal (W)', value: 'puissanceNominale' },
        { text: 'Nbr Entrée (PV)', value: 'nbrEntree' },
        { text: 'Tension min (V)', value: 'tensionMin' },
        { text: 'Tension max (V)', value: 'tensionMax' },
        { text: 'Courant d\'entrée (V)', value: 'courantEntree' }
      ],
      headers6: [
        { text: 'Puissance Nominale (Wc)', value: 'puissanceNominale' },
        { text: 'Puissance max Admissible (Wc)', value: 'puissanceAdmissibleMax' },
        { text: 'Nbr Entrée (PV)', value: 'nbrEntree' },
        { text: 'Tension min (V)', value: 'tensionMin' },
        { text: 'Tension max (V)', value: 'tensionMax' },
        { text: 'Courant max admissible (V)', value: 'courantMaxAdmissible' }
      ],
      headers7: [
        { text: 'Puissance Nominale (Wc)', value: 'puissanceNominale' },
        { text: 'Tension max (Vmpp)', value: 'tensionMax' },
        { text: 'Courant max (Impp)', value: 'courantMax' },
        { text: 'Tension circuit ouvert (Voc)', value: 'tensionVoc' },
        { text: 'Courant court-circuit (Isc)', value: 'courantIsc' },
        { text: 'Longueur (m)', value: 'longueur' },
        { text: 'Largeur (m)', value: 'largeur' },
        { text: 'Surface (m²)', value: 'surface' },
      ],
      headers70: [
        { text: 'Nombre de Panneaux en série', value: 'nbrSerie' },
        { text: 'Nombre de Panneaux en parallèle', value: 'nbrParallele' },
        { text: 'Tension max (Vmpp)', value: 'tensionMax' },
        { text: 'Courant max (Impp)', value: 'courantMax' },
        { text: 'Tension circuit ouvert (Voc)', value: 'tensionVoc' },
        { text: 'Courant court-circuit (Isc)', value: 'courantIsc' },
        { text: '', value: 'action', sortable: false }
      ],
      headers8: [
        { text: 'Désignation', value: 'designation' },
        { text: 'Quantité', value: 'qte' },
        { text: 'Prix Unitaire', value: 'pu' },
        { text: 'Prix Total', value: 'pt' },
        { text: '', value: 'action', sortable: false }
      ],

      final: {
        solution: null,
        pose: null,
        poseOptions: [],
        obstacleOptions: [],
        equipementOptions: [],
        dimmentionnementDetails: { pt: 0, et: 0 },
        irradiationDefavorable: 0,
        coefficient: 10,
        profondeur: 50,
        temperature: [],
        tensionSysteme: 12,
        temperatureFontionnementMin: [],
        temperatureFontionnementMax: [],
        conditionnement: [],
        nbrJour: 0,
        fabriquantBatterie: null,
        typeBatterie: null,
        capaciteBatterie: [],
        fabriquantRegulateur: null,
        typeRegulateur: null,
        capaciteRegulateur: [],
        fabriquantOnduleur: null,
        typeOnduleur: null,
        capaciteOnduleur: [],
        fabriquantPanneau: null,
        typePanneau: null,
        capacitePanneau: [],
        nbrPanneauSerie: 1,
        nbrPanneauParallele: 1,
        dispositifProtection: null,
        cableUtilise: null,
        resistivite: null,
        temperatureMax: null,
        longueurBjR: null,
        chuteTensionProchePanneauBj: null,
        chuteTensionEloignePanneauBj: null,
        chuteTensionRegulateurBj: null,
        chuteTensionBatOndulRegul: null,
        nbrPanneauSerieValide: null,
        nbrChaineParallele: null,
        devisTVA: 19.25,
        devisTransport: 0,
        devisMO: 0,
        devisMaintenance: 0,
        devisNbrAnnee: 20,
        devisBilanEnv: 0
      },

    }
  },
  watch: {
    dialog (val) { val || this.close() },
    dialog2 (val) { val || this.close() },
  },
  methods: {
    // GENERAL METHODS
      roundDecimal(nbr){
        // let precision = precision || 2
        let tmp = Math.pow(10, 2)
        return Math.round( nbr * tmp ) / tmp
      },

      close (elt) {
        this.dialog = false
        this.dialog2 = false
        setTimeout(() => {
          if (elt === 'obstacleOptions') {
            this.editedObstacleOptions = Object.assign({}, this.newObstacleOptions)
          } else if (elt === 'equipementOptions') {
            this.editedEquipementOptions = Object.assign({}, this.newEquipementOptions)
          }
          this.editedIndex = -1
        }, 300)
      },

      radiansToDegrees (radians) { return radians * (180 / Math.PI) },
      setAngle1 () { if(this.editedObstacleOptions.d1 !== null) { this.editedObstacleOptions.i1 = Math.ceil(this.radiansToDegrees(Math.atan(this.editedObstacleOptions.h1 / this.editedObstacleOptions.d1))) } },
      setAngle2 () { if(this.editedObstacleOptions.d2 !== null) { this.editedObstacleOptions.i2 = Math.ceil(this.radiansToDegrees(Math.atan(this.editedObstacleOptions.h2 / this.editedObstacleOptions.d2))) } },
      setAngle3 () { if(this.editedObstacleOptions.d3 !== null) { this.editedObstacleOptions.i3 = Math.ceil(this.radiansToDegrees(Math.atan(this.editedObstacleOptions.h3 / this.editedObstacleOptions.d3))) } },
      setAngle4 () { if(this.editedObstacleOptions.d4 !== null) { this.editedObstacleOptions.i4 = Math.ceil(this.radiansToDegrees(Math.atan(this.editedObstacleOptions.h4 / this.editedObstacleOptions.d4))) } },


      setFinalCondition () {
        this.conditionnementsToShow.forEach(cond => {
          if (cond.text === this.editedFinalCondition) {
            this.final.conditionnement.push(cond)
          }
        })
      },

      /** 
       * Active la modification d'un élément donné
       *  
       * @param {Object} item
       * @param {String} elt
       */
      editItem (item, elt) {
        if (elt === 'poseOptionToiture') {
          this.dialogToShow = 'poseOptionToiture'
          this.editedIndex = this.poseOptionToiture.indexOf(item)
          this.editedPoseOptions = Object.assign({}, item)
        } else if (elt === 'poseOptionAutres') {
          this.dialogToShow = 'poseOptionAutres'
          this.editedIndex = this.poseOptionAutres.indexOf(item)
          this.editedPoseOptions = Object.assign({}, item)
        } else if (elt === 'obstacleOptions') {
          this.dialogToShow = 'obstacleOptions'
          this.editedIndex = this.final.obstacleOptions.indexOf(item)
          this.editedObstacleOptions = Object.assign({}, item)
        } else if (elt === 'equipementOptions') {
          this.dialogToShow = 'equipementOptions'
          this.editedIndex = this.final.equipementOptions.indexOf(item)
          this.editedEquipementOptions = Object.assign({}, item)
        } else if (elt === 'capacitePanneauOptions') {
          this.dialogToShow = 'capacitePanneauOptions'
          this.editedIndex = 0
        } else if (elt === 'devisItem') {
          this.dialogToShow = 'devisItem'
          this.editedIndex = this.devisItems.indexOf(item)
          this.editedDevisItem = Object.assign({}, item)
        }
        this.dialog = true
      },

      /**
       * Supprime un élément donné
       * 
       * @param {Object} item
       * @param {String} elt
       */
      deleteItem (item, elt) {
        if (elt === 'poseOptions') {
          const index = this.poseOptions.indexOf(item)
          if (confirm('Êtes vous sûr de vouloir supprimer ?')) { this.poseOptions.splice(index, 1) }
        } else if (elt === 'obstacleOptions') {
          const index = this.final.obstacleOptions.indexOf(item)
          if (confirm('Êtes vous sûr de vouloir supprimer ?')) { this.final.obstacleOptions.splice(index, 1) }
        } else if (elt === 'equipementOptions') {
          const index = this.final.equipementOptions.indexOf(item)
          if (confirm('Êtes vous sûr de vouloir supprimer ?')) { this.final.equipementOptions.splice(index, 1) }
        } else if (elt === 'devisItem') {
          const index = this.devisItem.indexOf(item)
          if (confirm('Êtes vous sûr de vouloir supprimer ?')) { this.devisItem.splice(index, 1) }
        }
      },

      /**
       * Effectue la sauvegarde de l'élément en parramètre
       * 
       * @param {Object} elt
       */
      save (elt) {
        if (elt === 'poseOptionToiture') {
          this.editedPoseOptions.surface = this.editedPoseOptions.longueur * this.editedPoseOptions.largeur
          Object.assign(this.poseOptionToiture[this.editedIndex], this.editedPoseOptions)
        } else if (elt === 'poseOptionAutres') {
          this.editedPoseOptions.surface = this.editedPoseOptions.longueur * this.editedPoseOptions.largeur
          Object.assign(this.poseOptionAutres[this.editedIndex], this.editedPoseOptions)
        } else if (elt === 'obstacleOptions') {
          if (this.editedIndex > -1) {
            Object.assign(this.final.obstacleOptions[this.editedIndex], this.editedObstacleOptions)
          } else {
            this.final.obstacleOptions.push({
              obstacle: this.editedObstacleOptions.obstacle,
              h1: this.editedObstacleOptions.h1,
              d1: this.editedObstacleOptions.d1,
              i1: Math.ceil(this.editedObstacleOptions.i1),
              h2: this.editedObstacleOptions.h2,
              d2: this.editedObstacleOptions.d2,
              i2: Math.ceil(this.editedObstacleOptions.i2),
              h3: this.editedObstacleOptions.h3,
              d3: this.editedObstacleOptions.d3,
              i3: Math.ceil(this.editedObstacleOptions.i3),
              h4: this.editedObstacleOptions.h4,
              d4: this.editedObstacleOptions.d4,
              i4: Math.ceil(this.editedObstacleOptions.i4)
            })
          }
        } else if (elt === 'equipementOptions') {
          if (this.editedIndex > -1) {
            Object.assign(this.final.equipementOptions[this.editedIndex], this.editedEquipementOptions)
          } else {
            this.final.equipementOptions.push({
              equipement: this.editedEquipementOptions.equipement,
              qte: this.editedEquipementOptions.qte,
              temps: this.editedEquipementOptions.temps,
              pn: this.editedEquipementOptions.pn,
              pdd: this.editedEquipementOptions.pdd
            })
          }
          this.setDimmensionnementDetails()
        } else if (elt === 'capacitePanneauOptions') {
          this.capacitesPanneauToShowOnDatatable[0].nbrSerie = this.final.nbrPanneauSerie
          this.capacitesPanneauToShowOnDatatable[0].nbrParallele = this.final.nbrPanneauParallele
          this.setCapacitePanneauToShowOnDatatable()
        } else if (elt === 'devisItem') {
          if (this.editedIndex > -1) {
            this.editedDevisItem.pt = this.editedDevisItem.pu * this.editedDevisItem.qte
            Object.assign(this.devisItems[this.editedIndex], this.editedDevisItem)
          } else {
            this.devisItems.push({
              designation: this.editedDevisItem.designation,
              qte: this.editedDevisItem.qte,
              pu: this.editedDevisItem.pu,
              pt: this.editedDevisItem.pu * this.editedDevisItem.qte
            })
          }

          this.setTotalDevis()

          let data = JSON.stringify(this.devisItems)

          window.localStorage.setItem('jules-app-devis-' + this.currentSiteId, data)
        } else if (elt === 'oldState') {
          this.selectedOldState = true
          window.localStorage.setItem('jules-oldstate-' + this.currentSiteId, this.firstLoadedValue)
          this.nextStep()
        }
        this.close(elt)
      },

    // STEP V METHODS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      /** Détermine le besoin Energétique Journalier & La tention du système */
      setBEJ () {
        console.log('lllw²')
        this.besoinEnergetiqueJournalier = this.roundDecimal(this.final.dimmentionnementDetails.et * (1 + (this.final.coefficient / 100)))
        if (this.final.dimmentionnementDetails.et <= 1) {
          this.final.tensionSysteme = 12
        } else {
          if (this.final.dimmentionnementDetails.et <= 4) {
            this.final.tensionSysteme = 24
          } else {
            this.final.tensionSysteme = 48
          }
        }
        
        this.temperatures.forEach(elt => { if (elt.temperature === this.final.temperature) { this.coefficientTemperature = elt.coefficient } })
        this.conditionnements.forEach(elt => {
          if (this.final.conditionnement.includes(elt.label)) {
            if(this.final.conditionnement.includes('absence de mppt')) {
              this.ratioPerformence = elt.absenceMppt
            } else {
              this.ratioPerformence = elt.presenceMppt
            }
          }
        })

        this.estimationCapacite = this.roundDecimal((100 * this.final.nbrJour * this.besoinEnergetiqueJournalier / (this.final.profondeur * this.coefficientTemperature)))
      },
    
    // STEP VI METHODS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      setDimmensionnementDetails () {
        this.final.equipementOptions.forEach(equipment => {
          this.final.dimmentionnementDetails.pt += (equipment.pn * equipment.qte) / 1000
          this.final.dimmentionnementDetails.et += (equipment.pn * equipment.qte * equipment.temps) / 1000
        })
      },

      setFIVE() {
        this.capacitesRegulateurToShowOnDatatable = []
        this.capaciteTotale = (100 * this.final.nbrJour * (this.final.dimmentionnementDetails.et * (1 + (this.final.coefficient / 100)))) / (this.final.profondeur * this.coefficientTemperature)
        this.puissanceAInstaller = (this.final.dimmentionnementDetails.et * (1 + (this.final.coefficient / 100))) / (this.ratioPerformence * this.final.irradiationDefavorable)
      },

      setTypeBatterieToShow () {
        this.typesBatterieToShow = []
        this.typesBatterie.forEach(typeBat => { if (typeBat.fabriquants[0] === this.final.fabriquantBatterie) { this.typesBatterieToShow.push(typeBat.label) } })

        this.setCapaciteBatterieToShow()
      },

      setCapaciteBatterieToShow () {
        this.capacitesBatterieToShow = []
        this.capacitesBatterie.forEach(capBat => {
          capBat.text = capBat.capacite + ' (Ah) / ' + capBat.tension + ' (V)'
          this.capacitesBatterieToShow.push(capBat)
          this.capacitesBatterieToShowOnDatatable.push(capBat)
        })
      },

      setCapaciteBatterieToShowOnDatatable (id) {
        this.capacitesBatterieToShowOnDatatable.forEach(cbtsod => { if (cbtsod.text === this.final.capaciteBatterie[id]) { this.realCapacity = cbtsod } })
        this.capacitesBatterieToShowOnDatatable = []
        this.capacitesBatterieToShowOnDatatable.push(this.realCapacity)
        // this.realCapacity = null
      },

      setTypeRegulateurToShow () {
        this.typesRegulateurToShow = []
        this.typesRegulateur.forEach(typeBat => { if (typeBat.fabriquants[0] === this.final.fabriquantRegulateur) { this.typesRegulateurToShow.push(typeBat.label) } })
        this.setCapaciteRegulateurToShow()
      },

      setCapaciteRegulateurToShow () {
        this.capacitesRegulateurToShow = []
        this.capacitesRegulateur.forEach(capBat => {
          capBat.text = capBat.tensionSystème + ' (V) / ' + capBat.puissanceNominale + ' (W)'
          this.capacitesRegulateurToShow.push(capBat)
          this.capacitesRegulateurToShowOnDatatable.push(capBat)
        })
      },

      setCapaciteRegulateurToShowOnDatatable (id) {
        this.capacitesRegulateurToShowOnDatatable.forEach(cbtsod => { if (cbtsod.text === this.final.capaciteRegulateur[id]) { this.realCapacity = cbtsod } })
        this.capacitesRegulateurToShowOnDatatable = []
        this.capacitesRegulateurToShowOnDatatable.push(this.realCapacity)
        // this.realCapacity = null
      },

      setTypeOnduleurToShow () {
        this.typesOnduleurToShow = []
        this.typesOnduleur.forEach(typeBat => { if (typeBat.fabriquants[0] === this.final.fabriquantOnduleur) { this.typesOnduleurToShow.push(typeBat.label) } })

        this.setCapaciteOnduleurToShow()
      },

      setCapaciteOnduleurToShow () {
        this.capacitesOnduleurToShow = []
        this.capacitesOnduleur.forEach(capBat => {
          capBat.text = capBat.puissanceNominale + ' (Wc) / ' + capBat.puissanceAdmissibleMax + ' (Wc)'
          this.capacitesOnduleurToShow.push(capBat)
          this.capacitesOnduleurToShowOnDatatable.push(capBat)
        })
      },

      setCapaciteOnduleurToShowOnDatatable (id) {
        this.capacitesOnduleurToShowOnDatatable.forEach(cbtsod => { if (cbtsod.text === this.final.capaciteOnduleur[id]) { this.realCapacity = cbtsod } })
        this.capacitesOnduleurToShowOnDatatable = []
        this.capacitesOnduleurToShowOnDatatable.push(this.realCapacity)
        // this.realCapacity = null
      },

      setTypePanneauToShow () {
        this.typesPanneauToShow = []
        this.typesPanneau.forEach(typeBat => { if (typeBat.fabriquants[0] === this.final.fabriquantPanneau) { this.typesPanneauToShow.push(typeBat.label) } })

        this.setCapacitePanneauToShow()
      },

      setCapacitePanneauToShow () {
        this.capacitesPanneauToShow = []
        this.capacitesPanneauToShowOnDatatable = []
        this.capacitesPanneau.forEach(capBat => {
          capBat.text = capBat.puissanceNominale + ' (Wc) / ' + capBat.tensionMax + ' (Vmpp) ' + capBat.courantMax + ' (Impp)'
          capBat.nbrSerie = this.final.nbrPanneauSerie
          capBat.nbrParallele = this.final.nbrPanneauParallele
          this.capacitesPanneauToShow.push(capBat)
          this.capacitesPanneauToShowOnDatatable.push(capBat)
        })
      },

      setCapacitePanneauToShowOnDatatable (id) {
        this.capacitesPanneauToShowOnDatatable.forEach(cbtsod => { if (cbtsod.text === this.final.capacitePanneau[id]) { this.realCapacity = cbtsod } })
        this.capacitesPanneauToShowOnDatatable = []
        this.capacitesPanneauToShowOnDatatable.push(this.realCapacity)
        // this.realCapacity = null
      },

      setResistivite () {
        if (this.final.cableUtilise === 'Cuivre') {
          this.final.resistivite = 0.02314
        } else if (this.final.cableUtilise === 'Alluminium') {
          this.final.resistivite = 0.03676
        }
      },

      setTemperatureMin () {
        // console.log('123', this.final.temperatureFontionnementMin[0])
        this.final.temperatureFontionnementMin = []
        this.temperatureFontionnement.forEach(temp => {
          if (temp.text === this.editedTemperatureFontionnementMin) {
            this.final.temperatureFontionnementMin.push(temp)
          }
        })
      },

      setTemperatureMin2 () {
        // console.log('145', this.final.temperatureFontionnementMin[0])
        this.final.temperatureFontionnementMin = []
        this.temperatureFontionnement.forEach(temp => {
          if (temp.text === this.final.temperatureFontionnementMin[0].text) {
            this.final.temperatureFontionnementMin.push(temp)
          }
        })
      },

      setTemperatureMax () {
        this.final.temperatureFontionnementMax = []
        this.temperatureFontionnement.forEach(temp => {
          if (temp.text === this.editedTemperatureFontionnementMax) {
            this.final.temperatureFontionnementMax.push(temp)
          }
        })
      },

      setTemperatureMax2 () {
        this.final.temperatureFontionnementMax = []
        this.temperatureFontionnement.forEach(temp => {
          if (temp.text === this.final.temperatureFontionnementMax[0].text) {
            this.final.temperatureFontionnementMax.push(temp)
          }
        })
      },

      setDevisItems () {
        this.setFIVE()
        this.devisItems = []

        let batterie = { designation: 'Batterie', qte: Math.ceil(this.capaciteTotale / this.capacitesBatterieToShowOnDatatable[0].capacite) * Math.ceil(this.final.tensionSysteme / this.capacitesBatterieToShowOnDatatable[0].tension), pu: 0, pt: 0 }
        let regul = { designation: 'Régulateur', qte: Math.ceil(this.roundDecimal(this.puissanceAInstaller * 1000 / this.capacitesRegulateurToShowOnDatatable[0].puissanceNominale)), pu: 0, pt: 0 }
        let ondul = { designation: 'Onduleur', qte: Math.ceil(this.final.dimmentionnementDetails.pt * 1000 / this.capacitesOnduleurToShowOnDatatable[0].puissanceNominale), pu: 0, pt: 0 }
        let panneau = { designation: 'Panneau', qte: Math.ceil(this.roundDecimal(this.puissanceAInstaller * 1000 / this.capacitesPanneauToShowOnDatatable[0].puissanceNominale)), pu: 0, pt: 0 }

        this.devisItems.push(batterie, regul, ondul, panneau)
      },

      setTotalDevis () {
        console.log('lolo')
        this.totalDevis = 0
        this.devisItems.forEach(dev => {
          this.totalDevis += dev.pt
        })
      },

      /** Effectue une sauvegarde en local du workflow */
      saveWork () {
        // this.final.capaciteBatterie = []
        // this.final.capaciteOnduleur = []
        // this.final.capacitePanneau = []
        // this.final.capaciteRegulateur = []
        console.log(this.final)
        let data = JSON.stringify(this.final), poseOptionToiture = JSON.stringify(this.poseOptionToiture), poseOptionAutres = JSON.stringify(this.poseOptionAutres)

        window.localStorage.setItem('saved-jules-process-' + this.currentSiteId, data)
        window.localStorage.setItem('jules-app-poses-toiture-' + this.currentSiteId, poseOptionToiture)
        window.localStorage.setItem('jules-app-poses-autres-' + this.currentSiteId, poseOptionAutres)
        window.localStorage.setItem('saved-jules-process-step-' + this.currentSiteId, this.activeStep)
      },

      nextStep () {
        this.animation = 'animate-out'
        setTimeout(() => {
          this.animation = 'animate-in'
          this.activeStep += 1
        }, 550)
        this.stepValidated = false
        if (this.activeStep === 1) {
          this.stepValidated = true
        }
      },

      prevStep () {
        this.animation = 'animate-out-2'
        setTimeout(() => {
          this.animation = 'animate-in'
          this.activeStep -= 1
        }, 550)
        if (this.activeStep === 2) {
          setTimeout(() => {
            this.beforeDiag = 'before-diag'
          }, 600)
        }
      },

      closeModal () {
        for (let i = 0; i < this.selected.length; i++) {
          if (this.$refs.ppNom[i]) {
            this.$refs.ppNom[i].classList.remove('active')
          }
        }
        this.modalClass = 'modal-elt out'
        setTimeout(() => {
          this.showType = false
          this.showInfluence = false
          this.showImplication = false
        }, 550)
      }
  },
  mounted () {
    console.log(this.capacitesBatterieToShowOnDatatable)
    this.currentUser = JSON.parse(window.localStorage.getItem('jules-user-connected'))

    if (window.localStorage.getItem('jules-app-localisation') !== null && window.localStorage.getItem('jules-app-localisation').length > 0) { this.localisations = JSON.parse(window.localStorage.getItem('jules-app-localisation')) }
    if (window.localStorage.getItem('jules-app-pose') !== null && window.localStorage.getItem('jules-app-pose').length > 0) { this.poses = JSON.parse(window.localStorage.getItem('jules-app-pose')) }
    if (window.localStorage.getItem('jules-app-solution') !== null && window.localStorage.getItem('jules-app-solution').length > 0) { this.solutions = JSON.parse(window.localStorage.getItem('jules-app-solution')) }
    if (window.localStorage.getItem('jules-app-obstacle') !== null && window.localStorage.getItem('jules-app-obstacle').length > 0) { this.obstacles = JSON.parse(window.localStorage.getItem('jules-app-obstacle')) }
    if (window.localStorage.getItem('jules-app-equipement') !== null && window.localStorage.getItem('jules-app-equipement').length > 0) { this.equipements = JSON.parse(window.localStorage.getItem('jules-app-equipement')) }
    if (window.localStorage.getItem('jules-app-fabriquant-batterie') !== null && window.localStorage.getItem('jules-app-fabriquant-batterie').length > 0) { this.fabriquantsBatterie = JSON.parse(window.localStorage.getItem('jules-app-fabriquant-batterie')) }
    if (window.localStorage.getItem('jules-app-type-batterie') !== null && window.localStorage.getItem('jules-app-type-batterie').length > 0) { this.typesBatterie = JSON.parse(window.localStorage.getItem('jules-app-type-batterie')) }
    if (window.localStorage.getItem('jules-app-capacite-batterie') !== null && window.localStorage.getItem('jules-app-capacite-batterie').length > 0) { this.capacitesBatterie = JSON.parse(window.localStorage.getItem('jules-app-capacite-batterie')) }
    if (window.localStorage.getItem('jules-app-fabriquant-regulateur') !== null && window.localStorage.getItem('jules-app-fabriquant-regulateur').length > 0) { this.fabriquantsRegulateur = JSON.parse(window.localStorage.getItem('jules-app-fabriquant-regulateur')) }
    if (window.localStorage.getItem('jules-app-type-regulateur') !== null && window.localStorage.getItem('jules-app-type-regulateur').length > 0) { this.typesRegulateur = JSON.parse(window.localStorage.getItem('jules-app-type-regulateur')) }
    if (window.localStorage.getItem('jules-app-capacite-regulateur') !== null && window.localStorage.getItem('jules-app-capacite-regulateur').length > 0) { this.capacitesRegulateur = JSON.parse(window.localStorage.getItem('jules-app-capacite-regulateur')) }
    if (window.localStorage.getItem('jules-app-fabriquant-onduleur') !== null && window.localStorage.getItem('jules-app-fabriquant-onduleur').length > 0) { this.fabriquantsOnduleur = JSON.parse(window.localStorage.getItem('jules-app-fabriquant-onduleur')) }
    if (window.localStorage.getItem('jules-app-type-onduleur') !== null && window.localStorage.getItem('jules-app-type-onduleur').length > 0) { this.typesOnduleur = JSON.parse(window.localStorage.getItem('jules-app-type-onduleur')) }
    if (window.localStorage.getItem('jules-app-capacite-onduleur') !== null && window.localStorage.getItem('jules-app-capacite-onduleur').length > 0) { this.capacitesOnduleur = JSON.parse(window.localStorage.getItem('jules-app-capacite-onduleur')) }
    if (window.localStorage.getItem('jules-app-fabriquant-panneau') !== null && window.localStorage.getItem('jules-app-fabriquant-panneau').length > 0) { this.fabriquantsPanneau = JSON.parse(window.localStorage.getItem('jules-app-fabriquant-panneau')) }
    if (window.localStorage.getItem('jules-app-type-panneau') !== null && window.localStorage.getItem('jules-app-type-panneau').length > 0) { this.typesPanneau = JSON.parse(window.localStorage.getItem('jules-app-type-panneau')) }
    if (window.localStorage.getItem('jules-app-capacite-panneau') !== null && window.localStorage.getItem('jules-app-capacite-panneau').length > 0) { this.capacitesPanneau = JSON.parse(window.localStorage.getItem('jules-app-capacite-panneau')) }
    if (window.localStorage.getItem('jules-app-conditionnement') !== null && window.localStorage.getItem('jules-app-conditionnement').length > 0) { this.conditionnements = JSON.parse(window.localStorage.getItem('jules-app-conditionnement')) }
    if (window.localStorage.getItem('jules-oldstate-' + this.currentSiteId) !== null && window.localStorage.getItem('jules-oldstate-' + this.currentSiteId).length > 0) { this.firstLoadedValue = window.localStorage.getItem('jules-oldstate-' + this.currentSiteId), this.selectedOldState = true }
    if (window.localStorage.getItem('sites-' + this.currentUser.id) !== null && window.localStorage.getItem('sites-' + this.currentUser.id).length > 0) { this.sites = JSON.parse(window.localStorage.getItem('sites-' + this.currentUser.id)) }

    this.currentSiteId = this.$route.params.siteId
    this.sites.forEach(site => { if (parseInt(this.currentSiteId) === site.siteID) { this.currentSite = site } })
    this.localisations.forEach(location => { if (this.currentSite.ville === location.region) { this.currentLocation = location } })
    this.poses.forEach(pose => { this.posesToShow.push(pose.label) })
    this.solutions.forEach(solution => { this.solutionsToShow.push(solution.label) })
    this.obstacles.forEach(obstacle => { this.obstaclesToShow.push(obstacle.label) })
    this.equipements.forEach(equipement => { this.equipementsToShow.push(equipement.label) })
    this.fabriquantsBatterie.forEach(fabriquant => { this.fabriquantsBatterieToShow.push(fabriquant.label) })
    this.fabriquantsRegulateur.forEach(fabriquant => { this.fabriquantsRegulateurToShow.push(fabriquant.label) })
    this.fabriquantsOnduleur.forEach(fabriquant => { this.fabriquantsOnduleurToShow.push(fabriquant.label) })
    this.fabriquantsPanneau.forEach(fabriquant => { this.fabriquantsPanneauToShow.push(fabriquant.label) })
    this.poseOptionToiture = window.localStorage.getItem('jules-app-poses-toiture-' + this.currentSiteId) !== null && window.localStorage.getItem('jules-app-poses-toiture-' + this.currentSiteId).length > 0 ? JSON.parse(window.localStorage.getItem('jules-app-poses-toiture-' + this.currentSiteId)) : [ { element: 'PAN_1', longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { element: 'PAN_2', longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { element: 'PAN_3', longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { element: 'PAN_4', longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 } ]
    this.poseOptionAutres = window.localStorage.getItem('jules-app-poses-autres-' + this.currentSiteId) !== null && window.localStorage.getItem('jules-app-poses-autres-' + this.currentSiteId).length > 0 ? JSON.parse(window.localStorage.getItem('jules-app-poses-autres-' + this.currentSiteId)) : [ { longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 }, { longueur: 0, largeur: 0, distance: 0, inclinaison: 0, surface: 0 } ]


    this.conditionnements.forEach(conditionnement => {
      let tmpCond1 = { text: conditionnement.label + ' avec Absence de MPPT', ratio: conditionnement.absenceMppt }
      let tmpCond2 = { text: conditionnement.label + ' avec Présence de MPPT', ratio: conditionnement.presenceMppt }
      this.conditionnementsToShow.push(tmpCond1)
      this.conditionnementsToShow.push(tmpCond2)
    })

    if (window.localStorage.getItem('saved-jules-process-step-' + this.currentSiteId) !== null && window.localStorage.getItem('saved-jules-process-step-' + this.currentSiteId).length > 0) {
      this.activeStep = parseInt(window.localStorage.getItem('saved-jules-process-step-' + this.currentSiteId))
      this.final = JSON.parse(window.localStorage.getItem('saved-jules-process-' + this.currentSiteId))
      this.localisations.forEach(local => {
        if (local.region === this.currentSite.ville) {
          let irradiations = local.irradiations
          this.final.irradiationDefavorable = irradiations[0].hopt
          irradiations.forEach(irr => {
            if (parseInt(irr.hopt) < parseInt(this.final.irradiationDefavorable)) {
              this.final.irradiationDefavorable = irr.hopt
            }
          })
        }
      })
    }

    if (this.activeStep > 4) {
      this.setTypeBatterieToShow()
      this.setCapaciteBatterieToShow()
      this.setCapaciteBatterieToShowOnDatatable()
      this.setTypePanneauToShow()
      this.setCapacitePanneauToShow()
      this.setCapacitePanneauToShowOnDatatable()
    }
    if (this.activeStep > 5) {
      this.setTypeOnduleurToShow()
      this.setCapaciteOnduleurToShow()
      this.setCapaciteOnduleurToShowOnDatatable()
      this.setTypeRegulateurToShow()
      this.setCapaciteRegulateurToShow()
      this.setCapaciteRegulateurToShowOnDatatable()
    }
    if (this.activeStep > 8) {
      this.setBEJ()
      this.setFIVE()
      if (window.localStorage.getItem('jules-app-devis-' + this.currentSiteId) !== null && window.localStorage.getItem('jules-app-devis-' + this.currentSiteId).length > 0) {
        this.devisItems = JSON.parse(window.localStorage.getItem('jules-app-devis-' + this.currentSiteId))
        this.setTotalDevis()
      } else {
        this.setDevisItems()
      }
    }

    let irradiations = this.currentLocation.irradiations

    this.dataChart1 = [
      {
        name: 'Hopt',
        data: {
          'jan': irradiations[0].hopt,
          'fev': irradiations[1].hopt,
          'mar': irradiations[2].hopt,
          'avr': irradiations[3].hopt,
          'mai': irradiations[4].hopt,
          'juin': irradiations[5].hopt,
          'juil': irradiations[6].hopt,
          'aou': irradiations[7].hopt,
          'sept': irradiations[8].hopt,
          'oct': irradiations[9].hopt,
          'nov': irradiations[10].hopt,
          'dec': irradiations[11].hopt
        }
      }
    ]
    this.dataChart2 = [
      {
        name: 'EP',
        data: {
          'jan':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[0].hopt * this.ratioPerformence,
          'fev':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[1].hopt * this.ratioPerformence,
          'mar':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[2].hopt * this.ratioPerformence,
          'avr':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[3].hopt * this.ratioPerformence,
          'mai':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[4].hopt * this.ratioPerformence,
          'juin':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[5].hopt * this.ratioPerformence,
          'juil':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[6].hopt * this.ratioPerformence,
          'aou':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[7].hopt * this.ratioPerformence,
          'sept':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[8].hopt * this.ratioPerformence,
          'oct':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[9].hopt * this.ratioPerformence,
          'nov':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[10].hopt * this.ratioPerformence,
          'dec':  (Math.abs(this.firstLoadedValue - this.besoinEnergetiqueJournalier / (this.ratioPerformence * this.final.irradiationDefavorable))) * irradiations[11].hopt * this.ratioPerformence
        }
      }
    ]

    this.firstLoadedValue = window.localStorage.getItem('jules-oldstate-' + this.currentSiteId) + 0
  },
  updated () {
    if (this.activeStep === 4) { this.setBEJ() }
    if (this.activeStep === 5) {
      this.setBEJ()
      this.setFIVE()
    }
    if (this.activeStep === 9 && this.countInitStep === 0) {
      this.devisItems = []
      this.temperatures.forEach(elt => { if (elt.temperature === this.final.temperature) { this.coefficientTemperature = elt.coefficient } })
      this.capaciteTotale = (100 * this.final.nbrJour * (this.final.dimmentionnementDetails.et * (1 + (this.final.coefficient / 100)))) / (this.final.profondeur * this.coefficientTemperature)
      let batterie = { designation: 'Batterie', qte: Math.ceil(this.capaciteTotale / this.capacitesBatterieToShowOnDatatable[0].capacite) * Math.ceil(this.final.tensionSysteme / this.capacitesBatterieToShowOnDatatable[0].tension), pu: 0, pt: 0 }
      let regul = { designation: 'Régulateur', qte: Math.ceil(this.roundDecimal(this.puissanceAInstaller * 1000 / this.capacitesRegulateurToShowOnDatatable[0].puissanceNominale)), pu: 0, pt: 0 }
      let ondul = { designation: 'Onduleur', qte: Math.ceil(this.final.dimmentionnementDetails.pt * 1000 / this.capacitesOnduleurToShowOnDatatable[0].puissanceNominale), pu: 0, pt: 0 }
      let panneau = { designation: 'Panneau', qte: Math.ceil(this.roundDecimal(this.puissanceAInstaller * 1000 / this.capacitesPanneauToShowOnDatatable[0].puissanceNominale)), pu: 0, pt: 0 }

      // console.log(batterie, regul, ondul, panneau)
      this.devisItems.push(batterie, regul, ondul, panneau)
      console.log(this.final, this.capaciteTotale, this.coefficientTemperature)
      this.countInitStep++
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin flexbox() { display: flex; justify-content: center; align-items: center; }

  .flex-container { 
    @include flexbox();
    // margin-top: 18%;
    text-align: center;
    width: 40%;
  }

  $color: #FF6F00;
  $color2: #3e2723;
  $height: 600px;
  
  #app-container { overflow: hidden !important; }

  .editable { border: solid 1px $color !important; animation: pulse 4s infinite; }
  .content {
    @include flexbox();
    min-height: $height;
    background: #fff;
    width: calc(100% - 70px) ;
    position: absolute; top: 0; left: 70px;

    .full-content { width: 100%; height: $height; overflow: auto; }
    .left-content { width: 75%; height: $height; overflow: auto; }
    .right-content { width: 25%; box-shadow: 0 0 10px rgba(0,0,0,.2); height: $height; overflow-x: hidden; }

    .in { transform-origin: left; animation: fadeInDown .6s ease-in-out; }
    .out { transform-origin: left; animation: fadeOutDown .6s ease-in-out; }
  }

  .v-sheet--offset { top: -24px; position: relative; }
  .card-prepend {
    width: 90%; margin-left: 5%;
    .card-offset { height: 200px; }
    .card-content { position: absolute; top: 0; }
  }

  article {
    display: flex; width: 100%; min-height: 600px; max-height: 600px; perspective: 1000px; background: transparent;
    header { @include flexbox(); width: 60px; height: $height; margin-right: 20px; background-color: #fff; border-right: 2px dotted $color; }
    .progress { @include flexbox(); flex-direction: column; width: 100%; height: $height; }
    .progress-step {
      @include flexbox(); position: relative; width: 30px; height: 30px; border-radius: 50%; margin-bottom: 20px; color: #fff; background-color: $color2; font-weight: bold;
      &.active {
        background-color: $color;
        ~ .progress-step { color: #fff; background-color: $color2; }
        ~ .progress-step::before { background-color: $color2; }
      }
      &:before { content: ''; position: absolute; top: -20px; width: 2px; height: 20px; background-color: $color2; z-index: 10; }
      &:first-child::before { display: none; }
      &:hover { background-color: $color2 !important; color: #fff !important; cursor: pointer; }
    }

    section {
      @include flexbox();
      flex-direction: column;
      width: 100%;
      background: transparent;

      .actions {
        margin: 0; position: absolute; bottom: -50px; right: 0px;

        button {
          height: 50px; padding: 5px 10px; transform: scale(.8); font-weight: lighter;
          &:hover { transform: scale(.7); }
        }
      }
    }
  }

  .hide {display: none !important ;}
  .no-change { padding: 0; height: 50px;}
  .shadow { box-shadow: 0 5px 20px -10px rgba(0,0,0,.3); }
  .rounded-container {border-radius: .5rem !important; box-shadow: 0 4px 20px 0 rgba(0,0,0,.05) !important; overflow: hidden; }
  .rounded-container-inside {border-radius: .5rem !important; box-shadow: 0 15px 20px -10px rgba(0,0,0,.3) !important; overflow: hidden; border-top: solid 1px #ddd }
  .left-content::-webkit-scrollbar, .full-content::-webkit-scrollbar, .right-content::-webkit-scrollbar { width: 6px; }
  .left-content::-webkit-scrollbar-track, .full-content::-webkit-scrollbar-track, .right-content::-webkit-scrollbar-track { background: #ddd; }
  .left-content::-webkit-scrollbar-thumb, .full-content::-webkit-scrollbar-thumb, .right-content::-webkit-scrollbar-thumb { background: #ad3708; }
  .animate-in { transform-origin: left; animation: in .6s ease-in-out; }
  .animate-out { transform-origin: bottom left; animation: out .6s ease-in-out; }
  .animate-out-2 { transform-origin: bottom left; animation: out-2 .6s ease-in-out; }
  .animate-wrong { animation: wrong .4s ease-in-out; }

  @keyframes in { 0% { opacity: 0; transform: rotateY(90deg); } 100% { opacity: 1; transform: rotateY(0deg); } }
  @keyframes out { 0% { transform: translateY(0px) rotate(0deg); } 60% { transform: rotate(10deg); } 100% { transform: translateY(1000px); } }
  @keyframes out-2 { 0% { transform: translateY(0px) rotate(0deg); } 60% { transform: rotate(-10deg); } 100% { transform: translateY(-1000px); } }
  @keyframes pulse { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 #ff6f0099; } 70% { transform: scale(1); box-shadow: 0 0 0 30px rgba(215, 111, 0, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(215, 111, 0, 0); }}
  @keyframes wrong { 0% { transform: translateX(0); } 20% { transform: translateX(40px); } 40% { transform: translateX(20px); } 60% { transform: translateX(40px); } 80% { transform: translateX(20px); } 100% { transform: translateX(0); }}
</style>
