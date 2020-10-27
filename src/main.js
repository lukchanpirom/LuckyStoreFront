import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import VueApollo from "vue-apollo";


Vue.use(VueApollo);
Vue.config.productionTip = false;

const getHeaders = () => {
  const headers ={};
  const token = window.localStorage.getItem("apollo-token");
  if (token) {
    headers.authorzation = `Bearer ${token}`;
  }
  return headers;
};

const link = new HttpLink({
  uri: "http://localhost:1337/graphql",
  fetch,
  headers: getHeaders()
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename: false
  })
});

const apolloProvider = new VueApollo({
  defaultClient: client
})


new Vue({
  router,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount('#app')
