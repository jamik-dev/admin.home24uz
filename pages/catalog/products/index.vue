<template>
  <main>
    <div class="p-6">
      <button
        class="py-2 px-4 ml-auto rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold flex items-center">
        <i class="el-icon-circle-plus text-lg mr-1"></i>
        Добавить продукт
      </button>
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
        <div class="flex gap-2 justify-between">
          <el-input v-model="search.product" class="!w-4/12" placeholder="Поиск продукта" prefix-icon="el-icon-search">
          </el-input>
          <el-select v-model="search.category" class="!w-4/12" placeholder="Фильтр по категориям"
            prefix-icon="el-icon-search" clearable filterable :filter-method="getCategoryByName" :loading="loading">
            <el-option v-for="category in categoriesName" :key="category.id" :label="category.name.ru"
              :value="category.id">
            </el-option>
          </el-select>
          <el-select v-model="search.stock" placeholder="В наличии">
            <el-option v-for="item in stock" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="search.status" placeholder="Статус">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <button @click="clearFilters" class="w-12 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table v-if="products?.total" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">№</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">ПРОДУКТ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">КОЛ-ВО</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ЦЕНА</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">СТАТУС</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3 text-center">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in productsList" :key="product.id" class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div
                    class="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">
                    #{{ index + 1 }}</div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 whitespace-normal">
                  <div class="flex items-center gap-2">
                    <div class="border border-light rounded-lg overflow-hidden h-12 w-12">
                      <img :src="product?.products[0].images[0].lg_img || require(`~/assets/images/png/1.png`)"
                        :alt="product?.products[0].for_search" class="object-cover h-full w-full">
                    </div>
                    <div>
                      <h6 class="w-[300px] 2xl:w-full line-clamp-2">{{ product?.products[0].name.ru }}</h6>
                      <p class="text-light-2 text-sm">{{ formatCategory(product?.category) }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">{{ product?.products[0].stock }}</td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">{{ formatPrice(product?.products[0].price)
                  }} сум</td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <span v-if="product?.products[0].status === 'active'"
                    class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-green-500 text-green-500 bg-green-500/20">Active</span>
                  <span v-else
                    class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-red-500 text-red-500 bg-red-500/20">Inactive</span>
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
          <div v-if="!products?.total">
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
        <div v-if="products?.total">
          <el-pagination class="ml-auto w-fit" background layout="prev, pager, next" :total="products?.last_page">
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
      loading: false,
      search: {
        product: '',
        category: '',
        stock: '',
        status: ''
      },
      categoriesName: [],
      productsList: [],
      stock: [
        {
          label: 'Есть в наличии',
          value: 'yes'
        },
        {
          label: 'Нет в наличии',
          value: 'no'
        }
      ],
      status: [
        {
          label: 'Активный',
          value: 'active'
        },
        {
          label: 'Неактивный',
          value: 'inactive'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      products: 'products/products',
      categories: 'categories/categories'
    })
  },
  mounted() {
    if (Object.keys(this.$route.query)?.length < 2) {
      this.$router.replace({ query: { page: 1, per_page: 16 } });
    }

    this.search = { status: this.$route.query.status || '', stock: this.$route.query.stock || '', category: parseInt(this.$route.query.category) || '' };
    this.getProducts();
    this.getCategories();
  },
  watch: {
    '$route.query': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getProducts();
      }
    },
    'search.stock': function (newValue, oldValue) {
      if (newValue !== oldValue && this.$route.query.stock !== newValue && newValue !== '') {
        this.$router.replace({ query: { ...this.$route.query, stock: newValue } });
      }
    },
    'search.status': function (newValue, oldValue) {
      if (newValue !== oldValue && this.$route.query.status !== newValue && newValue !== '') {
        this.$router.replace({ query: { ...this.$route.query, status: newValue } });
      }
    },
    'search.category': function (newValue, oldValue) {
      if (newValue !== oldValue && parseInt(this.$route.query.category) !== newValue && newValue !== null) {
        this.$router.replace({ query: { ...this.$route.query, category: newValue } });
      }
    },
    'search.product': function (newValue, oldValue) {
      if (newValue !== oldValue && newValue !== undefined) {
        this.SET_LOADING(true);
        setTimeout(() => {
          this.productsList = this.products?.data.filter(item => {
            this.SET_LOADING(false);
            return item.products[0].name.ru.toLowerCase()
              .indexOf(newValue.toLowerCase()) > -1;
          });
        }, 500);
      }
    },
    'categories': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.categoriesName = newValue;
      }
    },
    'products': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.productsList = newValue.data;
      }
    }
  },
  methods: {
    ...mapActions({
      getProducts: 'products/getProducts',
      getCategories: 'categories/getCategories'
    }),
    ...mapMutations({
      SET_LOADING: 'loader/SET_LOADING'
    }),
    formatCategory(category) {
      if (!category.parent) {
        return category.name.ru;
      }
      return this.formatCategory(category.parent) + '/' + category.name.ru;
    },
    formatPrice(price) {
      const digits = String(price).split('');
      for (let i = digits.length - 3; i > 0; i -= 3) {
        digits.splice(i, 0, ' ');
      }
      return digits.join('');
    },
    getCategoryByName(query) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.categoriesName = this.categories.filter(item => {
          return item.name.ru.toLowerCase()
            .indexOf(query.toLowerCase()) > -1;
        });
      }, 300);
    },
    clearFilters() {
      this.search = {
        product: '',
        category: null,
        stock: '',
        status: ''
      };
      if (Object.keys(this.$route.query).length > 2) {
        this.$router.replace({ query: { page: 1, per_page: 16 } });
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