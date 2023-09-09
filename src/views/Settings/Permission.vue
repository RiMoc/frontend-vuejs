<template>
<div class="p-4 sm:ml-64">
        <div class="flex flex-col justify-center h-fit">
        <div class="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <header class="px-5 py-4 border-b border-gray-100 flex align-middle justify-between">
                <h2 class="font-semibold text-gray-800 dark:text-gray-50">ข้อมูลผู้ใช้งาน</h2>
                <router-link v-if="checkPermission('permission-create')" :to="'users/add'" class="inline-flex items-center justify-center w-full px-4 py-3 mb-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
                    เพิ่มข้อมูล
                </router-link>
            </header>
            <div class="p-3">
                <div class="overflow-x-auto">
                <table class="table-auto w-full ">
                    <thead class="text-xs font-semibold uppercase text-gray-400  ">
                        <tr>
                            <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">ระดับการเข้าถึง</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">ชื่อ</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-left">ประเภท</div>
                            </th>
                            <th class="p-2 whitespace-nowrap">
                            <div class="font-semibold text-center">การจัดการ</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm ">
                        <tr v-for="user in permission_list.data" :key="user">
                            <td class="p-2 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="font-medium text-gray-800 dark:text-white">{{ user.name }}</div>
                            </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                            <div class="text-left dark:text-white">{{ user.title }}</div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                                <div class="text-left dark:text-white">
                                    {{  user.type }}
                                </div>
                            </td>
                            <td class="p-2 whitespace-nowrap">
                            <div class="text-lg text-center">
                                <button class="inline-flex text-sm items-center px-3 py-2 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                                    จัดการ
                                </button>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <nav class="flex justify-end py-5">
                    <ul class="list-style-none flex">
                        <li v-for="pi in permission_list.links" :key="pi">
                            <button @click="fetch(pi.url)" :class='{"pointer-events-none": !pi.url, "relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300": pi.active, "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white": !pi.active }'>
                                <span v-html="pi.label"></span>
                            </button >
                        </li>
                    </ul>
                </nav>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
    import PermissionController from '@/plugins/PermissionController'
    import { onMounted, ref } from 'vue'

    const { getDataWithTable, fetchData } = PermissionController()
    const permission_list = ref([])

    onMounted(async ()=>{
        permission_list.value = await getDataWithTable()
    })

    const fetch = async (url)=>{
        permission_list.value = await fetchData(url)
    }

    const checkPermission = (permission) => localStorage.getItem('permission')?.split(",")?.find(p => p == permission) ? true : false
</script>