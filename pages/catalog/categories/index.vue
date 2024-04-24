<template>
  <main>
    <div class="p-6">
      <button
        class="py-2 px-4 ml-auto rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold flex items-center">
        <i class="el-icon-circle-plus text-lg mr-1"></i>
        Добавить категорию
      </button>
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
        <div class="flex gap-2 justify-between items-center">
          <h2 class="text-2xl font-semibold">Категории</h2>
          <el-select v-model="search.status" placeholder="Статус">
            <el-option v-for="(item, index) in status" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <table v-if="categoriesList.length !== 0" class="w-full whitespace-nowrap duration-200">
            <thead class="text-left">
              <tr class="text-sm w-full">
                <th class="px-3.5 py-2.5 w-1/2 font-semibold bg-dark-3">ПРОДУКТ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">ИКОНА</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ПОПУЛЯРНЫЙ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">СТАТУС</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody :id="'categories-tbody-' + data.id" v-for="data in categoriesList" :key="data.id">
              <localCategoriesRow  @destroy-category="removeCategory" :key="data.id" :data="data" :id="data.id" />
            </tbody>
          </table>
          <div v-if="categoriesList.length === 0">
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
        <div v-if="categoriesList.length">
          <el-pagination class="ml-auto w-fit" background layout="prev, pager, next" :total="1">
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
        status: ''
      },
      categoriesList: [],
      status: [
        {
          label: 'Все',
          value: ''
        },
        {
          label: 'Активный',
          value: 'active'
        },
        {
          label: 'Неактивный',
          value: 'inactive'
        }
      ],
    }
  },
  watch: {
    'search.status': function (newVal, oldVal) {
      if (newVal !== this.$route.query.status && newVal !== oldVal) {
        if (newVal === '') {
          this.$router.replace({ query: { page: 1, per_page: 16 } });
        } else {
          this.$router.replace({ query: { ...this.$route.query, status: newVal } });
        }
        this.filterCategories();
      }
    },
    'categories': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.filterCategories();
      }
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories/categories'
    })
  },
  mounted() {
    if (Object.keys(this.$route.query)?.length < 2) {
      this.$router.replace({ query: { page: 1, per_page: 16 } });
    }
    this.search = { status: this.$route.query.status || '' };

    this.getCategories();
  },
  methods: {
    ...mapActions({
      getCategories: 'categories/getCategories',
      deleteCategory: 'categories/deleteCategory'
    }),
    ...mapMutations({
      SET_LOADING: 'loader/SET_LOADING'
    }),
    async removeCategory(id) {
      const response = await this.deleteCategory(id);
      if (response.message) {
        this.$notify({
          title: 'Успешно',
          message: response.message,
          type: 'success'
        });
        this.getCategories();
      } else {
        this.$notify({
          title: 'Ошибка',
          message: 'Что-то пошло не так',
          type: 'error'
        });
      }
    },
    filterCategories() {
      this.SET_LOADING(true);
      setTimeout(() => {
        this.SET_LOADING(false);
        this.categoriesList = this.categories.filter(item => {
          if (this.search.status === 'active') {
            return item.is_active === 1;
          } else if (this.search.status === 'inactive') {
            return item.is_active === 0;
          }
          return item;
        });
      }, 500);
    }
  }
}
</script>
<style></style>