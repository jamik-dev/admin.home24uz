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
          <el-input v-model="search.attrs" class="!w-2/3" placeholder="Аттрибуты поиска" prefix-icon="el-icon-search">
          </el-input>
          <button @click="clearFilters" class="w-10 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div>
          <table v-if="attributesList.length > 0" class="w-full whitespace-nowrap duration-200">
            <thead class="text-left">
              <tr class="text-sm w-full">
                <th class="px-3.5 py-2.5 w-1/4 font-semibold bg-dark-3">АТТРИБУТЫ</th>
                <th class="px-3.5 py-2.5 w-1/3 font-semibold bg-dark-3 text-center">ПАРАМЕТРЫ</th>
                <th class="px-3.5 py-2.5 w-1/3 font-semibold bg-dark-3 text-center">КАТЕГОРИИ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="attribute in attributesList" :key="attribute.id" class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="space-y-1">
                    <h6 class="font-semibold">{{ attribute?.name.ru }}</h6>
                    <p class="text-light-2 text-sm">{{ attribute?.keywords }}</p>
                  </div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="flex flex-wrap justify-center gap-1">
                    <div v-for="option in attribute?.options" :key="option.id"
                      class="text-center py-1 px-2 rounded-lg bg-dark-3 text-xs">{{ option.name.ru }}</div>
                  </div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="flex flex-wrap justify-center gap-1">
                    <div v-for="category in attribute?.categories" :key="category.id"
                      class="text-center py-1 px-2 rounded-lg bg-dark-3 text-xs">{{ category.name.ru }}</div>
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
          <div v-else>
            <div class="py-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                data-lucide="search" class="lucide lucide-search w-6 h-6 mx-auto mb-3 text-sky-500 fill-sky-500/20">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <h5 class="mt-2 mb-1">Sorry! No Result Found</h5>
              <p class="mb-0 text-slate-500 text-zink-200">We've searched attributes. We did not find
                any attribute for you search.</p>
            </div>
          </div>
        </div>
        <div v-if="attributesList.length > 0">
          <el-pagination class="ml-auto w-fit" background layout="prev, pager, next" :total="attributes?.last_page">
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
        attrs: ''
      },
      attributesList: []
    }
  },
  mounted() {
    if (Object.keys(this.$route.query)?.length < 2) {
      this.$router.replace({ query: { page: 1, per_page: 16 } });
    }
    this.getAttributes();
  },
  watch: {
    'search.attrs': function (newValue, oldValue) {
      if (newValue !== oldValue && newValue !== undefined) {
        this.SET_LOADING(true);
        setTimeout(() => {
          this.attributesList = this.attributes?.data.filter(item => {
            this.SET_LOADING(false);
            return item.name.ru.toLowerCase()
              .indexOf(newValue.toLowerCase()) > -1;
          });
        }, 500);
      }
    },
    'attributes': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.attributesList = this.attributes?.data;
      }
    }
  },
  computed: {
    ...mapGetters('attributes', ['attributes'])
  },
  methods: {
    ...mapMutations('loader', ['SET_LOADING']),
    ...mapActions('attributes', ['getAttributes']),
    clearFilters() {
      if (this.search.attrs) {
        this.search = {
          attrs: '',
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