<template>
  <v-container fluid>
    <v-row v-if="!isDetail">
      <v-col cols="2">
        <v-select
          v-model="limit"
          :items="filterOptions"
          :disabled="loading"
          outlined
          placeholder="Menampilkan (Default 100)"
          @change="setLimit(limit)"
        ></v-select>
      </v-col>
      <v-col cols="10">
        <v-text-field
          v-model="search"
          placeholder="Cari berdasarkan leasing, cabang, atau nomor polisi"
          outlined
          prepend-inner-icon="mdi-magnify"
          @input="debouncedFetchLeasing"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card class="pa-5">
          <div class="text-h6">Detail Leasing</div>
          <div class="mb-5"></div>
          <v-row>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.leasing"
                label="Leasing"
                readonly
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.cabang"
                label="Cabang"
                readonly
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.no_kontrak"
                label="No. Kontrak"
                readonly
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.nama_debitur"
                label="Nama Debitur"
                readonly
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.nomor_polisi"
                label="Nomor Polisi"
                readonly
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.sisa_hutang"
                label="Sisa Hutang"
                readonly
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.tipe"
                label="Tipe"
                readonly
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.tahun"
                label="Tahun"
                readonly
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.no_rangka"
                label="No. Rangka"
                readonly
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.no_mesin"
                label="No. Mesin"
                readonly
                outlined
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="selectedLeasing.pic"
                label="PIC"
                readonly
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="ma-5" dark @click="isDetail = false"
              >Kembali</v-btn
            >
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-h6 mb-5" v-if="!isDetail">Total Data: {{ total }}</div>
    <v-data-table
      v-if="!isDetail"
      :headers="headers"
      :items="numberedItems"
      :loading="loading"
      :items-per-page="limit"
      :page.sync="currentPage"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.sisa_hutang="{ item }">
        {{ formatCurrency(item.sisa_hutang) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" dark @click="viewDetail(item.id)">
          Detail
        </v-btn>
        <v-btn color="red" dark @click="deleteItem(item.id)"> Hapus </v-btn>
      </template>
    </v-data-table>

    <v-pagination
      v-if="!isDetail"
      v-model="currentPage"
      :length="totalPages"
      @input="fetchLeasing"
      color="primary"
      circle
      class="my-5 custom-pagination"
      :max="10"
    ></v-pagination>
  </v-container>
</template>

<script>
import { debounce } from "lodash";

export default {
  data() {
    return {
      items: [],
      loading: false,
      pagination: {
        page: 1,
        itemsPerPage: 100,
      },
      totalPages: 10,
      total: 10,
      search: "",
      currentPage: 1,
      limit: 100,
      filterOptions: [
        { text: "10", value: "10" },
        { text: "25", value: "25" },
        { text: "50", value: "50" },
        { text: "100", value: "100" },
      ],
      debouncedFetchLeasing: debounce(this.fetchLeasing, 300),
      isDetail: false,
      selectedLeasing: null,
    };
  },
  computed: {
    headers() {
      return [
        { text: "No", value: "id" },
        { text: "Leasing", value: "leasing" },
        { text: "Cabang", value: "cabang" },
        { text: "Nama Debitur", value: "nama_debitur" },
        { text: "No Polisi", value: "nomor_polisi" },
        { text: "Sisa Hutang", value: "sisa_hutang" },
        { text: "Actions", value: "actions" },
      ];
    },
    numberedItems() {
      const startIndex = (this.currentPage - 1) * this.limit;
      return this.items.map((item, index) => ({
        ...item,
        id: startIndex + index + 1,
      }));
    },
  },
  mounted() {
    this.fetchLeasing();
    this.fetchLeasingTotal();
  },
  methods: {
    setLimit(limit) {
      this.limit = limit;
      this.fetchLeasing();
    },
    fetchLeasingTotal() {
      this.loading = true;
      this.$axios
        .get("home")
        .then((response) => {
          this.total = response.data.data.leasing;
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
    fetchLeasing() {
      this.loading = true;
      this.$axios
        .get("leasing", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.items = response.data.data;
          this.totalPages = Math.ceil(response.data.data.total / this.limit);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return formatter.format(value);
    },
    viewDetail(itemId) {
      this.selectedLeasing = this.items.find((item) => item.id === itemId);
      this.isDetail = true;
    },
    editItem(itemId) {},
    deleteItem(itemId) {},
  },
};
</script>
