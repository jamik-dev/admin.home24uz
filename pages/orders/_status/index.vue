<template>
  <main>
    <div class="p-6">
      <div class="rounded-xl flex flex-wrap items-center justify-center space-x-1 space-y-4 bg-dark pb-4 px-10 border border-dark-3">
        <nuxt-link to="/orders/new-orders" class="group mt-4 px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-[#18b3bd] duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Новые (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/pending-orders" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-[#ffa909] duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Ожидание (5)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/delivery-orders" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-grey duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>В доставке (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/accepted-orders" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center  group gap-2">
            <div class="h-5 w-5 bg-blue duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Принятые (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/returned-orders" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-[#f312d5] duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Возврат (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/done-orders" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-[#0b5f37] duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Доставленные (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/canceled-orders" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-[#f31212] duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Отмененные (0)</p>
          </div>
        </nuxt-link>
      </div>
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3 mt-6">
        <div class="flex justify-between gap-2">
          <el-input v-model="search.order" class="!w-3/12" placeholder="Поиск заказа" prefix-icon="el-icon-search">
          </el-input>
          <el-date-picker v-model="search.dateRange" type="daterange" align="center" class="!w-4/12 !bg-dark-2"
            start-placeholder="Start Date" end-placeholder="End Date" default-value="2010-10-01">
          </el-date-picker>
          <el-select v-model="search.operators" placeholder="Операторы">
            <el-option v-for="item in 3" :key="3" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-select v-model="search.regions" placeholder="Регионы">
            <el-option v-for="item in 3" :key="3" :label="item" :value="item">
            </el-option>
          </el-select>
          <button class="w-11 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table v-if="true" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">ЗАКАЗ ID</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">КЛИЕНТ</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3 text-center">НОМЕР ТЕЛЕФОНА</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3 text-center">ДАТА</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3 text-center">ОПЕРАТОР</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3 text-center">ОБЛАСТЬ</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3 text-center">КОЛ-ВО</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3 text-center">СТАТУС</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in 10" :key="item" class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div><span>#{{ item }}</span></div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <h6 class="font-semibold text-blue">Bodiring Pamidorov</h6>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <h6 class="font-semibold">+998997301499</h6>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <h6 class="font-semibold text-blue">01/02/2024 11:37</h6>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <p class="opacity-40">admin</p>
                </td> 
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <p>Самовывоз</p>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <p>1</p>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <span
                    class="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-orange-500 text-orange-500 bg-orange-500/20">Scheduled</span>
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
        order: '',
        dateRange: '',
        operators: '',
        regions: ''
      }
    }
  }
}
</script>
<style scoped>
.nuxt-link-exact-active {
  background-color: #1C2E45;
}

.nuxt-link-exact-active div div {
  opacity: 1;
}
</style>