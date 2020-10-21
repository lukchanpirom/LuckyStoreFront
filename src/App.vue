<template>
  <v-app class="ma-0 pa-0">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://lh3.googleusercontent.com/ogw/ADGmqu8TedgabzHSdmgMNDdJFiS8_yBFl11ej6oyTKBG=s83-c-mo"
          width="40"
        />

        <h1>Lucky Store</h1>
      </div>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
