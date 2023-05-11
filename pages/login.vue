<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <h1 class="text-center">Login form</h1>
            <div class="mt-6"></div>
            <v-form>
              <v-text-field
                class="rounded-pill"
                placeholder="Masukan Alamat Email"
                name="email"
                type="text"
                v-model="email"
                outlined
              ></v-text-field>
              <v-text-field
                class="rounded-pill"
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                placeholder="Kata Sandi / Password"
                outlined
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-form>
            <v-spacer></v-spacer>
            <v-btn
              class="rounded-pill"
              height="50"
              block
              color="primary"
              @click="loginHandler"
              >Login</v-btn
            >
            <div class="mt-6"></div>
            <v-row class="align-center justify-center">
              <p>Belum memiliki akun?&nbsp;</p>
              <p class="purple--text text--darken-2">Daftar</p>
            </v-row>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      show1: false,
      show2: true,
      //   password: "Password",
      rules: {
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      email: null,
      password: null,
    };
  },
  methods: {
    async loginHandler() {
      const data = { email: this.email, password: this.password };
      console.log(data);
      try {
        const response = await this.$auth.loginWith("local", { data: data });
        console.log(response);
        this.$auth.$storage.setUniversal("email", response.data.email);
        await this.$auth.setUserToken(
          response.data.access_token,
          response.data.refresh_token
        );
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>

<style></style>
