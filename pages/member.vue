<template>
  <v-container>
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
        <template #item.actions="{ item }">
          <v-icon small class="mr-2" @click="editUser(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteUser(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nama', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Status', value: 'status' },
        { text: 'Aksi', value: 'aksi' },
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
  },
  mounted() {
    this.fetchUser();
  },
};
</script>
