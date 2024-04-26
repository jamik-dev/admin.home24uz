<template>
  <main>
    <div class="p-6">
      <el-dialog title="Редактировать" top="50vh"
        custom-class="!bg-dark !rounded-xl !border !border-dark-3 -translate-y-1/2" :visible.sync="showcaseModal"
        width="40%">
        <div class="px-8">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Uzbek" name="uzbek">
              <el-form :model="add" ref="updateShowcaseModal">
                <el-form-item prop="showcaseName_uz"
                  :rules="[{ required: true, message: 'Please input Заголовок name', trigger: 'blur' }]">
                  <p class="text-light font-semibold">Заголовок <span class="text-blue">*</span></p>
                  <el-input v-model="add.showcaseName_uz" class="!w-full" placeholder="Зоговолок"></el-input>
                </el-form-item>
                <el-form-item prop="products">
                  <p class="text-light font-semibold">Продукт</p>
                  <el-select class="!w-full" v-model="add.products" multiple placeholder="Select">
                    <el-option v-for="product in actualProducts" :key="product.id" :label="product.name.ru"
                      :value="product.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <div class="flex justify-end mt-4 pt-4 space-x-2 border-t border-dark-3">
                  <button @click.prevent="showcaseModal = false"
                    class="bg-dark-3 font-semibold rounded-lg py-2 px-4 text-light">Отмена</button>
                  <button @click.prevent="updateShowcaseProduct"
                    class="bg-blue font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200 flex items-center">
                    <i class="el-icon-circle-plus text-lg mr-1"></i>
                    Сохранить
                  </button>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="Russian" name="russian">
              <el-form :model="add" ref="updateShowcaseModal2">
                <el-form-item prop="showcaseName_ru"
                  :rules="[{ required: true, message: 'Please input Заголовок name', trigger: 'blur' }]">
                  <p class="text-light font-semibold">Заголовок <span class="text-blue">*</span></p>
                  <el-input v-model="add.showcaseName_ru" class="!w-full" placeholder="Зоговолок"></el-input>
                </el-form-item>
                <el-form-item prop="products">
                  <p class="text-light font-semibold">Продукт</p>
                  <el-select class="!w-full" v-model="add.products" multiple placeholder="Select">
                    <el-option v-for="product in actualProducts" :key="product.id" :label="product.name.ru"
                      :value="product.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <div class="flex justify-end mt-4 pt-4 space-x-2 border-t border-dark-3">
                  <button @click.prevent="showcaseModal = false"
                    class="bg-dark-3 font-semibold rounded-lg py-2 px-4 text-light">Отмена</button>
                  <button @click.prevent="updateShowcaseProduct"
                    class="bg-blue font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200 flex items-center">
                    <i class="el-icon-circle-plus text-lg mr-1"></i>
                    Сохранить
                  </button>
                </div>
              </el-form>
            </el-tab-pane>
          </el-tabs>

        </div>
      </el-dialog>
      <button @click="showcaseModal = true"
        class="py-2 px-4 ml-auto rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold flex items-center">
        <i class="el-icon-circle-plus text-lg mr-1"></i>
        Добавить витрини
      </button>
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
        <div class="flex gap-2 justify-between">
          <h2 class="text-2xl font-semibold">{{ showcase?.name.ru }}</h2>
        </div>
        <div class="overflow-x-auto">
          <table v-if="showcase?.products.length > 0" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">
                  <i class="el-icon-s-fold text-2xl"></i>
                </th>
                <th class="px-3.5 py-2.5 w-full font-semibold bg-dark-3">ПРОДУКТЫ</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <draggable v-model="productsList" tag="tbody" group="items" :options="dragOptions"
              @start="isDragging = true" @end="isDragging = false">
              <!-- <transition-group type="transition" name="flip-list"> -->
              <tr v-for="(product, index) in productsList" :key="product.id"
                class="hover:bg-dark-2 cursor-grab active:cursor-grabbing">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div
                    class="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">
                    <i class="el-icon-s-fold text-2xl"></i>
                  </div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="flex items-center gap-2">
                    <div class="border border-light rounded-lg overflow-hidden h-12 w-12">
                      <img :src="product.images[0].lg_img || require(`~/assets/images/jpg/default.jpg`)"
                        :alt="product.for_search" class="object-contain h-full w-full">
                    </div>
                    <h6>{{ product.name.ru }}</h6>
                  </div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
                  <div class="relative space-x-1">
                    <el-popconfirm  @confirm="removeProduct(index)" title="Вы уверены, что хотите удалить?">
                      <button slot="reference" class="w-8 h-8 rounded-lg bg-dark-3 hover:text-red-500 duration-200">
                        <i class="el-icon-delete"></i>
                      </button>
                    </el-popconfirm>
                  </div>
                </td>
              </tr>
              <!-- </transition-group> -->
            </draggable>
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
      </div>
    </div>
  </main>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data: () => {
    return {
      activeTab: 'uzbek',
      isDragging: false,
      add: {
        showcaseName_uz: '',
        showcaseName_ru: '',
        products: []
      },
      productsList: [],
      actualProducts: [],
      showcaseModal: false,
    }
  },
  watch: {
    showcase(val) {
      this.productsList = val.products;
      this.add.showcaseName_uz = val.name.uz;
      this.add.showcaseName_ru = val.name.ru;
      this.add.products = val.products.map(product => product.id);
    },
    products(val) {
      if (val.data.length > 0) {
        this.actualProducts = val.data.map(product => product.products[0]);
      }
    },
    isDragging(val) {
      if (!val) {
        this.updateShowcaseHandler();
      }
    }
  },
  computed: {
    ...mapGetters({
      showcase: 'showcases/showcase',
      products: 'products/products'
    }),
    dragOptions() {
      return {
        animation: 300,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    }
  },
  mounted() {
    this.getShowcase(this.$route.params.id);
    this.getProducts();
  },
  methods: {
    ...mapActions({
      getShowcase: 'showcases/getShowcase',
      updateShowcase: 'showcases/updateShowcase',
      getProducts: 'products/getProducts'
    }),
    async updateShowcaseHandler() {
      let filteredProducts = this.productsList.map((product, index) => {
        return {
          id: product.id,
          position: index + 1
        }
      })
      this.add.products.forEach((id) => {
        if (!filteredProducts.find(item => item.id === id)) {
          filteredProducts.push({
            id,
            position: filteredProducts.length + 1
          })
        }
        filteredProducts =  filteredProducts.filter((item) => this.add.products.includes(item.id))
      })
      const response = await this.updateShowcase({
        id: this.showcase.id,
        name: {
          ru: this.showcaseModal ? this.add.showcaseName_ru : this.showcase.name.ru,
          uz: this.showcaseModal ? this.add.showcaseName_uz : this.showcase.name.uz,
          en: ''
        },
        products: filteredProducts
      });
      this.showcaseModal = false;

      if (response.id) {
        this.$notify({
          title: 'Success',
          message: 'Showcase updated successfully',
          type: 'success'
        });
        this.getShowcase(this.$route.params.id);
      } else {
        this.$notify({
          title: 'Error',
          message: 'Something went wrong',
          type: 'error'
        });
      }
    },
    updateShowcaseProduct() {
      this.$refs.updateShowcaseModal.validate((valid) => {
        this.$refs.updateShowcaseModal2.validate(async (valid2) => {
          if (valid && valid2) {
            await this.updateShowcaseHandler()
          } else {
            this.$notify({
              title: 'Error',
              message: 'Please fill all required fields',
              type: 'error'
            });
          }
        })
      })
    },
    async removeProduct(index) {
      let filteredProducts = this.productsList.map((product, index) => {
        return {
          id: product.id,
          position: index + 1
        }
      });

      filteredProducts.splice(index, 1)

      const response = await this.updateShowcase({
        id: this.showcase.id,
        name: {
          ru: this.showcase.name.ru,
          uz: this.showcase.name.uz,
          en: ''
        },
        products: filteredProducts
      });
      if (response.id) {
        this.$notify({
          title: 'Success',
          message: 'Product removed successfully',
          type: 'success'
        });
        this.getShowcase(this.$route.params.id);
      } else {
        this.$notify({
          title: 'Error',
          message: 'Something went wrong',
          type: 'error'
        });
      }
    }
  }
}
</script>
<style>
/* .flip-list-move {
  transition: transform 0.5s;
} */

.ghost {
  opacity: 0.8;
  background: #0F1824;
}
</style>