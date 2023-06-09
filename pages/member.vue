<template>
  <v-container fluid>
      <v-row>
        <!-- <v-col cols="2">
          <v-select
            v-model="limit"
            :items="filterOptions"
            :disabled="loading"
            outlined
            placeholder="Show (Default 100)"
            @change="setLimit(limit)"
          ></v-select>
        </v-col> -->
        <v-col>
          <v-text-field
            v-model="search"
            placeholder="Cari member berdasarkan nama"
            outlined
            prepend-inner-icon="mdi-magnify"
            @input="searchUsers"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="filteredUsers"
        :search="search"
      >
      <template v-slot:item.status="{ item }">
          {{ item.status === 0 ? 'Trial' : 'Premium' }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" dark @click="openDetailModal(item)">
            Detail
          </v-btn>
          <v-btn color="primary" outlined dark @click="editUser(item)">
            Ubah Status
          </v-btn>
          <v-btn color="red" dark @click="deleteUser(item)">
            Hapus
          </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="isDetailModalOpen" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Detail Pengguna</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="selectedUser.username"
              label="Username"
              readonly
              outlined
            ></v-text-field>
            <v-text-field
              v-model="selectedUser.email"
              label="Email"
              readonly
              outlined
            ></v-text-field>
            <v-text-field
              :value="selectedUser.status === 0 ? 'Trial' : 'Premium'"
              label="Status"
              readonly
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" dark @click="closeDetailModal">Tutup</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

</template>

<script>
export default {
  data() {
    return {
      users: [],
      search: '',
      isDetailModalOpen: false,
      selectedUser: {
        username: '',
        email: '',
        status: 0
      },
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nama', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.username.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  methods: {
    fetchUser() {
      this.$axios
        .get("member")
        .then((response) => {
          console.log(response)
          this.users = response.data.data
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
        });
    },
    openDetailModal(user) {
      this.selectedUser = user;
      this.isDetailModalOpen = true;
    },
    closeDetailModal() {
      this.selectedUser = null;
      this.isDetailModalOpen = false;
    },
    searchUsers() {
      setTimeout(() => {
        this.fetchUsers();
      }, 300);
    },
    editUser(user) {
      console.log('Edit user:', user);
    },
    deleteUser(user) {
      console.log('Delete user:', user);
    },
    isSelected(item) {
      return this.selectedUser && this.selectedUser.id === item.id;
    },
    selectUser(item) {
      this.selectedUser = item;
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>
