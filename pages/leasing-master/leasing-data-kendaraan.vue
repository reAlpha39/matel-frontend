<template>
  <div>
    <div v-if="!isDetail">
      <div>Data Kendaraan {{ leasingName }}</div>
      <v-row class="pt-5 mx-1">
        <v-btn height="40px" color="primary">Upload Data Kendaraan</v-btn>
        <div class="mx-2"></div>
        <v-btn height="40px" color="purple" dark @click="showModal = true"
          >Download Template</v-btn
        >
        <div class="mx-2"></div>
        <v-select
          v-model="selectedCabang"
          :items="cabang"
          :disabled="loading"
          solo
          dense
          item-text="nama_cabang"
          item-value="id"
          placeholder="Filter Cabang"
          @change="selectCabang(selectedCabang)"
        ></v-select>
        <div class="mx-2"></div>
        <v-text-field
          v-model="search"
          placeholder="Cari berdasarkan leasing, cabang, atau nomor polisi"
          solo
          dense
          prepend-inner-icon="mdi-magnify"
          @input="debouncedFetchLeasing"
        ></v-text-field>
      </v-row>
    </div>
    <v-row v-else class="pa-5">
      <v-col cols="12">
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
      </v-col>
    </v-row>
    <div class="text-body-2 px-2 mb-2" v-if="!isDetail">
      Total Data: {{ total }}
    </div>
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
      @input="fetchLeasing"
      color="primary"
      circle
      class="my-5 custom-pagination"
      :max="10"
    ></v-pagination>

    <v-dialog v-model="showModal" max-width="500">
      <v-card class="pa-5">
        <div class="text-h6">Download Template</div>
        <div class="mb-5"></div>
        <v-select
          v-model="selectedDownloadCabang"
          :items="cabang"
          item-text="nama_cabang"
          item-value="id"
          solo
          dense
          placeholder="Pilih Cabang"
        ></v-select>
        <div class="mb-5"></div>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn color="red" dark @click="showDownloadModal">Batal</v-btn>
          <div class="mx-2"></div>
          <v-btn color="primary" @click="downloadTemplate">Download</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { debounce } from "lodash";

export default {
  props: {
    leasingId: 0,
    leasingName: "",
    cabangName: "",
  },
  data() {
    return {
      items: [],
      cabang: [],
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
      debouncedFetchLeasing: debounce(this.fetchLeasing, 300),
      isDetail: false,
      selectedLeasing: null,
      selectedCabang: null,
      selectedDownloadCabang: null,
      showModal: false,
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
    this.fetchCabang();
    this.fetchLeasingTotal();
  },
  methods: {
    fetchCabang() {
      this.loading = true;
      this.$axios
        .get("cabang", {
          params: {
            leasing_id: this.leasingId,
            search: "",
            page: 0,
            limit: 0,
          },
        })
        .then((response) => {
          this.cabang = response.data.data.cabang;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
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
        .get("kendaraan", {
          params: {
            leasing: this.leasingName,
            page: 0,
            cabang: this.cabangName,
            limit: 0,
          },
        })
        .then((response) => {
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
    selectCabang(item) {
      this.selectedCabang = item;
      const cabangFiltered = this.cabang.filter(
        (item) => item.id === this.selectedCabang
      );
      this.cabangName = cabangFiltered[0].nama_cabang;
      this.fetchLeasing();
    },
    editItem(itemId) {},
    deleteItem(itemId) {},
    downloadTemplate() {
      this.fileUrl = "http://example.com/template.xlsx";
      this.$refs.downloadLink.click();
      this.showModal = false;
    },
    showDownloadModal() {
      this.showModal = !this.showModal;
      this.selectedDownloadCabang = null;
    },
  },
};
</script>
