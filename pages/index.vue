<template>

  <div>
    <v-row class="mb-6" no-gutters>
    <v-col cols="12" lg="4" xl="3">
      <v-card class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">TOTAL LEASING</p>
          <p class="text-body-1 mb-2">Jumlah leasing</p>
          <h1 class="text-h3 ma-0 font-weight-bold">
            {{ loading ? 0 : homeTotal.leasing }}
          </h1>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" xl="3">
      <v-card class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">TOTAL MEMBER TRIAL</p>
          <p class="text-body-1 mb-2">Jumlah member trial</p>
          <h1 class="text-h3 ma-0 font-weight-bold">
            {{ loading ? 0 : homeTotal.trial_members }}
          </h1>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" xl="3">
      <v-card class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">TOTAL MEMBER PREMIUM</p>
          <p class="text-body-1 mb-2">Jumlah member premium</p>
          <h1 class="text-h3 ma-0 font-weight-bold">
            {{ loading ? 0 : homeTotal.premium_members }}
          </h1>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" xl="3">
      <v-card class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">TOTAL MEMBER EXPIRED</p>
          <p class="text-body-1 mb-2">Jumlah member expired</p>
          <h1 class="text-h3 ma-0 font-weight-bold">
            {{ loading ? 0 : homeTotal.expired_members }}
          </h1>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" xl="3">
      <v-card class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">TOTAL DATA KENDARAAN</p>
          <p class="text-body-1 mb-2">Jumlah data kendaraan</p>
          <h1 class="text-h3 ma-0 font-weight-bold">
            {{ loading ? 0 : homeTotal.kendaraan }}
          </h1>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" xl="3">
      <v-card class="ma-5 pa-5">
        <div>
          <p class="text-h6 ma-0 primary--text">KONFIRMASI PEMBAYARAN</p>
          <p class="text-body-1 mb-2">Total konfirmasi pembayaran</p>
          <h1 class="text-h3 ma-0 font-weight-bold">
            12
          </h1>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-card class="mx-5 pa-10">
    <div class="text-medium font-weight-bold">
      Data Kendaraan Per Leasing
    </div>
    <LeasingChart/>
  </v-card>
</div>
</template>

<script>
import LeasingChart from '../components/Chart/LeasingChart.vue';
export default {
    name: "IndexPage",
    middleware: "auth",
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
    components: { LeasingChart }
};
</script>
