<template>
  <main>
    <div class="p-6">
      <button
        class="py-2 px-4 ml-auto rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold flex items-center">
        <i class="el-icon-circle-plus text-lg mr-1"></i>
        Добавить продукт
      </button>
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
        <div class="flex gap-2">
          <el-input v-model="search.product" class="!w-4/12" placeholder="Поиск продукта" prefix-icon="el-icon-search">
          </el-input>
          <el-input v-model="search.category" class="!w-4/12" placeholder="Фильтр по категориям"
            prefix-icon="el-icon-search">
          </el-input>
          <el-select v-model="search.cash" placeholder="В наличии">
            <el-option v-for="item in 3" :key="3" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select v-model="search.status" placeholder="Статус">
            <el-option v-for="item in 3" :key="3" :label="item" :value="item">
            </el-option>
          </el-select>
          <button class="w-10 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table v-if="true" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">№</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">ПРОДУКТ</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">КОЛ-ВО</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">ЦЕНА</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">СТАТУС</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">ДЕЙСТВИЯ</th>
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
                  <div class="flex items-center gap-2">
                    <div class="border border-light rounded-lg overflow-hidden h-12 w-12">
                      <img src="~/assets/images/png/1.png" alt="Product images" class="object-cover h-full w-full">
                    </div>
                    <div>
                      <h6>Smartest Printed T-shirt</h6>
                      <p class="text-light-2 text-sm">Main/Category/subcategory-3</p>
                    </div>
                  </div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">500</td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">$79.99</td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <span
                    class="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-orange-500 text-orange-500 bg-orange-500/20">Scheduled</span>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
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
        product: '',
        category: '',
        cash: '',
        status: ''
      }
    }
  }
}
</script>
<style>
</style>