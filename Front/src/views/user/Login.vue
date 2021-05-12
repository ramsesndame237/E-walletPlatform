<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row :class="animation" align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <div class="display-1 font-italic font-weight-light text-transform-uppercase mb-3" style="color: #0C0C0B">Welcome  <span class="subtitle-1">on the E-wallet platform</span></div>
            <v-alert transition="scale-transition" dismissible v-show="errorConnection" v-model="alert" dense outlined type="error">{{ errorConnection }}</v-alert>
            <v-tabs dark background-color="#0C0C0B">
              <v-tab>Sign In</v-tab>

              <v-tab-item>
                <v-card class="elevation-12" flat tile>
                  <v-card-text>
                    <v-form>
                      <v-text-field color="#0C0C0B" label="Email" v-model="userConnect.username" name="login" prepend-icon="mdi-email" type="text"/>
                      <v-text-field color="#0C0C0B" id="password" v-model="userConnect.password" label="Password" name="password" prepend-icon="mdi-lock-outline" type="password"/>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-dialog v-model="forgetPass" width="500px">
                      <v-card elevation="15" tile flat min-height="200px">
                        <v-container>
                          <v-card-text>
                            <div>Forgot your password</div>
                            <v-row>
                              <v-col cols='10'>
                                <v-text-field color="#0C0C0B" class="mb-0 mt-5" outlined label="Enter your Email adresse" prepend-inner-icon="mdi-alert-decagram-outline"></v-text-field>
                              </v-col>
                              <v-col cols='2' class="mb-0 mt-7">
                                <v-btn fab dark small color="#0C0C0B">
                                  <v-icon dark>mdi-telegram</v-icon>
                                </v-btn>
                              </v-col>
                            </v-row>
                            <span class="text--primary caption mt-0">Enter your email address to retrieve your password</span>
                          </v-card-text>
                        </v-container>
                      </v-card>
                    </v-dialog>
                    <span class="hoverPointer ml-4 mt-0 caption font-weight-light" style="color: #0C0C0B" @click="forgetPass = true">Forgot your password?</span>
                    <v-spacer />
                    <v-btn color="#0C0C0B" dark tile class="elevation-5 sendButton" @click="login">Sign</v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-snackbar v-model="snack" top right :timeout="6000" :color="snackColor" outlined style="opacity: 1; margin-top: 65px">
      {{ snackText }}
      <v-btn text @click="snack = false"><v-icon>mdi-check</v-icon></v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    alert: false,
    forgetPass: false,
    activateAccount: false,
    errorConnection: false,
    animation: 'animate-in',
    confirmationCode: "",
    users: [],
    snack: false,
    snackText: '',
    snackColor: 'cyan darken-2',
    currentUser: null,
    userConnect: {
      username: null,
      password: null
    }
  }),
  methods: {
    setRandomId() {
      let result = "";
      let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 15; i++) {
        result += char.charAt(Math.floor(Math.random() * char.length));
      }

      return result;
    },

    login() {
      this.currentUser = {
        id: this.setRandomId(),
        username: this.userConnect.username,
        password: this.userConnect.password
      }
      if (this.users.length > 0) {
        this.users.forEach(user => {
          if (this.userConnect.username === user.login) {
            if (this.userConnect.password === user.password) {
              localStorage.setItem('jules-user-connected', JSON.stringify(user))
              this.$router.push({ path: '/' })
            } else {
              this.snackColor = 'red'
              this.snackText = 'Mot de passe incorrect !'
              this.snack = true
              this.animation = 'animate-wrong'
              setTimeout(() => {
                this.animation = ''
              }, 550)
            }
          } else {
            this.snackColor = 'red'
            this.snackText = 'Nom d\'utilisateur incorrect !'
            this.snack = true
            this.animation = 'animate-wrong'
            setTimeout(() => {
              this.animation = ''
            }, 550)
          }
        })
      } else {
        if (this.userConnect.username === 'victor@gmail.com') {
          if (this.userConnect.password === 'victor') {
            localStorage.setItem('jules-user-connected', JSON.stringify(this.currentUser))
            this.$router.push({ path: '/' })
          } else {
            this.snackColor = 'red'
            this.snackText = 'Mot de passe incorrect !'
            this.snack = true
            this.animation = 'animate-wrong'
            setTimeout(() => {
              this.animation = ''
            }, 550)
          }
        } else {
          this.snackColor = 'red'
          this.snackText = 'Email or Password incorrect !'
          this.snack = true
          this.animation = 'animate-wrong'
          setTimeout(() => {
            this.animation = ''
          }, 550)
        }
      }
    }
  },
  mounted () {
    if (window.localStorage.getItem('jules-users') !== null && window.localStorage.getItem('jules-users').length > 0) {
      let users = JSON.parse(window.localStorage.getItem('jules-users'))
      users.forEach(user => { if (user.statut === 0) { this.users.push(user) } })
    }
  }
};
</script>

<style lang="scss" scoped>
  .hoverPointer {
    cursor: pointer;
  }
  .animate-in {
    transform-origin: left;
    animation: in .6s ease-in-out;
  }
  .animate-out {
    transform-origin: bottom left;
    animation: out .6s ease-in-out;
  }
  .animate-out-2 {
    transform-origin: bottom left;
    animation: out-2 .6s ease-in-out;
  }
  .animate-wrong {
    animation: wrong .4s ease-in-out;
  }
  @keyframes in {
    0% {
      opacity: 0;
      transform: rotateY(90deg);
    }
    100% {
      opacity: 1;
      transform: rotateY(0deg);
    }
  }
  @keyframes out {
    0% { transform: translateY(0px) rotate(0deg); }
    60% { transform: rotate(10deg); }
    100% { transform: translateY(1000px); }
  }
  @keyframes out-2 {
    0% { transform: translateY(0px) rotate(0deg); }
    60% { transform: rotate(-10deg); }
    100% { transform: translateY(-1000px); }
  }
  @keyframes wrong {
    0% { transform: translateX(0); }
    20% { transform: translateX(40px); }
    40% { transform: translateX(20px); }
    60% { transform: translateX(40px); }
    80% { transform: translateX(20px); }
    100% { transform: translateX(0); }
  }
  .sendButton{
    border-radius: 8px;
    position: absolute;
    bottom: -1rem;
    right: 2rem;
    transition: all 1.5s;
  }
  .sendButton:hover{
    transform: rotate(2deg) scale(1.1);

  }
</style>