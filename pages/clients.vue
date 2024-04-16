<template>
  <main>
    <div class="p-6">
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
        <div class="flex gap-2 justify-between">
          <h2 class="font-semibold text-xl">Клиенты</h2>
        </div>
        <div class="overflow-x-auto">
          <table v-if="true" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">№</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">ФИО</th>
                <th class="px-3.5 py-2.5 text-center font-semibold bg-dark-3">НОМЕР ТЕЛЕФОНА</th>
                <th class="px-3.5 py-2.5 text-center font-semibold bg-dark-3">ДАТА РЕГИСТРАЦИИ</th>
                <th class="px-3.5 py-2.5 text-center font-semibold bg-dark-3">EMAIL</th>
                <th class="px-3.5 py-2.5 text-center font-semibold bg-dark-3">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in 10" :key="item" class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div
                    class="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">
                    #{{ item }}</div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <h6 class="font-semibold">Pamidorov Bodiring</h6>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <p class="opacity-40">998913722502</p>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <p class="text-blue">2023-11-30</p>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <p>jamik.oik.group@gmail.com</p>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <div class="relative space-x-1">
                    <button class="w-8 h-8 rounded-lg bg-dark-3 hover:text-blue duration-200">
                      <i class="el-icon-edit"></i>
                    </button>
                    <button class="w-8 h-8 rounded-lg bg-dark-3 hover:text-red-500 duration-200">
                      <i class="el-icon-delete"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="false">
            <div class="py-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                data-lucide="search" class="lucide lucide-search w-6 h-6 mx-auto mb-3 text-sky-500 fill-sky-500/20">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <h5 class="mt-2 mb-1">Sorry! No Result Found</h5>
              <p class="mb-0 text-slate-500 text-zink-200">We've searched more than 199+ product We did not find
                any product for you search.</p>
            </div>
          </div>
        </div>
        <div>
          <el-pagination class="ml-auto w-fit" background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data: () => {
    return {
    }
  }
}
</script>
<style></style>