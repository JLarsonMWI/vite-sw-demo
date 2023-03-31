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
  }),
});
