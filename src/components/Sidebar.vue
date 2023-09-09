<template>
<aside id="logo-sidebar" class="fixed h-screen top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <a class="flex items-center pl-2.5 mb-5 text-center">
         <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-7" alt="Flowbite Logo" /> -->
         <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">FrontEnd VueJS</span>
      </a>
      <ul class="space-y-2 text-sm">
         <li>
            <router-link :to="'/'" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <span>หน้าหลัก</span>
            </router-link>
         </li>
         <li v-if="checkPermission('users-view')">
            <span class="text-slate-500">ตั้งค่า</span>
         </li>
         <li v-if="checkPermission('permission-view')">
            <router-link :to="'/permissions'" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <span>สิทธิ์การเข้าถึง</span>
            </router-link>
         </li>
         <li v-if="checkPermission('role-view')">
            <router-link :to="'/roles'" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <span>ระดับการเข้าถึง</span>
            </router-link>
         </li>
         <li v-if="checkPermission('users-view')">
            <router-link :to="'/users'" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <span>ผู้ใช้งานระบบ</span>
            </router-link>
         </li>
         <li class="fixed bottom-5 w-full pr-6">
            <hr class="pb-3">
            <div class="flex justify-between items-center w-full">
               <div class="flex justify-center items-center  space-x-4">
                  <!-- <div>
                     <img class="rounded-full" src="https://i.ibb.co/L1LQtBm/Ellipse-1.png" alt="avatar" />
                  </div> -->
                  <div class="flex justify-start flex-col items-start">
                     <p class="cursor-pointer text-sm leading-5 dark:text-white">{{ user.name }}</p>
                     <p class="cursor-pointer text-xs leading-3 dark:text-gray-300">{{ user.email }}</p>
                  </div>
               </div>
               <span class="cursor-pointer" @click="isLogout">
                  <svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 512 512">
                     <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                  </svg>
               </span>
            </div>
         </li>
      </ul>
   </div>
</aside>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { RouterLink,useRouter } from 'vue-router'
const router = useRouter()
const user = ref([])

onMounted(() => {
   user.value = JSON.parse(localStorage.getItem('user'))
})

const checkPermission = (permission) => localStorage.getItem('permission')?.split(",")?.find(p => p == permission) ? true : false

const isLogout = () => {
   localStorage.removeItem("token")
   localStorage.removeItem("user")
   localStorage.removeItem("permission")
   router.push({ path: '/login' })
}
</script>