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
