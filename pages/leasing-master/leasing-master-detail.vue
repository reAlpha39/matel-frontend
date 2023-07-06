<template>
  <v-card height="27em">
    <!-- Table view -->
    <div class="mx-5">
      <div class="pt-6"></div>
      <v-row class="mx-1">
        <v-btn class="mb-4" color="primary" @click="openCreateDialog(true)">
          Tambah Cabang
        </v-btn>
        <v-spacer></v-spacer>
        <v-row>
          <v-col xs="10" lg="9">
            <v-text-field
              v-model="search"
              label="Cari"
              solo
              dense
            ></v-text-field>
          </v-col>
          <v-col xs="2" lg="2">
            <v-btn
              class="mb-4"
              height="40px"
              color="primary"
              @click="fetchData"
            >
              Cari
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :options.sync="options"
        :loading="loading"
        :server-items-length="total"
        :items-per-page="limit"
        @pagination="fetchData"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="secondary"
            height="27px"
            min-width="60px"
            @click="editItem(item)"
          >
            <div class="text-caption">Edit</div>
          </v-btn>
          <v-btn
            color="red"
            height="27px"
            min-width="60px"
            dark
            @click="confirmDelete(item)"
          >
            <div class="text-caption">Hapus</div>
          </v-btn>
        </template>
      </v-data-table>
    </div>

    <v-dialog v-model="createDialog" max-width="1000px" max-height="1000px">
      <v-card>
        <v-card-title>Tambah Cabang</v-card-title>
        <v-card-text>
          <v-form ref="createForm">
            <v-text-field
              v-model="newLeasing.nama_cabang"
              :rules="nameRules"
              outlined
              label="Nama Cabang"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" min-width="160px" @click="createLeasing">
            Tambah
          </v-btn>
          <v-btn
            color="secondary"
            min-width="160px"
            @click="openCreateDialog(false)"
          >
            Batal
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" max-width="1000px" max-height="1000px">
  <v-card>
    <v-card-title>Edit Cabang</v-card-title>
    <v-card-text>
      <v-form ref="editForm">
        <v-text-field
          v-model="editLeasing.nama_cabang"
          :rules="nameRules"
          outlined
          label="Nama Cabang"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" min-width="160px" @click="updateCabang">
        Edit
      </v-btn>
      <v-btn color="secondary" min-width="160px" @click="cancelEdit">
        Batal
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

<v-dialog v-model="deleteDialog" max-width="400px">
  <v-card>
    <v-card-title>Konfirmasi Hapus</v-card-title>
    <v-card-text> Anda yakin akan menghapus data ini? </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="secondary" @click="cancelDelete">Batal</v-btn>
      <v-btn color="red" dark @click="deleteCabang">Hapus</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    leasingId: 0,
  },
  data() {
    return {
      items: [],
      headers: [
        { text: "Nama Cabang", value: "nama_cabang" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      search: "",
      total: 0,
      limit: 5,
      options: {},
      loading: false,
      createDialog: false,
      editDialog: false,
      deleteDialog: false,
      selectedItem: null,
      showDetail: false,
      selectedLeasing: null,
      newLeasing: {
        leasing_id: this.leasingId,
        nama_cabang: "",
      },
      editLeasing: {
        id: "",
        nama_cabang: "",
        nama_pic: "",
        no_hp_pic: "",
      },
      nameRules: [(v) => !!v || "Wajib diisi"],
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.$store.state.myString;
      },
      set(value) {
        this.$store.dispatch("updateString", value);
      },
    },
    storedString() {
      return this.$store.state.myString;
    },
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.$axios
        .get("cabang", {
          params: {
            leasing_id: this.leasingId,
            search: this.search,
            page: this.options.page,
            limit: this.limit,
          },
        })
        .then((response) => {
          this.items = response.data.data.cabang;
          this.total = response.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createLeasing() {
      this.$store.dispatch("updateString", "");
      if (this.$refs.createForm.validate()) {
        this.$axios
          .post("cabang", this.newLeasing)
          .then((response) => {
            this.$refs.createForm.reset();
            this.fetchData();
            this.newLeasing = {
              leasing_id: this.leasingId,
              nama_cabang: "",
            };
            this.$store.dispatch("updateString", "Cabang Added");
            this.createDialog = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    updateCabang() {
    if (this.$refs.editForm.validate()) {
      const { id, ...data } = this.editLeasing;
      this.$axios
        .put(`cabang/${id}`, data)
        .then((response) => {
          this.$refs.editForm.reset();
          this.fetchData();
          this.editLeasing = {
            id: "",
            nama_cabang: "",
          };
          this.editDialog = false;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  deleteCabang() {
    const { id } = this.editLeasing;
    this.$axios
      .delete(`cabang/${id}`)
      .then((response) => {
        this.fetchData();
        this.deleteDialog = false;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    editItem(item) {
      this.editLeasing = { ...item };
      this.editDialog = true;
    },
    updateLeasing() {
      if (this.$refs.editForm.validate()) {
        const { id, ...data } = this.editLeasing;
        this.$axios
          .put(`leasing-master/${id}`, data)
          .then((response) => {
            this.$refs.editForm.reset();
            this.fetchData();
            this.editLeasing = {
              id: "",
              nama_cabang: "",
            };
            this.editDialog = false;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    cancelEdit() {
      this.editDialog = false;
    },
    cancelDelete() {
      this.deleteDialog = false;
    },
    confirmDelete(item) {
      this.editLeasing = { ...item };
      this.deleteDialog = true;
    },
    deleteItem() {
      const { id } = this.editLeasing;
      this.$axios
        .delete(`leasing-master/${id}`)
        .then((response) => {
          this.fetchData();
          this.deleteDialog = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    openCreateDialog(createDialog) {
      this.createDialog = createDialog;
    },
    showLeasingDetail(item) {
      this.selectedLeasing = { ...item };
      this.showDetail = true;
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    search(newValue) {
      if (newValue === "") {
        this.fetchData();
      }
    },
  },
};
</script>
