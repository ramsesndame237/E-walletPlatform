<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap class="px-0">
      <v-flex sm8 xs6 md8 lg8 class="mb-10 mt-10">
        <v-card tile class="mx-auto mt-12">
          <v-sheet class="v-sheet--offset mx-auto py-3 px-3" color="success" elevation="10" max-width="calc(100% - 32px)">
            <v-card-text class="pt-0">
              <div class="title font-weight-thin mb-0 white--text">Modifier le profil</div>
              <div class="caption font-weight-thin white--text">Complèter votre profil</div>
            </v-card-text>
          </v-sheet>

          <v-card-text class="pt-0">
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="username" :rules="textRules" :counter="10" label="Pseudo" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="firstname" :rules="textRules" :counter="15" label="Nom" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="lastname" :rules="textRules" :counter="15" label="Prénom" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="address" :rules="textRules" :counter="15" label="Adresse" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="ville" label="Ville" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="pays" label="Pays" required></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field type="number" v-model="postal" label="Code Postal" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-textarea v-model="about" label="A propos de moi" hint="Votre biographie"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-icon class="mr-2" small>mdi-pencil</v-icon>
            <span class="caption grey--text font-weight-light">cette section permet juste de remplir le profil</span>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex sm4 xs6 md4 lg4 class="mt-10 mb-10">
        <v-card class="mx-auto mt-12" tile>
          <v-sheet class="avatar--offset mx-auto pb-10" color="transparent">
            <v-btn icon large>
              <v-avatar size="150px" item class="elevation-10">
                <v-img src="@/assets/logo.png" alt="Alpha"/></v-avatar>
            </v-btn>
          </v-sheet>
          <v-list-item three-line class="mt-8">
            <v-list-item-content>
              <v-list-item-subtitle class="headline grey--text font-weight-thin text-center">Projet Alpha Beta record's</v-list-item-subtitle>
              <v-list-item-subtitle class="caption black--text font-weight-light text-center">Copyright &copy; 2020 / By ICES Academy</v-list-item-subtitle>
              <v-card-text class="subtitle-1 grey--text font-weight-light text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus aliquid at ratione cumque accusamus blanditiis eius provident necessitatibus sed fugit porro eligendi sapiente id, aperiam ad ullam quam eos laboriosam!</v-card-text>
              <v-divider class="mx-4 mb-4"></v-divider>
              <v-btn rounded max-width="60px" color="success" fab right dark><v-icon>mdi-plus</v-icon></v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      address: '',
      ville: '',
      pays: '',
      postal: '',
      about: '',
      textRules: [
        v => !!v || 'Ce champs est requis',
        v => v.length <= 15 || 'Ce champ ne peux pas contenir plus de 15 caractères',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-sheet--offset {
    top: -24px;
    position: relative;
  }
  .avatar--offset {
    top: -40px;
    left: calc(50% - 25px);
    position: relative;
  }
</style>