<template>
  <v-container fluid grid-list-xl>
    <v-dialog v-model="dialog" width="600px" height="auto">
      <v-card
        v-if="itemToEdit === 'deposit'"
        elevation="15"
        height="800px"
        class="special-scroll depositForm"
      >
        <v-card-title>Make a Deposit</v-card-title>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1"
            >Register
            <small>Fill in the details of the deposit</small></v-stepper-step
          >
          <v-stepper-content step="1">
            <v-row class="mx-2">
              <v-row v-show="editedSite.country">
                <v-col cols="6">
                  <v-select
                    v-model="editedDeposit.accountName"
                    :items="villes"
                    @change="setZone()"
                    clearable
                    prepend-inner-icon="mdi-camera-control"
                    label="Name Account"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedSite.zone"
                    disabled
                    prepend-inner-icon="mdi-orbit"
                    label="Account amount"
                  />
                </v-col>
              </v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="editedDeposit.depositAmount"
                  clearable
                  prepend-inner-icon="mdi-camera-iris"
                  label="Deposit amount"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedDeposit.phone"
                  clearable
                  prepend-inner-icon="mdi-camera-control"
                  label="Phone Number"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedDeposit.email"
                  clearable
                  :rules="[rules.required, rules.email]"
                  prepend-inner-icon="mdi-orbit"
                  label="E-mail"
                />
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
                      v-model="editedDeposit.date"
                      prepend-inner-icon="mdi-calendar"
                      label="Date"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="editedDeposit.date"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedSite.pays"
                  disabled
                  prepend-inner-icon="mdi-orbit"
                  label="Pays"
                />
                <!-- <v-select v-model="editedSite.pays" :items="pays" clearable prepend-inner-icon="mdi-camera-control" label="Pays" /> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                v-show="
                  editedDeposit.accountName && editedDeposit.depositAmount
                "
              >
                <v-chip
                  light
                  class="ma-2 elevation-5 white--text"
                  color="amber darken-3"
                  @click="save"
                >
                  <v-avatar left><v-icon small>mdi-telegram</v-icon></v-avatar>
                  <span>Save</span>
                </v-chip>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper>
      </v-card>
      <v-card
        v-if="itemToEdit === 'Withdrawal'"
        elevation="15"
        height="800px"
        class="special-scroll depositForm"
      >
        <v-card-title>Make a Withdrawal</v-card-title>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1"
            >Register
            <small>Fill in the details of the Withdrawal</small></v-stepper-step
          >
          <v-stepper-content step="1">
            <v-row class="mx-2">
              <v-row v-show="editedSite.country">
                <v-col cols="6">
                  <v-select
                    v-model="editedWithdrawal.accountName"
                    :items="villes"
                    @change="setZone()"
                    clearable
                    prepend-inner-icon="mdi-camera-control"
                    label="Name Account"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedSite.zone"
                    disabled
                    prepend-inner-icon="mdi-orbit"
                    label="Account amount"
                  />
                </v-col>
              </v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="editedWithdrawal.depositAmount"
                  clearable
                  prepend-inner-icon="mdi-camera-iris"
                  label="Withdrawal amount"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedWithdrawal.phone"
                  clearable
                  prepend-inner-icon="mdi-camera-control"
                  label="Phone Number"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedWithdrawal.email"
                  clearable
                  :rules="[rules.required, rules.email]"
                  prepend-inner-icon="mdi-orbit"
                  label="E-mail"
                />
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
                      v-model="editedWithdrawal.date"
                      prepend-inner-icon="mdi-calendar"
                      label="Date"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="editedWithdrawal.date"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedSite.pays"
                  disabled
                  prepend-inner-icon="mdi-orbit"
                  label="Pays"
                />
                <!-- <v-select v-model="editedSite.pays" :items="pays" clearable prepend-inner-icon="mdi-camera-control" label="Pays" /> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
                v-show="
                  editedWithdrawal.accountName && editedWithdrawal.depositAmount
                "
              >
                <v-chip
                  light
                  class="ma-2 elevation-5 white--text"
                  color="amber darken-3"
                  @click="save"
                >
                  <v-avatar left><v-icon small>mdi-telegram</v-icon></v-avatar>
                  <span>Save</span>
                </v-chip>
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-dialog>
    <v-layout wrap class="px-0">
      <v-flex sm12 xs12 md4 lg4>
        <v-card class="mx-auto rounded" height="auto" tile>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Total amount in the account</div>
              <v-list-item-title
                class="display-1"
                style="color: #0C0C0B"
                v-if="sites"
                >{{ totalAccount }}
                <small class="caption font-weight-light"
                  >$</small
                ></v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-avatar
              size="80"
              tile
              color="#0C0C0B"
              style="border-radius: 5px !important"
              class="elevation-5"
            >
              <v-icon dark size="50">mdi-currency-btc</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-flex>
      <v-flex sm12 xs12 md4 lg4>
        <v-card class="mx-auto rounded" tile>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Total amount Withdrawn</div>
              <v-list-item-title
                class="display-1"
                style="color: #0C0C0B"
                v-if="sites"
                >{{ totalWithDraw }}
                <small class="caption font-weight-light"
                  >$</small
                ></v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-avatar
              size="80"
              tile
              color="#0C0C0B"
              style="border-radius: 5px !important"
              class="elevation-5"
            >
              <v-icon dark size="40">mdi-cash</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-flex>
      <v-flex sm12 xs12 md4 lg4>
        <v-card class="mx-auto rounded" tile>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Total amount of Deposit</div>
              <v-list-item-title
                class="display-1"
                style="color: #0C0C0B"
                v-if="sites"
                >{{ totalDeposit }}
                <small class="caption font-weight-light"
                  >$</small
                ></v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-avatar
              size="80"
              tile
              color="#0C0C0B"
              style="border-radius: 5px !important"
              class="elevation-5"
            >
              <v-icon dark size="40">mdi-cash</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-flex>
      <v-flex sm12 xs12 md12 lg12>
        <v-card tile class="mx-auto mt-5">
          <v-sheet
            class="v-sheet--offset mx-auto py-3 px-3"
            color="#0C0C0B"
            elevation="10"
            max-width="calc(100% - 32px)"
          >
            <v-card-text class="pt-0">
              <div class="headline font-weight-normal mb-0 white--text">
                List of the Recent Transactions
                <div class="float-right" style="position: relative; top: 35px">
                  <v-chip
                    light
                    class="ma-2 elevation-5 float-right white--text"
                    color="grey darken-3"
                    @click="(itemToEdit = 'deposit') && (dialog = !dialog)"
                    v-on="on"
                  >
                    <v-avatar left><v-icon small>mdi-plus</v-icon></v-avatar>
                    <span>Make a deposit</span>
                  </v-chip>
                </div>
                <div class="float-right" style="position: relative; top: 35px">
                  <v-chip
                    light
                    class="ma-2 elevation-5 float-right white--text"
                    color="grey darken-3"
                    @click="(itemToEdit = 'Withdrawal') && (dialog = !dialog)"
                    v-on="on"
                  >
                    <v-avatar left><v-icon small>mdi-plus</v-icon></v-avatar>
                    <span>Make a Withdrawal</span>
                  </v-chip>
                </div>
              </div>
            </v-card-text>
          </v-sheet>

          <v-card-text class="pt-0" v-if="sites">
            <v-data-table
              :headers="headers"
              :items="sites"
              :items-per-page="10"
              class="mb-3"
            >
              <template v-slot:item.date="{ item }">
                <span>{{ new Date(item.date).toLocaleDateString() }}</span>
              </template>
              <template v-slot:item.action="{ item }">
                <v-chip
                  outlined
                  light
                  class="ma-2 elevation-5"
                  color="amber darken-3"
                  @click="editSite(item)"
                >
                  <v-avatar left
                    ><v-icon small>mdi-pencil-outline</v-icon></v-avatar
                  >
                  <span>Modifier</span>
                </v-chip>
                <v-chip
                  outlined
                  light
                  class="ma-2 elevation-5"
                  color="red darken-3"
                  @click="deleteSite(item)"
                >
                  <v-avatar left
                    ><v-icon small>mdi-delete-outline</v-icon></v-avatar
                  >
                  <span>Supprimer</span>
                </v-chip>
              </template>
              <template v-slot:no-data>
                <p class="dark mt-5">Aucune site enrégistrée pour le moment</p>
              </template>
            </v-data-table>
            <v-chip
              outlined
              light
              class="ma-2 elevation-5"
              color="green darken-3"
              style="position: absolute; bottom: 15px; left: 110px"
              @click="printExcel()"
            >
              <v-avatar left
                ><v-icon small>mdi-microsoft-excel</v-icon></v-avatar
              >
              <span>Excel</span>
            </v-chip>
            <v-chip
              outlined
              light
              class="ma-2 elevation-5"
              style="position: absolute; bottom: 15px"
              color="blue darken-3"
              @click="printCSV()"
            >
              <v-avatar left
                ><v-icon small>mdi-microsoft-windows-classic</v-icon></v-avatar
              >
              <span>CSV</span>
            </v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import exportFromJSON from "export-from-json";

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
      itemToEdit: "deposit",
      totalAccount: "0",
      dialog: false,
      totalDeposit: "0",
      totalWithDraw: "0",
      e6: 1,
      menu2: false,
      localisations: null,
      editedSite: {
        siteID: null,
        userID: null,
        typetransaction: "",
        account: "",
        email: "",
        country: "Cameroun",
        amount: "",
        zone: "",
        date: ""
      },

      newSite: {
        depositID: null,
        userID: null,
        typetransaction: "",
        phone: "",
        email: "",
        country: "Cameroun",
        ville: "",
        amount: "",
        zone: "",
        date: ""
      },
      editedDeposit: {
        siteID: null,
        userID: null,
        accountName: null,
        depositAmount: "",
        phone: "",
        email: "",
        date: ""
      },
      newDeposit: {
        depositID: null,
        userID: null,
        accountName: null,
        depositAmount: "",
        email: "",
        phone: "",
        date: ""
      },
      editedWithdrawal: {
        siteID: null,
        userID: null,
        accountName: null,
        depositAmount: "",
        phone: "",
        email: "",
        date: ""
      },
      newWithdrawal: {
        depositID: null,
        userID: null,
        accountName: null,
        depositAmount: "",
        email: "",
        phone: "",
        date: ""
      },
      sites: [],
      deposits: [],
      withdrawals: [],

      // pays: [],
      villes: [],
      headers: [
        { text: "Type of transaction", value: "typetransaction" },
        { text: "Name Account", value: "nom" },
        { text: "Email", value: "email" },
        { text: "Country", value: "country" },
        { text: "Amount", value: "amount" },
        { text: "Date", value: "date" },
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
    printCSV() {
      const items = this.sites;
      const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
      const header = Object.keys(items[0]);
      let csv = items.map(row =>
        header
          .map(fieldName => JSON.stringify(row[fieldName], replacer))
          .join(",")
      );
      let link = document.createElement("a");

      csv.unshift(header.join(","));
      csv = csv.join("\r\n");

      link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      link.download = "testCsv.csv";
      link.click();
    },

    printExcel() {
      const data = this.sites;
      const fileName = "textExcel";
      const exportType = exportFromJSON.types.xls;

      exportFromJSON({ data, fileName, exportType });
    },

    saveToLocal() {
      let data = JSON.stringify(this.sites);
      window.localStorage.setItem("sites-" + this.currentUser.id, data);
    },

    editSite(item) {
      this.editedIndex = this.sites.indexOf(item);
      this.editedSite = Object.assign({}, item);
      this.dialog = true;
    },

    deleteSite(item) {
      const index = this.sites.indexOf(item);
      if (confirm("Are you sure you want to delete this transaction?")) {
        this.sites.splice(index, 1);
        console.log(item.amount);
        if (item.typetransaction == "deposit") {
          this.totalDeposit =
            parseFloat(this.totalDeposit) - parseFloat(item.amount);
            window.localStorage.setItem("totalAmount",JSON.stringify(this.totalDeposit))
        }else{
          this.totalAccount = parseFloat(this.totalAccount) + parseFloat(item.amount)
          this.totalWithDraw = parseFloat(this.totalWithDraw) - parseFloat(item.amount)
            window.localStorage.setItem("totalAmountWithDraw",JSON.stringify(this.totalWithDraw))
        }

        this.saveToLocal();
      }
      window.location.reload()
    },

    setZone() {
      this.localisations.forEach(local => {
        if (local.region === this.editedSite.ville) {
          this.editedSite.zone = local.amount;
          this.editedSite.pays = local.adresse;
        }
      });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedSite = Object.assign({}, this.newSite);
        this.editedIndex = -1;
        this.e6 = 1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.sites[this.editedIndex], this.editedSite);
      } else {
        if (this.itemToEdit == "deposit") {
          this.deposits.push({
            depositID: Math.floor(new Date() * Math.random() * Math.floor(9)),
            userID: this.currentUser.id,
            accountName: this.editedDeposit.accountName,
            depositAmount: this.editedDeposit.depositAmount,
            phone: this.editedDeposit.phone,
            email: this.editedDeposit.email,
            date: this.editedDeposit.date
          });
          window.localStorage.setItem(
            "deposits",
            JSON.stringify(this.deposits)
          );
          this.sites.push({
            siteID: Math.floor(new Date() * Math.random() * Math.floor(9)),
            userID: this.currentUser.id,
            typetransaction: this.itemToEdit,
            nom: this.editedDeposit.accountName,
            adresse: this.editedSite.adresse,
            email: this.editedDeposit.email,
            amount: this.editedDeposit.depositAmount,
            ville: this.editedSite.country,
            date: this.editedDeposit.date
          });

          if (
            window.localStorage.getItem("totalAmount") !== null &&
            window.localStorage.getItem("totalAmount")
          ) {
            let localAmount = JSON.parse(
              window.localStorage.getItem("totalAmount")
            );

            let total =
              parseFloat(localAmount) +
              parseFloat(this.editedDeposit.depositAmount);
            console.log(total);
            window.localStorage.setItem("totalAmount", JSON.stringify(total));
            this.totalAccount =
              this.editedDeposit.depositAmount + this.totalAccount;
          } else {
            this.totalDeposit = this.editedDeposit.depositAmount;
            window.localStorage.setItem(
              "totalAmount",
              JSON.stringify(this.totalDeposit)
            );
          }
        } else {
          if (this.editedWithdrawal.depositAmount <= this.totalAccount) {
            this.withdrawals.push({
              withdrawID: Math.floor(
                new Date() * Math.random() * Math.floor(9)
              ),
              userID: this.currentUser.id,
              accountName: this.editedWithdrawal.accountName,
              depositAmount: this.editedWithdrawal.depositAmount,
              phone: this.editedWithdrawal.phone,
              email: this.editedWithdrawal.email,
              date: this.editedWithdrawal.date
            });
            window.localStorage.setItem(
              "withdrawals",
              JSON.stringify(this.withdrawals)
            );
            this.sites.push({
              siteID: Math.floor(new Date() * Math.random() * Math.floor(9)),
              userID: this.currentUser.id,
              typetransaction: this.itemToEdit,
              nom: this.editedWithdrawal.accountName,
              adresse: this.editedSite.adresse,
              email: this.editedWithdrawal.email,
              amount: this.editedWithdrawal.depositAmount,
              ville: this.editedSite.country,
              date: this.editedWithdrawal.date
            });

            if (
              window.localStorage.getItem("totalAmountWithDraw") !== null &&
              window.localStorage.getItem("totalAmountWithDraw")
            ) {
              let localAmountWithDraw = JSON.parse(window.localStorage.getItem("totalAmountWithDraw"));

              let total =
                parseFloat(localAmountWithDraw) +
                parseFloat(this.editedWithdrawal.depositAmount);
              console.log(total);
              window.localStorage.setItem(
                "totalAmountWithDraw",
                JSON.stringify(total)
              );
            } else {
              console.log("c'est le bon emplacement")
            this.totalAccount = parseFloat(this.totalAccount) - parseFloat(this.editedWithdrawal.depositAmount)
             window.localStorage.setItem(
              "totalAmount",
              JSON.stringify(this.totalAccount)
            );
              this.depositAmount = this.editedWithdrawal.depositAmount;
              window.localStorage.setItem(
                "totalAmountWithDraw",
                JSON.stringify(this.depositAmount)
              );

            }
          } else {
            alert("Your Account is insufficient to withdraw this amount");
          }
        }
        // let local = window.localStorage.getItem("jules-account")
      }
      this.saveToLocal();
      this.close();
      window.location.reload();
    }
  },

  mounted() {
    this.currentUser = JSON.parse(
      window.localStorage.getItem("jules-user-connected")
    );
    if (
      window.localStorage.getItem("sites-" + this.currentUser.id) !== null &&
      window.localStorage.getItem("sites-" + this.currentUser.id).length > 0
    ) {
      let MyTotalAmount;
      let localAmount = JSON.parse(window.localStorage.getItem("totalAmount"));
      if (
        window.localStorage.getItem("totalAmount") !== null &&
        window.localStorage.getItem("totalAmount")
      ) {
        this.totalDeposit = JSON.parse(
          window.localStorage.getItem("totalAmount")
        );
        this.localisations = JSON.parse(
          window.localStorage.getItem("jules-account")
        );
        this.localisations.forEach(local => {
          if (local.statut == 0) {
            let som = local.amount;
            console.log(parseFloat(localAmount));
            MyTotalAmount = parseFloat(localAmount) + parseFloat(som);
            this.totalAccount = MyTotalAmount;
          }
        });
      } else {
        this.localisations = JSON.parse(
          window.localStorage.getItem("jules-account")
        );
        this.localisations.forEach(local => {
          if (local.statut == 0) {
            let som = 0;
            this.totalAccount = som + parseFloat(local.amount);
          }
        });
        this.totalWithDraw =JSON.parse(window.localStorage.getItem("totalAmountWithDraw"))
      }
      this.sites = JSON.parse(
        window.localStorage.getItem("sites-" + this.currentUser.id)
      );
    }
    if (window.localStorage.getItem("jules-account") !== null && window.localStorage.getItem("jules-account").length > 0 ) {
      if(window.localStorage.getItem("totalAmountWithDraw") !==null && window.localStorage.getItem("totalAmountWithDraw").length >0){
        this.totalWithDraw =JSON.parse(window.localStorage.getItem("totalAmountWithDraw"))
      }
      this.localisations = JSON.parse(window.localStorage.getItem("jules-account"));
      console.log(this.localisations);
      this.localisations.forEach(local => {
        if (local.statut == 0) {
          let dat = local.nom + "" + local.prenom;
          this.villes.push(JSON.stringify(dat));
        }
      });
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
