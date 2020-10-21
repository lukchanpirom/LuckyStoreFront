<template>
  <v-container class="grey lighten-5 mx-auto">
    <v-row>
      <v-col cols="12" sm="6" md="2">
        <v-row>
          <v-card height="350" width="256" class="mx-auto">
            <v-navigation-drawer permanent>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    Customer
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list nav class="ma-0 pa-0">
                <v-list-item
                  v-for="item in customers"
                  :key="item.customer_name"
                  link
                  class="mb-0 px-5 rounded-0"
                  @click="setDesserts(item)"
                  :class="
                    customers[customerIndex] === item ? 'orange lighten-1' : ''
                  "
                >
                  <v-list-item-content>
                    <v-list-item-title>{{
                      item.customer_name
                    }}</v-list-item-title>
                  </v-list-item-content>
                  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-row>
        <v-row>
          <v-card height="285" width="256" class="mx-auto mt-4">
            <v-card-title>
              <h4>About</h4>
              <v-spacer></v-spacer>
              <v-btn icon @click="editItem(customers[customerIndex], false)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>
                <strong>Customer name: </strong
                >{{ customers[customerIndex].customer_name }}
              </p>
              <p>
                <strong>Customer TAX ID: </strong
                >{{ customers[customerIndex].customer_tax_id }}
              </p>
              <p>
                <strong>Customer Address: </strong
                >{{ customers[customerIndex].customer_address }}
              </p>
              <p>
                {{ text }}
              </p>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="6" md="10">
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          sort-by="calories"
          class="elevation-1"
          height="530"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>{{
                customers[customerIndex].customer_name
              }}</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="ml-1"
                style="width: 1px"
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Create
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    <v-spacer></v-spacer>
                    <v-btn
                      v-if="
                        !editState ? false : editedIndex === -1 ? true : false
                      "
                      :dark="!addORcreate ? true : false"
                      :color="!addORcreate ? 'primary' : ''"
                      @click="changeState"
                      >New Customer</v-btn
                    >
                    <v-btn
                      v-if="
                        !editState ? false : editedIndex === -1 ? true : false
                      "
                      :dark="addORcreate ? true : false"
                      :color="addORcreate ? 'primary' : ''"
                      class="ml-2"
                      @click="changeState"
                      >Add Email</v-btn
                    >
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row v-if="!addORcreate || !editState">
                        <v-text-field
                          v-model="editedItem.customer_name"
                          label="Customer Name"
                        ></v-text-field>
                      </v-row>
                      <v-row v-if="!addORcreate || !editState">
                        <v-text-field
                          v-model="editedItem.customer_tax_id"
                          label="Tax ID"
                        ></v-text-field>
                      </v-row>
                      <v-row v-if="!addORcreate || !editState" class="mt-5">
                        <v-textarea
                          outlined
                          label="Address"
                          v-model="editedItem.customer_address"
                        ></v-textarea>
                      </v-row>
                      <v-row>
                        <v-text-field
                          v-if="!editState ? false : addORcreate"
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item, true)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

const GET_MY_CUSTOMERS = gql`
  query {
    customers {
      id
      customer_name
      customer_tax_id
      customer_address
      employees {
        id
        email
      }
    }
  }
`;

const CREATE_NEW_CUSTOMERS = gql`
  mutation createCustomer($newcustomer: CustomerInput!) {
    createCustomer(input: { data: $newcustomer }) {
      customer {
        id
        customer_name
        customer_tax_id
        customer_address
        employees {
          id
          email
        }
      }
    }
  }
`;

const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($id: ID!, $about: editCustomerInput!) {
    updateCustomer(input: { where: { id: $id }, data: $about }) {
      customer {
        id
        customer_name
        customer_tax_id
        customer_address
        employees {
          id
          email
        }
      }
    }
  }
`;

// const DELETE_CUSTOMER = gql`
// mutation($id: ID!) {
//   deleteCustomer(input: { where: { id: $id }}) {
//     customer {
//       id
//       customer_name
//       customer_tax_id
//       customer_address
//       employees {
//         id
//         email
//       }
//     }
//   }
// }
// `;

export default {
  apollo: {
    customers: {
      query: GET_MY_CUSTOMERS,
    },
  },
  data() {
    return {
      customers: [
        {
          id: "",
          customer_name: "",
          customer_tax_id: "",
          customer_address: "",
          employees: [
            {
              id: "",
              email: "",
            },
          ],
        },
      ],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        customer_name: "",
        customer_tax_id: "",
        customer_address: "",
        email: "",
      },
      defaultItem: {
        customer_name: "",
        customer_tax_id: "",
        customer_address: "",
        email: "",
      },
      addORcreate: true,
      customerIndex: 0,
      search: "",
      text: null,
      editState: true,
    };
  },
  computed: {
    formTitle() {
      return !this.editState
        ? "Edit Customer"
        : this.editedIndex === -1
        ? this.addORcreate
          ? "New Email"
          : "New Customer"
        : "Edit Customer";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    customers(val) {
      this.desserts = val[this.customerIndex].employees;
    },
  },

  mounted() {},

  methods: {
    editItem(item, position) {
      if (!position) {
        this.editState = false;
      } else {
        this.editState = true;
        this.editedIndex = this.desserts.indexOf(item);
      }
      this.editedItem = Object.assign({}, item);
      console.log(this.editedItem);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.addORcreate = true;
        this.editState = true;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.desserts[this.editedIndex], this.editedItem);
      // } 
      if (!this.editState) {
        const upcustomer = {
          customer_name: this.editedItem.customer_name,
          customer_tax_id: this.editedItem.customer_tax_id.trim(),
          customer_address: this.editedItem.customer_address,
        };
        this.$apollo.mutate({
          mutation: UPDATE_CUSTOMER,
          variables: {
            id: this.customers[this.customerIndex].id,
            about: upcustomer,
          },
          update: (cache, { data: { updateCustomer: { customer } } }) => {
            try {
              const data = cache.readQuery({
                query: GET_MY_CUSTOMERS,
              });
              const index = data.customers.findIndex(c => c.id === this.customers[this.customerIndex].id);
              data.customers.splice(index, 1, customer);
              cache.writeQuery({
                query: GET_MY_CUSTOMERS,
                data
              })
            } catch (error) {
              console.log(error);
            }
          }
        })
      } else if(this.editState && this.editedIndex > -1) {
        const indexemail = this.customers[this.customerIndex].employees.findIndex(e => e.id === this.editedItem.id);
        let arr = this.customers;
        console.log(this.editedItem);
        arr[this.customerIndex].employees.splice(indexemail, 1, this.editedItem);
        const upcustomer = {
          employees: arr[this.customerIndex].employees
        };
        this.$apollo.mutate({
          mutation: UPDATE_CUSTOMER,
          variables: {
            id: this.customers[this.customerIndex].id,
            about: upcustomer,
          },
          update: (cache, { data: { updateCustomer: { customer } } }) => {
            try {
              const data = cache.readQuery({
                query: GET_MY_CUSTOMERS,
              });
              data.customers[this.customerIndex].employees.splice(indexemail, 1, customer.employees[indexemail]);
              cache.writeQuery({
                query: GET_MY_CUSTOMERS,
                data
              })
            } catch (error) {
              console.log(error);
            }
          }
        })
      } else if (!this.addORcreate) {
        const customer = {
          customer_name: this.editedItem.customer_name,
          customer_tax_id: this.editedItem.customer_tax_id.trim(),
          customer_address: this.editedItem.customer_address,
          employees: [],
        };
        this.$apollo.mutate({
          mutation: CREATE_NEW_CUSTOMERS,
          variables: {
            newcustomer: customer,
          },
          update: (
            cache,
            {
              data: {
                createCustomer: { customer },
              },
            }
          ) => {
            try {
              const data = cache.readQuery({
                query: GET_MY_CUSTOMERS,
              });
              data.customers.splice(0, 0, customer);
              cache.writeQuery({
                query: GET_MY_CUSTOMERS,
                data,
              });
            } catch (error) {
              console.log(error);
            }
          },
        });
      } else {
        this.desserts.unshift(this.editedItem);
      }
      this.close();
    },
    changeState() {
      this.addORcreate = !this.addORcreate;
    },
    setDesserts(val) {
      this.customerIndex = this.customers.indexOf(val);
      this.desserts = this.customers[this.customerIndex].employees;
    },
  },
};
</script>