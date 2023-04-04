import { defineStore } from "pinia";

export const useOrderDataStore = defineStore("orderData", {
  state: () => ({
    orderData: {
      entityState: null,
      entityType: null,
      bundleName: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      phoneNumber: null,
      businessName: null,
    },
    /* orderData: {
      entityState: "Illinois",
      entityType: "LLC",
      bundleName: "Silver",
      firstName: "John",
      lastName: "Doe",
      emailAddress: "email@address.com",
      phoneNumber: "555-555-5555",
      businessName: "Business Co.",
    }, */
  }),
});
