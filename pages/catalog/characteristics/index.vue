<template>
  <main>
    <div class="p-6">
      <button
        class="py-2 px-4 ml-auto rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold flex items-center">
        <i class="el-icon-circle-plus text-lg mr-1"></i>
        Добавить характеристика
      </button>
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
        <div class="flex gap-2 justify-between">
          <el-input v-model="search.characteristic" class="!w-2/3" placeholder="Группа характеристик"
            prefix-icon="el-icon-search">
          </el-input>
          <button @click="clearFilters" class="w-10 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table v-if="characteristicsList.length > 0" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">№</th>
                <th class="px-3.5 py-2.5 w-full font-semibold bg-dark-3">НАЗВАНИЕ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(characteristicItem, index) in characteristicsList" :key="characteristicItem.id" class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div
                    class="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">
                    #{{ index + 1 }}</div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <h6 class="font-semibold">{{ characteristicItem.name.ru }}</h6>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <div class="relative space-x-1">
                    <button class="w-8 h-8 rounded-lg bg-dark-3 hover:text-blue duration-200">
                      <i class="el-icon-edit"></i>
                    </button>
                    <el-popconfirm @confirm="removeCharacteristic(characteristicItem.id)" title="Вы уверены, что хотите удалить?">
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
        <div v-if="characteristicsList.length > 0">
          <el-pagination class="ml-auto w-fit" background layout="prev, pager, next" :total="characteristics?.last_page">
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
        characteristic: ''
      },
      characteristicsList: []
    }
  },
  mounted() {
    if (Object.keys(this.$route.query)?.length < 2) {
      this.$router.replace({ query: { page: 1, per_page: 16 } });
    }
    this.getCharacteristics();
  },
  watch: {
    'search.characteristic': function (newValue, oldValue) {
      if (newValue !== oldValue && newValue !== undefined) {
        this.SET_LOADING(true);
        setTimeout(() => {
          this.characteristicsList = this.characteristics?.data.filter(item => {
            this.SET_LOADING(false);
            return item.name.ru.toLowerCase()
              .indexOf(newValue.toLowerCase()) > -1;
          });
        }, 500);
      }
    },
    'characteristics': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.characteristicsList = this.characteristics?.data;
      }
    }
  },
  computed: {
    ...mapGetters('characteristics', ['characteristics'])
  },
  methods: {
    ...mapMutations('loader', ['SET_LOADING']),
    ...mapActions('characteristics', ['getCharacteristics', 'deleteCharacteristic']),
    async removeCharacteristic(id) {
      console.log(id);
      const response = await this.deleteCharacteristic(id);
      if(response.message) {
        this.$notify({
          title: 'Успешно',
          message: response.message,
          type: 'success'
        });
        this.getCharacteristics();
      } else {
        this.$notify({
          title: 'Ошибка',
          message: 'Что-то пошло не так',
          type: 'error'
        });
      }
    },
    clearFilters() {
      if (this.search.characteristic) {
        this.search = {
          characteristic: '',
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
    }
  }
}
</script>
<style></style>