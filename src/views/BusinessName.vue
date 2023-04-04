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
    <h1 className="text-2xl font-bold pb-8">What is your business name?</h1>
    <form className="bg-white max-w-xs shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          for="business-name"
        >
          business-name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="business-name"
          type="text"
          placeholder="Your Company, LLC"
          v-model="store.orderData.businessName"
        />
      </div>
      <div className="flex items-center justify-between">
        <router-link
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          :to="{ name: 'ContactInfo' }"
          @click.native="navButtonClick"
          >Back</router-link
        >
        <router-link
          :to="{ name: 'OrderComplete' }"
          @click.native="navButtonClick"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Finish
        </router-link>
      </div>
    </form>
  </div>
</template>
