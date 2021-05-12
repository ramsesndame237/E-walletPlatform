<template>
  <v-container fluid grid-list-xl>
    <v-dialog v-model="dialog" width="800px" height="555px">
      <v-card elevation="15" class="special-scroll">
        <v-card-title>New Account</v-card-title>
        <v-container>
          <v-form class="mx-5">
            <v-row>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="editedUser.nom"
                  label="Name"
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="editedUser.prenom"
                  label="Surname"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedUser.pin"
                  type="number"
                  :rules="[
                    () => !!editedUser.pin || 'This field is required',
                    () =>
                      (!!editedUser.pin && editedUser.pin.length <= 3) ||
                      'PIN code must be less than 3 characters',
                  ]"
                  label="PIN Code"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="editedUser.dateBirth"
                      prepend-inner-icon="mdi-calendar"
                      label="Date of birth"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="editedUser.dateBirth"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  :rules="[rules.required, rules.email]"
                  v-model="editedUser.email"
                  label="E-mail"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedUser.adresse"
                  label="Adresse"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="editedUser.amount"
                  label="Amount"
                  type="number"
                  prefix="$"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-row
            v-show="editedUser.amount && editedUser.nom && editedUser.prenom"
          >
            <v-col cols="12">
              <v-chip
                light
                class="ma-2 elevation-5 white--text"
                color="#0C0C0B"
                @click="save"
              >
                <v-avatar left><v-icon small>mdi-telegram</v-icon></v-avatar>
                <span>Save</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-layout wrap class="px-0 py-12">
      <v-flex sm12 xs12 md12 lg12>
        <v-card tile class="mx-auto mt-8">
          <v-sheet
            class="v-sheet--offset mx-auto py-3 px-3"
            color="#0C0C0B"
            elevation="10"
            max-width="calc(100% - 32px)"
          >
            <v-card-text class="pt-0">
              <div class="title font-weight-thin mb-0 white--text">
                Bank account management
                <div class="float-right" style="position: relative; top: 35px">
                  <v-tooltip top class="float-right">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        dense
                        small
                        bottom
                        color="grey darken-1"
                        dark
                        fab
                        @click="dialog = !dialog"
                        v-on="on"
                      >
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <span>Add New Account</span>
                  </v-tooltip>
                </div>
              </div>
            </v-card-text>
          </v-sheet>

          <v-card-text class="pt-0" v-if="users">
            <v-data-table
              :headers="headers"
              :items="users"
              :items-per-page="4"
              class="mb-3"
            >
              <template v-slot:item.fullName="{ item }">
                <span>{{ item.nom + " " + item.prenom }}</span>
              </template>
              <template v-slot:item.statut="{ item }">
                <v-chip
                  v-if="item.statut === 0"
                  pill
                  color="success"
                  text-color="white"
                >
                  <v-avatar left>
                    <v-icon>mdi-checkbox-marked-circle</v-icon>
                  </v-avatar>
                  Activated
                </v-chip>
                <v-chip
                  v-if="item.statut !== 0"
                  pill
                  color="red"
                  text-color="white"
                >
                  <v-avatar left>
                    <v-icon>mdi-bookmark-remove</v-icon>
                  </v-avatar>
                  Deactivated
                </v-chip>
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn
                  dark
                  fab
                  class="elevation-3"
                  max-width="35"
                  max-height="35"
                  color="secondary"
                >
                  <v-icon small @click="changeStatus(item)">mdi-sync</v-icon>
                </v-btn>
                <v-btn
                  dark
                  fab
                  class="elevation-3 ml-2"
                  max-width="35"
                  max-height="35"
                  color="orange"
                >
                  <v-icon small @click="editCategory(item)"
                    >mdi-pencil-outline</v-icon
                  >
                </v-btn>
                <v-btn
                  dark
                  fab
                  class="mx-2 elevation-3"
                  max-width="35"
                  max-height="35"
                  color="red"
                >
                  <v-icon small @click="deleteCategory(item)"
                    >mdi-delete-outline</v-icon
                  >
                </v-btn>
              </template>
              <template v-slot:no-data>
                <span class="dark"
                  >Aucun Utilisateur enrégistré pour le moment</span
                >
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
  data() {
    return {
      rules: {
        required: value => !!value || "Required.",
        counter: value => value.length <= 20 || "Max 20 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      currentUser: null,
      editedIndex: -1,
      menu2: false,
      dialog: false,
      editedUser: {
        id: null,
        amount: null,
        pin: null,
        nom: null,
        prenom: null,
        dateBirth: null,
        email: null,
        adresse: null,
        statut: null
      },
      newUser: {
        id: null,
        amount: null,
        pin: null,
        nom: null,
        prenom: null,
        dateBirth: null,
        email: null,
        adresse: null,
        statut: null
      },
      users: [],
      headers: [
        { text: "Full Name", value: "fullName" },
        { text: "date of birth", value: "dateBirth" },
        { text: "PIN Code", value: "pin" },
        { text: "E-mail", value: "email" },
        { text: "Amount", value: "amount" },
        { text: "Adresse", value: "adresse" },
        { text: "Statut", value: "statut" },
        { text: "", value: "action", sortable: false }
      ]
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    editCategory(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedUser = Object.assign({}, item);
      this.dialog = true;
    },
    deleteCategory(item) {
      const index = this.users.indexOf(item);
      if (confirm("Are you sure you want to delete this account ?")) {
        this.users.splice(index, 1);
        this.saveToLocal();
      }
    },
    changeStatus(item) {
      if (
        confirm("Are you sure you want to change the status of this account ?")
      ) {
        if (item.statut === 0) {
          item.statut = 1;
        } else {
          item.statut = 0;
        }
        this.saveToLocal();
      }
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedUser = Object.assign({}, this.newCategory);
        this.editedIndex = -1;
      }, 300);
    },
    saveToLocal() {
      let data = JSON.stringify(this.users);
      window.localStorage.setItem("jules-account", data);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedUser);
      } else {
        this.users.push({
          id: Math.floor(new Date() * Math.random() * Math.floor(9)),
          nom: this.editedUser.nom,
          prenom: this.editedUser.prenom,
          pin: this.editedUser.pin,
          amount: this.editedUser.amount,
          email: this.editedUser.email,
          adresse: this.editedUser.adresse,
          dateBirth: this.editedUser.dateBirth,
          statut: 0
        });
      }
      this.saveToLocal();
      this.close();
    }
  },
  mounted() {
    this.currentUser = JSON.parse(
      window.localStorage.getItem("jules-user-connected")
    );
    if (
      window.localStorage.getItem("jules-account") !== null &&
      window.localStorage.getItem("jules-account").length > 0
    ) {
      this.users = JSON.parse(window.localStorage.getItem("jules-account"));
    }
  }
};
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