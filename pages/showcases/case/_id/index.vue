<template>
  <main>
    <div class="p-6">
      <el-dialog title="Редактировать" top="50vh" custom-class="!bg-dark !rounded-xl !border !border-dark-3 -translate-y-1/2"
        :visible.sync="showcaseModal" width="40%">
        <div class="px-8">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Uzbek" name="uzbek">
              <el-form :model="add" ref="dynamicValidateForm" class="demo-dynamic">
                <el-form-item prop="showcaseName_uz"
                  :rules="[{ required: true, message: 'Please input Заголовок name', trigger: 'blur' }]">
                  <p class="text-light font-semibold">Заголовок <span class="text-blue">*</span></p>
                  <el-input v-model="add.showcaseName_uz" class="!w-full" placeholder="Зоговолок"></el-input>
                </el-form-item>
                <el-form-item prop="product_uz">
                  <p class="text-light font-semibold">Продукт</p>
                  <el-select class="!w-full" v-model="add.product_uz" multiple filterable placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <div class="flex justify-end mt-4 pt-4 space-x-2 border-t border-dark-3">
                  <button @click="showcaseModal = false"
                    class="bg-dark-3 font-semibold rounded-lg py-2 px-4 text-light">Отмена</button>
                  <button @click="showcaseModal = false"
                    class="bg-blue font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200 flex items-center">
                    <i class="el-icon-circle-plus text-lg mr-1"></i>
                    Сохранить
                  </button>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="Russian" name="russian">
              <el-form :model="add" ref="dynamicValidateForm" class="demo-dynamic">
                <el-form-item prop="showcaseName_ru"
                  :rules="[{ required: true, message: 'Please input Заголовок name', trigger: 'blur' }]">
                  <p class="text-light font-semibold">Заголовок <span class="text-blue">*</span></p>
                  <el-input v-model="add.showcaseName_ru" class="!w-full" placeholder="Зоговолок"></el-input>
                </el-form-item>
                <el-form-item prop="product_ru">
                  <p class="text-light font-semibold">Продукт</p>
                  <el-select class="!w-full" v-model="add.product_ru" multiple filterable placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <div class="flex justify-end mt-4 pt-4 space-x-2 border-t border-dark-3">
                  <button @click="showcaseModal = false"
                    class="bg-dark-3 font-semibold rounded-lg py-2 px-4 text-light">Отмена</button>
                  <button @click="showcaseModal = false"
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
          <h2 class="text-2xl font-semibold">Top Products</h2>
        </div>
        <div class="overflow-x-auto">
          <table v-if="true" class="w-full whitespace-nowrap">
            <thead class="text-left">
              <tr class="text-sm">
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">
                  <i class="el-icon-s-fold text-2xl"></i>
                </th>
                <th class="px-3.5 py-2.5 w-full font-semibold border-b border-dark-3">ПРОДУКТЫ</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <draggable tag="tbody" v-bind="dragOptions" @start="isDragging = true" @end="isDragging = false">
              <!-- <transition-group type="transition" name="flip-list"> -->
              <tr v-for="item in 10" :key="item"
                class="hover:bg-dark-2 duration-200 cursor-grab active:cursor-grabbing">
                <td class="px-3.5 py-2.5 border-y border-dark-3">
                  <div
                    class="transition-all duration-150 ease-linear product_code text-custom-500 hover:text-custom-600">
                    <i class="el-icon-s-fold text-2xl"></i>
                  </div>
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
                    <button class="w-8 h-8 rounded-lg bg-dark-3 hover:text-red-500 duration-200">
                      <i class="el-icon-delete"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <!-- </transition-group> -->
            </draggable>
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
      activeTab: 'uzbek',
      isDragging: false,
      add: {
        showcaseName_uz: '',
        product_uz: [],

        showcaseName_ru: '',
        product_ru: [],
      },
      options: [{
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2'
      }, {
        value: 'Option3',
        label: 'Option3'
      }, {
        value: 'Option4',
        label: 'Option4'
      }, {
        value: 'Option5',
        label: 'Option5'
      }],
      showcaseModal: false,
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
}
</script>
<style>
.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.8;
  background: #0F1824;
}
</style>