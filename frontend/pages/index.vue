<template>
  <v-row class="mb-6 text-center" no-gutters>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card color="primary pa-6 ma-6">
        <h1 class="text-h1">{{ total }}</h1>
        <p class="text-body-1">Total leasing</p>
      </v-card>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card color="primary pa-6 ma-6">
        <h1 class="text-h1">12</h1>
        <p class="text-body-1">Total Data Kendaraan</p>
      </v-card>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card color="primary pa-6 ma-6">
        <h1 class="text-h1">12</h1>
        <p class="text-body-1">Total Data Kendaraan Per Leasing</p>
      </v-card>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card color="primary pa-6 ma-6">
        <h1 class="text-h1">12</h1>
        <p class="text-body-1">Total Member Trial</p>
      </v-card>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card color="primary pa-6 ma-6">
        <h1 class="text-h1">12</h1>
        <p class="text-body-1">Total member Premium</p>
      </v-card>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card color="primary pa-6 ma-6">
        <h1 class="text-h1">12</h1>
        <p class="text-body-1">Total Payment Confirmation</p>
      </v-card>
    </v-col>
    <v-col xs="12" sm="12" md="6" lg="4" xl="2">
      <v-card color="primary pa-6 ma-6">
        <h1 class="text-h1">12</h1>
        <p class="text-body-1">Total member expired</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      total: null,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$axios
        .get("leasing")
        .then((response) => {
          this.total = response.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
