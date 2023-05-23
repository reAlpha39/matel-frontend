<template>
  <v-container fluid>
    <v-text-field
      v-model="search"
      placeholder="Cari berdasarkan leasing, cabang atau nama debitur"
      solo
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :loading="loading"
      hide-default-footer
      class="elevation-1"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      loading: false,
      pagination: {
        page: 1,
        // itemsPerPage: 10,
      },
      search: "",
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(
        (item) =>
          item.leasing.toLowerCase().includes(this.search.toLowerCase()) ||
          item.cabang.toLowerCase().includes(this.search.toLowerCase()) ||
          item.nama_debitur.toLowerCase().includes(this.search.toLowerCase()) ||
          item.nomor_polisi.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    // totalPages() {
    //   return Math.ceil(
    //     this.filteredItems.length / this.pagination.itemsPerPage
    //   );
    // },
    headers() {
      return [
        { text: "ID", value: "id" },
        { text: "Leasing", value: "leasing" },
        { text: "Cabang", value: "cabang" },
        { text: "Nama Debitur", value: "nama_debitur" },
        { text: "No Polisi", value: "nomor_polisi" },
        { text: "Sisa Hutang", value: "sisa_hutang" },
      ];
    },
    paginationOptions() {
      return {
        itemsPerPage: this.pagination.itemsPerPage,
        page: this.pagination.page,
      };
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$axios
        .get("leasing")
        .then((response) => {
          this.items = response.data.data;
          console.log(this.items);
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

<style>
.elevation-1 {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}
</style>
