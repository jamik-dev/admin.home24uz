<template>
  <main>
    <div class="p-6">
      <el-dialog title="Изменить статус" top="50vh" custom-class="!bg-dark !rounded-xl !border !border-dark-3 -translate-y-1/2"
        :visible.sync="applicationModal" width="40%">
        <div class="px-8">
          <h5 class="font-semibold text-light mb-2">Cтатус</h5>
          <el-select class="!w-full" v-model="edit.status" placeholder="Select">
            <el-option v-for="status in applicationStatus" :key="status.value" :label="status.name" :value="status.value">
            </el-option>
          </el-select>
          <div class="flex justify-end mt-4 pt-4 space-x-2 border-t border-dark-3">
            <button @click.prevent="applicationModal = false"
              class="bg-dark-3 font-semibold rounded-lg py-2 px-4 text-light">Отмена</button>
            <button @click.prevent="editApplication"
              class="bg-blue font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200 flex items-center">
              <i v-if="!loading" class="el-icon-circle-plus text-lg mr-1"></i>
              <i v-else class="el-icon-loading text-lg mr-1"></i>
              Сохранить
            </button>
          </div>
        </div>
      </el-dialog>
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
        <div class="flex gap-2 justify-between">
          <el-input v-model="search.application" class="!w-2/3" placeholder="Поиск" prefix-icon="el-icon-search">
          </el-input>
          <button @click="clearFilters" class="w-10 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table v-if="applicationList.length > 0" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">№</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">ПРОДУКТ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ИМЯ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ДАТА</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">НОМЕР ТЕЛЕФОНА</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">СТАТУС</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(application, index) in applicationList" :key="application.id"
                class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="transition-all duration-150 ease-linear text-custom-500 hover:text-custom-600">
                    #{{ (parseInt($route.query.page) - 1)*parseInt($route.query.per_page) + index + 1 }}</div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 whitespace-normal">
                  <div class="flex items-center gap-2">
                    <div class="border border-light rounded-lg overflow-hidden h-12 w-12">
                      <img :src="application?.product?.images[0]?.lg_img || require(`~/assets/images/jpg/default.jpg`)"
                        :alt="application?.product?.for_search" class="object-contain h-full w-full">
                    </div>
                    <div>
                      <h6 class="w-[100px] 2xl:w-full text-xs text-light-2 line-clamp-2">{{
          application?.product?.name.ru }}</h6>
                    </div>
                  </div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">{{ application.name }}</td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">{{ dateFormatter(application.updated_at) }}
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">+{{ application.phone_number }}</td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <span v-if="application.status === 'pending'"
                    class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-orange-500 text-orange-500 bg-orange-500/20">{{
          application.status }}</span>
                  <span v-else-if="application.status === 'canceled'"
                    class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-red-500 text-red-500 bg-red-500/20">{{
          application.status }}</span>
                  <span v-else
                    class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-blue-500 text-blue-500 bg-blue-500/20">{{
          application.status }}</span>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <div class="relative space-x-1">
                    <button @click="applicationOpen(application.status, application.id)" class="w-8 h-8 rounded-lg bg-dark-3 hover:text-blue duration-200">
                      <i class="el-icon-edit"></i>
                    </button>
                    <el-popconfirm @confirm="removeApplication(application.id)" title="Вы уверены, что хотите удалить?">
                      <button slot="reference" class="w-8 h-8 rounded-lg bg-dark-3 hover:text-red-500 duration-200">
                        <i class="el-icon-delete"></i>
                      </button>
                    </el-popconfirm>
                  </div>
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
              <p class="mb-0 text-slate-500 text-zink-200">We've searched all characteristics. We did not find
                any characteristic for you search.</p>
            </div>
          </div>
        </div>
        <div v-if="applicationList.length > 0">
          <el-pagination class="ml-auto w-fit" background layout="prev, pager, next" @current-change="pageChange" :current-page="parseInt($route.query.page)" :page-size="parseInt($route.query.per_page)" :total="applications?.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  data: () => {
    return {
      search: {
        application: ''
      },
      edit: {
        status: '',
        id: null,
      },
      applicationList: [],
      applicationModal: false,
      applicationStatus: [
        { name: 'В ожидании', value: 'pending' },
        { name: 'Отменен', value: 'canceled' },
        { name: 'Принятые', value: 'accepted' }
      ],
      loading: false
    }
  },
  mounted() {
    if (Object.keys(this.$route.query)?.length < 2) {
      this.$router.replace({ query: { page: 1, per_page: 16 } });
    }
    this.getClickOrders();
  },
  watch: {
    '$route': function (to, from) {
      if (to.query.page !== from.query.page) {
        this.getClickOrders();
      }
    },
    'search.application': function (newValue, oldValue) {
      if (newValue !== oldValue && newValue !== undefined) {
        this.SET_LOADING(true);
        setTimeout(() => {
          this.applicationList = this.applications?.data.filter(item => {
            this.SET_LOADING(false);
            return item.name.toLowerCase()
              .indexOf(newValue.toLowerCase()) > -1;
          });
        }, 500);
      }
    },
    'applications': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.applicationList = this.applications?.data;
        console.log(this.applicationList)
      }
    }
  },
  computed: {
    ...mapGetters('orders', ['applications'])
  },
  methods: {
    ...mapMutations('loader', ['SET_LOADING']),
    ...mapActions('orders', ['getClickOrders', 'updateClickOrders', 'deleteApplication']),
    async removeApplication(id) {
      console.log(id);
      const response = await this.deleteApplication(id);
      if (response.status === 200) {
        this.$notify({
          title: 'Успешно',
          message: response.data.message,
          type: 'success'
        });
        this.getClickOrders();
      } else {
        this.$notify({
          title: 'Ошибка',
          message: 'Что-то пошло не так',
          type: 'error'
        });
      }
    },
    clearFilters() {
      if (this.search.application) {
        this.search = {
          application: '',
        };
        this.$notify({
          title: 'Успешно',
          message: 'Фильтры очищены',
          type: 'success'
        });
      } else {
        this.$notify({
          title: 'Внимание',
          message: 'Фильтры уже были очищены',
          type: 'warning'
        });
      }
    },
    async editApplication() {
      this.loading = true;
      const response = await this.updateClickOrders(this.edit);
      if(response.status === 200) {
        this.$notify({
          title: 'Успешно',
          message: response.data.message,
          type: 'success'
        });
        this.loading = false;
        this.applicationModal = false;
        this.getClickOrders();
      } else {
        this.loading = false;
        this.$notify({
          title: 'Ошибка',
          message: response.data.message,
          type: 'error'
        });     
      }
    },
    applicationOpen(status, id) {
      this.edit.status = status;
      this.edit.id = id;
      this.applicationModal = true;
    },
    dateFormatter(date) {
      return new Date(date).toLocaleString();
    },
    pageChange(page) {
      this.$router.replace({ query: { ...this.$route.query, page } });
    },
  }
}
</script>
<style></style>