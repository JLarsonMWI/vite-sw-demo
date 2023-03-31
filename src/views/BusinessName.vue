<script setup>
import { installWorker } from "../worker-api";
import { onMounted } from "vue";
import { useOrderDataStore } from "../stores/base";

const store = useOrderDataStore();

const postConifgData = async () => {
  const parsedOrderData = JSON.parse(JSON.stringify(store.orderData));
  postOrderConfigData(parsedOrderData);
};

async function postOrderConfigData(data) {
  await fetch(`localhost`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
const event = new Event("navButtonClick");

function navButtonClick(e) {
  console.log(JSON.stringify(store.orderData));
  dispatchEvent(event);
  postOrderConfigData();
}
onMounted(() => {
  installWorker();
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
