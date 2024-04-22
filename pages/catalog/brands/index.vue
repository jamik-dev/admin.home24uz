<template>
  <main>
    <div class="p-6">
      <el-dialog title="Tips" top="50vh" custom-class="!bg-dark !rounded-xl !border !border-dark-3 -translate-y-1/2"
        :visible.sync="brandModal" width="40%">
        <div class="px-8">
          <el-form :model="add" ref="addBrandForm" class="demo-dynamic">
            <el-form-item prop="brand"
              :rules="[{ required: true, message: 'Please input brand name', trigger: 'blur' }]">
              <p class="text-light font-semibold">Бренд <span class="text-blue">*</span></p>
              <el-input v-model="add.brand" class="!w-full" placeholder="Зоговолок"></el-input>
            </el-form-item>
            <el-form-item prop="popular_brand">
              <div class="flex items-center gap-4">
                <el-switch :width="50" :inactive-color="'#0F1824'" :active-color="'#3B82F6'"
                  v-model="add.popular_brand"></el-switch>
                <p class="text-light font-semibold">Популярные бренды</p>
              </div>
            </el-form-item>
            <el-form-item>
              <el-upload ref="uploader" :limit="1" action="#" :on-change="handleUploader" list-type="picture-card"
                :auto-upload="false">
                <i class="el-icon-picture"></i>
                <div slot="file" slot-scope="{file}">
                  <img v-if="path" class="el-upload-list__item-thumbnail object-contain" :src="path" alt="brand img">
                  <div class="flex w-full h-full justify-center items-center" v-else>
                    <i class="el-icon-loading text-3xl text-blue"></i>
                  </div>
                  <span class="el-upload-list__item-actions !border-dark-3">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog custom-class="!bg-dark !rounded-xl !border !border-dark-3" width="50%" append-to-body
                :visible.sync="addPicDialog">
                <img width="100%" :src="path" alt="brand image">
              </el-dialog>
            </el-form-item>
            <div class="flex justify-end mt-4 pt-4 space-x-2 border-t border-dark-3">
              <button @click.prevent="clearForm"
                class="bg-dark-3 font-semibold rounded-lg py-2 px-4 text-light">Отмена</button>
              <button @click.prevent="addNewBrand"
                class="bg-blue font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200 flex items-center">
                <i v-if="!loading" class="el-icon-circle-plus text-lg mr-1"></i>
                <i v-else class="el-icon-loading text-lg mr-1"></i>
                Сохранить
              </button>
            </div>
          </el-form>
        </div>
      </el-dialog>
      <button @click="brandModal = true"
        class="py-2 px-4 ml-auto rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold flex items-center">
        <i class="el-icon-circle-plus text-lg mr-1"></i>
        Добавить бренд
      </button>
      <div class="rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
        <div class="flex gap-2 justify-between">
          <el-input v-model="search.brands" class="!w-2/3" placeholder="Поиск бренда" prefix-icon="el-icon-search">
          </el-input>
          <button @click="clearFilters" class="w-10 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table v-if="brandsList.length > 0" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">№</th>
                <th class="px-3.5 py-2.5 w-full font-semibold bg-dark-3">БРЕНД</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(brand, index) in brandsList" :key="brand.id" class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div
                    class="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">
                    #{{ index + 1 }}</div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="flex items-center gap-2">
                    <div class="border border-light bg-light rounded-lg overflow-hidden h-12 w-12">
                      <img :src="brand.lg_logo || require(`~/assets/images/jpg/default.jpg`)" :alt="brand.name"
                        class="object-cover h-full w-full">
                    </div>
                    <h6>{{ brand.name }}</h6>
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
              <p class="mb-0 text-slate-500 text-zink-200">We've searched brands. We did not find
                any brand for you search.</p>
            </div>
          </div>
        </div>
        <div v-if="brandsList.length > 0">
          <el-pagination class="ml-auto w-fit" background layout="prev, pager, next" :total="brands?.last_page">
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
        brands: ''
      },
      add: {
        brand: '',
        popular_brand: false,
      },
      file: null,
      brandModal: false,
      addPicDialog: false,
      brandsList: [],
      loading: false
    }
  },
  mounted() {
    if (Object.keys(this.$route.query)?.length < 2) {
      this.$router.replace({ query: { page: 1, per_page: 16 } });
    }
    this.getBrands();
  },
  watch: {
    'search.brands': function (newValue, oldValue) {
      if (newValue !== oldValue && newValue !== undefined) {
        this.SET_LOADING(true);
        setTimeout(() => {
          this.brandsList = this.brands?.data.filter(item => {
            this.SET_LOADING(false);
            return item.name.toLowerCase()
              .indexOf(newValue.toLowerCase()) > -1;
          });
        }, 500);
      }
    },
    'brands': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.brandsList = this.brands?.data;
      }
    },
  },
  computed: {
    ...mapGetters({
      brands: 'brands/brands',
      path: 'upload/path'
    })
  },
  methods: {
    ...mapMutations({
      SET_LOADING: 'loader/SET_LOADING',
      CLEAR_PATH: 'upload/CLEAR_PATH'
    }),
    ...mapActions({
      getBrands: 'brands/getBrands',
      addBrand: 'brands/addBrand',
      setFile: 'upload/setFile'
    }),
    addNewBrand() {
      this.$refs.addBrandForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const response = await this.addBrand({ name: this.add.brand, is_top: this.add.popular_brand, logo: this.path });
          this.loading = false;
          if (response.brand) {
            this.$notify({
              title: 'Успешно',
              message: 'Бренд успешно добавлен',
              type: 'success'
            });
            this.clearForm();
            this.getBrands();
          } else {
            this.$notify({
              title: 'Ошибка',
              message: 'Что-то пошло не так',
              type: 'error'
            });
          }
        } else {
          this.$notify({
            title: 'Ошибка',
            message: 'Пожалуйста, заполните все поля',
            type: 'error'
          });
        }
      })
    },
    handlePictureCardPreview() {
      this.addPicDialog = true;
    },
    handleRemove(file) {
      this.$refs.uploader.handleRemove(file)
      document.querySelector('.el-upload.el-upload--picture-card').style.display = 'inline-block';
    },
    handleUploader(file) {
      console.log(file);
      if (file) {
        document.querySelector('.el-upload.el-upload--picture-card').style.display = 'none';
        this.setFile(file);
        this.file = file;
      }
    },
    clearFilters() {
      if (this.search.brands) {
        this.search = {
          brands: '',
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
    clearForm() {
      this.$refs.addBrandForm.resetFields();
      this.CLEAR_PATH();
      this.handleRemove(this.file);
      this.file = null;
      this.brandModal = false;
    }
  }
}
</script>
<style>
.el-upload-list--picture-card .el-upload-list__item div {
  height: 100%;
}
</style>