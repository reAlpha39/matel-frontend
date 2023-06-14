<template>
  <v-row class="mb-6" no-gutters>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card  class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">TOTAL LEASING</p>
          <p class="text-body-1 mb-2">Jumlah leasing</p>
          <h1 class="text-h3 ma-0 font-weight-bold">{{ loading ? 0 : homeTotal.leasing }}</h1>
        </div>
      </v-card>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card  class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">TOTAL MEMBER TRIAL</p>
          <p class="text-body-1 mb-2">Jumlah member trial</p>
          <h1 class="text-h3 ma-0 font-weight-bold">{{ loading ? 0 : homeTotal.expired_members }}</h1>
        </div>
      </v-card>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card  class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">TOTAL MEMBER PREMIUM</p>
          <p class="text-body-1 mb-2">Jumlah member premium</p>
          <h1 class="text-h3 ma-0 font-weight-bold">{{ loading ? 0 : homeTotal.premium_members }}</h1>
        </div>
      </v-card>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card  class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">TOTAL MEMBER EXPIRED</p>
          <p class="text-body-1 mb-2">Jumlah member expired</p>
          <h1 class="text-h3 ma-0 font-weight-bold">{{ loading ? 0 : homeTotal.expired_members }}</h1>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: 'auth',
  data() {
    return {
      loading: false,
      homeTotal: {
        leasing: 0,
        expired_members: 0,
        premium_members: 0,
        trial_members: 0,
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$axios
        .get("home")
        .then((response) => {
          this.homeTotal = response.data.data;
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
  },
};
</script>
