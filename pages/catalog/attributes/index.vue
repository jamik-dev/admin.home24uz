<template>
  <main>
    <div class="p-6">
      <button
        class="py-2 px-4 ml-auto rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold flex items-center">
        <i class="el-icon-circle-plus text-lg mr-1"></i>
        Добавить аттрибуты
      </button>
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
        <div class="flex gap-2 justify-between items-center">
          <el-input v-model="search.attrs" class="!w-2/3" placeholder="Аттрибуты поиска"
            prefix-icon="el-icon-search">
          </el-input>
          <button class="w-10 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div>
          <table v-if="true" class="w-full whitespace-nowrap duration-200">
            <thead class="text-left">
              <tr class="text-sm w-full">
                <th class="px-3.5 py-2.5 w-1/4 font-semibold bg-dark-3">АТТРИБУТЫ</th>
                <th class="px-3.5 py-2.5 w-1/3 font-semibold bg-dark-3 text-center">ПАРАМЕТРЫ</th>
                <th class="px-3.5 py-2.5 w-1/3 font-semibold bg-dark-3 text-center">КАТЕГОРИИ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in 10" :key="item" class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="space-y-1">
                      <h6 class="font-semibold">Camera</h6>
                      <p class="text-light-2 text-sm">Camera</p>
                  </div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="flex flex-wrap justify-center gap-1">
                    <div v-for="param in 5" :key="param" class="text-center py-1 px-2 rounded-lg bg-dark-3 text-xs">64MP</div>
                  </div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="flex flex-wrap justify-center gap-1">
                    <div v-for="category in 4" :key="category" class="text-center py-1 px-2 rounded-lg bg-dark-3 text-xs">Офисные кресла</div>
                  </div>
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
      search: {
        attrs: ''
      },
    }
  }
}
</script>
<style>
</style>