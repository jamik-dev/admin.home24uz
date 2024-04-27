<template>
  <main>
    <div class="p-6">
      <div class="rounded-xl flex flex-wrap items-center justify-center space-x-1 space-y-4 bg-dark pb-4 px-10 border border-dark-3">
        <nuxt-link to="/orders/new" class="group mt-4 px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-[#18b3bd] duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Новые (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/pending" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-[#ffa909] duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Ожидание (5)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/delivery" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-grey duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>В доставке (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/accepted" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center  group gap-2">
            <div class="h-5 w-5 bg-blue duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Принятые (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/returned" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-[#f312d5] duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Возврат (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/done" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
          <div class="flex items-center justify-center gap-2">
            <div class="h-5 w-5 bg-[#0b5f37] duration-200 opacity-50 group-hover:opacity-100 rounded-full"></div>
            <p>Доставленные (0)</p>
          </div>
        </nuxt-link>
        <nuxt-link to="/orders/canceled" class="group px-4 py-2 rounded-xl hover:bg-dark-3 bg-dark-2 duration-200">
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
            <el-option v-for="operator in operators" :key="operator" :label="operator" :value="operator">
            </el-option>
          </el-select>
          <el-select v-model="search.regions" placeholder="Регионы">
            <el-option v-for="region in regions" :key="region" :label="region" :value="region">
            </el-option>
          </el-select>
          <button class="w-11 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table v-if="orders?.data.length > 0" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">ЗАКАЗ ID</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">КЛИЕНТ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">НОМЕР ТЕЛЕФОНА</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ДАТА</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ОПЕРАТОР</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ОБЛАСТЬ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">КОЛ-ВО</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">СТАТУС</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders?.data" :key="order.id" class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div><span>#{{ order.id }}</span></div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <h6 class="font-semibold text-blue">{{ order.name }}</h6>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <h6 class="font-semibold">+{{ order.phone_number }}</h6>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <h6 class="font-semibold text-blue">{{ dateFormatter(order.updated_at) }}</h6>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <p class="opacity-40">{{ order.operator?.username || '---------' }}</p>
                </td> 
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <p>{{ order.delivery_method }}</p>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <p>{{ order.products.length }}</p>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <span v-if="order.status === 'new'"
                    class="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-sky-500 text-sky-500 bg-sky-500/20">{{ order.status }}</span>
                    <span v-else-if="order.status === 'pending'"
                    class="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-orange-500 text-orange-500 bg-orange-500/20">{{ order.status }}</span>
                    <span v-else-if="order.status === 'delivery'"
                    class="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-gray-500 text-gray-500 bg-gray-500/20">{{ order.status }}</span>
                    <span v-else-if="order.status === 'accepted'"
                    class="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-blue-500 text-blue-500 bg-blue-500/20">{{ order.status }}</span>
                    <span v-else-if="order.status === 'returned'"
                    class="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-purple-500 text-purple-500 bg-purple-500/20">{{ order.status }}</span>
                    <span v-else-if="order.status === 'done'"
                    class="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-green-500 text-green-500 bg-green-500/20">{{ order.status }}</span>
                    <span v-else-if="order.status === 'canceled'"
                    class="status px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-red-500 text-red-500 bg-red-500/20">{{ order.status }}</span>
                </td>
                
              </tr>
            </tbody>
          </table>
          <div v-else>
            <div class="py-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                data-lucide="search" class="lucide lucide-search w-6 h-6 mx-auto mb-3 text-sky-500 fill-sky-500/20">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <h5 class="mt-2 mb-1">Sorry! No Result Found</h5>
              <p class="mb-0 text-slate-500 text-zink-200">We've searched all products. We did not find
                any product for you search.</p>
            </div>
          </div>
        </div>
        <div v-if="orders?.data.length > 0">
          <el-pagination class="ml-auto w-fit" background layout="prev, pager, next" :total="orders?.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </main>
</template>
<script>  
import {mapGetters, mapActions} from 'vuex';
export default {
  data: () => {
    return {
      search: {
        order: '',
        dateRange: '',
        operators: '',
        regions: ''
      },
      operators: ['operator1', 'operator2', 'operator3'],
      regions: ['region1', 'region2', 'region3'],
      status: ['new', 'pending', 'delivery', 'accepted', 'returned', 'done', 'canceled']
    }
  },
  created() {
    if(!this.status.some(status => status === this.$route.params.status)) {
      this.$router.push('/orders/all');
    }
  },
  mounted() {
    if (Object.keys(this.$route.query)?.length < 2) {
      this.$router.push({ query: { page: 1, per_page: 16 } });
    }
    if(this.$route.params.status === 'all') {
      this.getOrders();
    } else {
      this.getOrders(this.$route.params.status);
    }
  },
  computed: {
    ...mapGetters({
      orders: 'orders/orders'
    })
  },
  methods: {
    ...mapActions({
      getOrders: 'orders/getOrders'
    }),
    dateFormatter(date) {
      return new Date(date).toLocaleString();
    }
  },
}
</script>
<style scoped>
.nuxt-link-active {
  background-color: #1C2E45;
}

.nuxt-link-active div div {
  opacity: 1;
}
</style>