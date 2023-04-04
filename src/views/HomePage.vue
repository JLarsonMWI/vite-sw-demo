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
  <div
    className="flex flex-col items-center justify-center w-screen h-screen text-center"
  >
    <h1 className="pb-8 text-2xl font-bold">
      Enter your State, Entity Type and Package!
    </h1>
    <div className="w-2/3 max-w-xs">
      <form className="px-8 pt-6 pb-8 mb-4 rounded shadow-md bg-white">
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="state"
          >
            State
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="state"
            type="text"
            v-model="store.orderData.entityState"
            placeholder="Enter your state"
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="entity-type"
          >
            Entity Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="entity-type"
            type="text"
            placeholder="Enter your entity type"
            v-model="store.orderData.entityType"
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            for="bundle"
          >
            Package
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="state"
            type="text"
            v-model="store.orderData.bundleName"
            placeholder="Enter your preferred package"
          />
        </div>
        <div className="flex items-center justify-between">
          <div
            className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
          ></div>
          <router-link
            :to="{ name: 'BasicInfo' }"
            @click.native="navButtonClick"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Next
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
