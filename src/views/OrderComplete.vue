<script setup>
import { installWorker } from "../worker-api";
import { onMounted } from "vue";
import { useOrderDataStore } from "../stores/base";

const store = useOrderDataStore();

async function postOrderConfigData(data) {
  await fetch(`http://127.0.0.1:404/request/post`, {
    method: 'POST',
        headers: {
          Authorization: `Bearer`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
        })
}

async function getOrderConfigData() {
  const getResponse = await fetch(`http://127.0.0.1:404/request/get`, {
    method: 'GET',
        headers: {
          Authorization: `Bearer`,
          'Content-Type': 'application/json',
        }
  })
  if (await getResponse) {
    const restoredData = await getResponse.json();
    store.orderData.entityState = restoredData.entityState ?? null;
    store.orderData.entityType = restoredData.entityType ?? null;
    store.orderData.bundleName = restoredData.bundleName ?? null;
    store.orderData.firstName = restoredData.firstName ?? null;
    store.orderData.lastName = restoredData.lastName ?? null;
    store.orderData.emailAddress = restoredData.emailAddress ?? null;
    store.orderData.phoneNumber = restoredData.phoneNumber ?? null;
    store.orderData.businessName = restoredData.businessName ?? null;
  }
}

const event = new Event("navButtonClick");

function navButtonClick(e) {
  dispatchEvent(event);
  postOrderConfigData(store.orderData);
}

onMounted(() => {
  installWorker();
  getOrderConfigData();
});
</script>
<template>
  <div className="w-screen flex flex-col justify-center items-center h-screen">
    <h1 className="text-2xl font-bold mb-8">
      Thank you for your order, {{ store.orderData.firstName }}!
    </h1>
    <p>Please come back soon!</p>
    <div className="flex items-center justify-between">
      <router-link
        :to="{ name: 'Home' }"
        @click.native="navButtonClick"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Return Home
      </router-link>
    </div>
  </div>
</template>
