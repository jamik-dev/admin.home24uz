<template>
  <main>
    <div class="p-6">
      <el-dialog title="Tips" top="50vh" custom-class="!bg-dark !rounded-xl !border !border-dark-3 -translate-y-1/2"
        :visible.sync="brandModal" width="40%">
        <div class="px-8">
          <el-form :model="add" ref="dynamicValidateForm" class="demo-dynamic">
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
            <el-form-item prop="url">
              <el-upload ref="uploader" :limit="1" action="#" :on-change="handleUploader" list-type="picture-card"
                :auto-upload="false">
                <i class="el-icon-picture"></i>
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="brand img">
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
                <img width="100%" :src="add.url" alt="">
              </el-dialog>
            </el-form-item>
            <div class="flex justify-end mt-4 pt-4 space-x-2 border-t border-dark-3">
              <button @click="dialogVisible = false"
                class="bg-dark-3 font-semibold rounded-lg py-2 px-4 text-light">Отмена</button>
              <button @click="dialogVisible = false"
                class="bg-blue font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200 flex items-center">
                <i class="el-icon-circle-plus text-lg mr-1"></i>
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
          <button class="w-10 h-10 rounded-lg bg-blue hover:bg-blue-2 duration-200 text-2xl">
            <i class="el-icon-refresh"></i>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table v-if="true" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">№</th>
                <th class="px-3.5 py-2.5 w-full font-semibold bg-dark-3">БРЕНД</th>
                <th class="px-3.5 py-2.5 font-semibold bg-dark-3">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in 10" :key="item" class="hover:bg-dark-2 duration-200">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div
                    class="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">
                    #{{ item }}</div>
                </td>
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div class="flex items-center gap-2">
                    <div class="border border-light rounded-lg overflow-hidden h-12 w-12">
                      <img src="~/assets/images/png/1.png" alt="Product images" class="object-cover h-full w-full">
                    </div>
                    <h6>Smartest Printed T-shirt</h6>
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
        brands: ''
      },
      add: {
        brand: '',
        popular_brand: false,
        url: ''
      },
      brandModal: false,
      addPicDialog: false,
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.add.url = file.url;
      this.addPicDialog = true;
    },
    handleRemove(file) {
      this.$refs.uploader.handleRemove(file)
      document.querySelector('.el-upload.el-upload--picture-card').style.display = 'inline-block';
      this.add.url = '';
    },
    handleUploader(file) {
      console.log(file);
      document.querySelector('.el-upload.el-upload--picture-card').style.display = 'none';
    }
  }
}
</script>
<style>
</style>