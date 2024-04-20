<template>
  <main>
    <div class="p-6">
      <el-dialog title="Tips" top="40vh" custom-class="!bg-dark !rounded-xl !border !border-dark-3 -translate-y-1/2"
        :visible.sync="dialogVisible" width="40%">
        <div class="px-8">
          <el-date-picker value-format="yyyy-MM-dd" v-model="dateRange" type="daterange" align="center" class="!w-full !bg-dark-2 !border-blue"
            start-placeholder="Start Date" end-placeholder="End Date">
          </el-date-picker>
          <div class="flex justify-end mt-4 pt-4 space-x-2 border-t border-dark-3">
            <button @click="dialogVisible = false;"
              class="bg-dark-3 font-semibold rounded-lg py-2 px-4 text-light">cancel</button>
            <button @click="dashboardDialogConfirm"
              class="bg-blue font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200">confirm</button>
          </div>
        </div>
      </el-dialog>
      <button @click="dialogVisible = true"
        class="py-2 px-4 block ml-auto rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold">Изменить
        дату</button>
      <div class="grid grid-cols-12 gap-3">
        <div class="col-span-4 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-xl font-semibold">Количество заказов на сегодня</h3>
          <p class="text-2xl text-blue"><strong>{{ dashboard?.today_orders_count }}</strong></p>
        </div>
        <div class="col-span-4 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-xl font-semibold">Сумма заказов на сегодня</h3>
          <p class="text-2xl text-purple-500"><strong>{{ dashboard?.today_orders_amount }} сум</strong></p>
        </div>
        <div class="col-span-4 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-xl font-semibold">Новый пользователь на сегодня</h3>
          <p class="text-2xl text-green-500"><strong>{{ dashboard?.today_users_count }}</strong></p>
        </div>
        <div class="col-span-4 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg opacity-75">Всего заказов</h3>
          <p class="text-2xl"><strong>{{ dashboard?.orders_count }}</strong></p>
        </div>
        <div class="col-span-4 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg opacity-75">Сумма заказов на вес период</h3>
          <p class="text-2xl"><strong>{{ dashboard?.orders_amount }} сум</strong></p>
        </div>
        <div class="col-span-4 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg opacity-75">Количество пользователей</h3>
          <p class="text-2xl"><strong>{{ dashboard?.users_count }}</strong></p>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-3 mt-8">
        <div class="col-span-1 rounded-xl bg-dark py-4 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg text-center font-semibold text-pink-500">Новые</h3>
          <p class="text-2xl text-center"><strong>{{ counts?.new }}</strong></p>
        </div>
        <div class="col-span-1 rounded-xl bg-dark py-4 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg text-center font-semibold text-blue">Принятые</h3>
          <p class="text-2xl text-center"><strong>{{ counts?.accepted }}</strong></p>
        </div>
        <div class="col-span-1 rounded-xl bg-dark py-4 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg text-center font-semibold text-purple-500">Ожидание</h3>
          <p class="text-2xl text-center"><strong>{{ counts?.pending }}</strong></p>
        </div>
        <div class="col-span-1 rounded-xl bg-dark py-4 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg text-center font-semibold text-yellow-500">В Доставке</h3>
          <p class="text-2xl text-center"><strong>{{ counts?.on_the_way }}</strong></p>
        </div>
        <div class="col-span-1 rounded-xl bg-dark py-4 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg text-center font-semibold text-sky-500">Доставленные</h3>
          <p class="text-2xl text-center"><strong>{{ counts?.done }}</strong></p>
        </div>
        <div class="col-span-1 rounded-xl bg-dark py-4 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg text-center font-semibold text-green-500">Отмененные</h3>
          <p class="text-2xl text-center"><strong>{{ counts?.canceled }}</strong></p>
        </div>
        <div class="col-span-1 rounded-xl bg-dark py-4 gap-4 flex flex-col justify-between border border-dark-3">
          <h3 class="text-lg text-center font-semibold text-red-500">Возврат</h3>
          <p class="text-2xl text-center"><strong>{{ counts?.returned }}</strong></p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3 mt-8">
        <div class="col-span-1 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col justify-between border border-dark-3">
          <apexchart ref="amount" width="100%" type="line" :options="options" :series="series"></apexchart>
        </div>
        <div class="col-span-1 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col justify-between border border-dark-3">
          <apexchart ref="orders" width="100%" type="line" :options="options" :series="series"></apexchart>
        </div>
        <div class="col-span-1 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col justify-between border border-dark-3">
          <apexchart ref="clients" height="500px" width="100%" type="bar" :options="options" :series="series"></apexchart>
        </div>
        <div class="col-span-1 rounded-xl bg-dark py-4 px-6 gap-4 flex flex-col border border-dark-3">
          <h2 class="text-xl font-semibold">Топ товаров</h2>
          <ul>
            <li v-for="product in dashboard?.top_sales_products" :key="product?.id" class="py-2 border-b border-dark-3 last:border-b-0 flex gap-4 items-center">
              <div class="w-12 h-12 border border-dark-3 rounded-lg overflow-hidden">
                <img class="w-full h-full object-cover" :src="product?.images[0].lg_img" :alt="product?.name.ru">
              </div>
              <h4 class="text-lg font-semibold">{{ product?.name.ru }}</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => {
    return {
      dialogVisible: false,
      dateRange: [],
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      options: {
        chart: {
          toolbar: {
            show: false
          },
          foreColor: '#C8D7E9',
          fontFamily: 'Public sans, sans-serif',
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          categories: [],
        },
        stroke: {
          curve: 'smooth',
          width: 6
        },
        fill: {
          colors: ['#3B82F6']
        },
        title: {
          text: '',
          style: {
            fontSize: '20px',
            color: '#C8D7E9'
          }
        },
        tootltip: {
          enabled: false
        }
      },
      series: [{
        name: '',
        data: [0]
      }]
    }
  },
  mounted() {
    this.getDashboard();
    this.getCounts();

    this.dateRange = this.$route.query.begin ? [this.$route.query.begin, this.$route.query.end] : [];
  },
  computed: {
    ...mapGetters({
      dashboard: 'dashboard/dashboard',
      counts: 'orders/counts'
    })
  },
  watch: {
    dateRange(newValue) {
      this.dateRange = this.dateRange == null ? [] : newValue;
    },
    dashboard: {
      handler() {
        // Orders
        let seriesOfOrders = [
          {
            name: 'Все заказы',
            data: this.getDataStatistic(this.dashboard?.statistic, 'all_orders')
          },
          {
            name: 'Доставленные заказы',
            data: this.getDataStatistic(this.dashboard?.statistic, 'completed_orders')
          }
        ];

        // Date
        let date = this.getDataStatistic(this.dashboard?.statistic, 'date').map(date => {
          let dateObj = new Date(date);
          return `${dateObj.getDate()} ${this.monthNames[dateObj.getMonth()]}`;
        });

        // Amount
        let seriesOfAmount = [
          {
            name: 'Сумма заказов',
            data: this.getDataStatistic(this.dashboard?.statistic, 'completed_orders_sum')
          }
        ];

        // Clients
        let seriesOfClients = [{
            name: 'Клиенты',
            data: this.dashboard?.clients_from.map(item => item.clients)
          }, {
            name: 'Заказы',
            data: this.dashboard?.clients_from.map(item => item.orders)
          }];

        // Regions
        let regions = this.dashboard?.clients_from.map(item => item.region.name.ru);

        // update Orders
        this.$refs.orders.updateSeries([...seriesOfOrders])
        this.$refs.orders.updateOptions({
          xaxis: {
            categories: date
          },
          title: {
            text: 'Заказы'
          }
        });


        // update Amount
        this.$refs.amount.updateSeries([...seriesOfAmount]);
        this.$refs.amount.updateOptions({
          xaxis: {
            categories: date
          },
          title: {
            text: 'Заработок'
          }
        });

        // update Clients
        this.$refs.clients.updateSeries([...seriesOfClients]);
        this.$refs.clients.updateOptions({
          xaxis: {
            categories: regions
          },
          title: {
            text: 'Клиенты и заказы по регионам'
          }
        });
      },
      deep: true
    }

  },
  methods: {
    ...mapActions({
      getDashboard: 'dashboard/getDashboard',
      getCounts: 'orders/getOrdersCounts'
    }),
    getDataStatistic(data, name) {
      return data.map((item, index) => {
        if ((index + 1) % 5 == 0) {
          return item[name];
        }
      }).filter(order => order !== undefined)
    },
    dashboardDialogConfirm() {
      if(this.$route.query.begin !== this.dateRange[0] || this.$route.query.end !== this.dateRange[1]) {
        this.$router.replace({ query: this.dateRange ? {begin: this.dateRange[0], end: this.dateRange[1]} : {} })
      }
      this.dialogVisible = false;
      setTimeout(() => {
        this.getDashboard();
      }, 200);
    }
  },
}
</script>

<style></style>
