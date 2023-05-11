<template>
  <v-container fluid>
    <v-card width="760">
      <v-responsive max-width="1000">
        <div class="pa-6">
          <!--  -->
          <div class="text-h6 purple--text text--darken-4">UPLOAD DATA</div>
          <div class="py-1"></div>

          <!--  -->
          <v-divider
            :thickness="4"
            class="border-opacity-100"
            color="purple"
          ></v-divider>
          <div class="py-1"></div>

          <!--  -->
          <div class="text-body-1">Upload Data Per Leasing</div>
          <div class="py-2"></div>

          <!--  -->
          <v-row class="px-3">
            <v-responsive max-width="500">
              <v-file-input
                multiple
                outlined
                dense
                placeholder="Upload data di sini"
                prepend-icon
              ></v-file-input>
            </v-responsive>
            <div class="px-2"></div>
            <v-btn color="purple darken-4" outlined height="40">
              Pilih File
            </v-btn>
            <div class="px-2"></div>
            <v-btn color="purple darken-4 white--text" height="40">
              Simpan
            </v-btn>
          </v-row>
          <div class="py-2"></div>

          <!--  -->
          <div class="text-body-1">Upload Data Per Leasing</div>
          <div class="py-2"></div>

          <!--  -->
          <v-row class="px-3">
            <v-responsive max-width="500">
              <v-file-input
                multiple
                outlined
                dense
                placeholder="Upload data di sini"
                prepend-icon
              ></v-file-input>
            </v-responsive>
            <div class="px-2"></div>
            <v-btn color="purple darken-4" outlined height="40">
              Pilih File
            </v-btn>
            <div class="px-2"></div>
            <v-btn color="purple darken-4 white--text" height="40">
              Simpan
            </v-btn>
          </v-row>
        </div>
      </v-responsive>
    </v-card>
  </v-container>
</template>
