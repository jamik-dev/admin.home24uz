<template>
  <main>
    <div class="p-6">
      <button @click="$router.push('/catalog/products')"
        class="py-3 px-8 rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold flex items-center">
        <i class="el-icon-arrow-left text-lg -ml-1 mr-1"></i>
        Hазад
      </button>
      <div class="grid grid-cols-12 gap-3 items-start mt-20 w-full">
        <div class="col-span-8">
          <div class="rounded-xl bg-dark py-4 px-6 rounded-tl-none border border-dark-3 relative">
            <div
              class="absolute flex items-center justify-center gap-5 -top-[49px] -left-[1px] rounded-t-xl bg-dark py-3 w-[200px] border border-b-0 border-dark-3">
              <button
                :style="{ color: activeTab1 === 'uzbek' ? '#3B82F6' : '', fontWeight: activeTab1 === 'uzbek' ? '700' : '' }"
                class="outline-none" @click="activeTab1 = 'uzbek'">Uzbek</button>
              <div class="w-[2px] h-5 bg-dark-3"></div>
              <button
                :style="{ color: activeTab1 === 'russian' ? '#3B82F6' : '', fontWeight: activeTab1 === 'russian' ? '700' : '' }"
                class="outline-none" @click="activeTab1 = 'russian'">Russian</button>
            </div>
            <h2 class="text-lg font-semibold">Добавить продукт</h2>
            <el-form class="mt-6" ref="addProductNameAndModelForm">
              <el-form-item v-if="activeTab1 === 'uzbek'"
                :rules="[{ required: true, message: 'Please input Имя name', trigger: 'blur' }]">
                <p class="text-light font-semibold">Имя <span class="text-blue">*</span></p>
                <el-input class="!w-full" placeholder="Имя продукта"></el-input>
              </el-form-item>
              <el-form-item v-else :rules="[{ required: true, message: 'Please input Имя name', trigger: 'blur' }]">
                <p class="text-light font-semibold">Имя <span class="text-blue">*</span></p>
                <el-input class="!w-full" placeholder="Имя продукта"></el-input>
              </el-form-item>
              <el-form-item>
                <p class="text-light font-semibold">Модель</p>
                <el-input class="!w-1/2" placeholder="Модель продукта"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="rounded-xl mt-3 bg-dark py-4 px-6 border border-dark-3">
            <h2 class="text-lg font-semibold">Информация о продукте</h2>
            <el-form class="mt-6" ref="addProductCategoryForm">
              <el-form-item :rules="[{ required: true, message: 'Please input Category name', trigger: 'blur' }]">
                <p class="text-light font-semibold">Категория <span class="text-blue">*</span></p>
                <p class="text-xs text-light-2 mb-1">Добавить товар в категорию</p>
                <div class="flex gap-2 items-center">
                  <el-cascader class="!w-full" v-model="value" placeholder="Выберите категорию" :options="options"
                    :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
                  <button class="h-9 w-10 flex items-center justify-center bg-orange-400 text-light rounded-lg"><i
                      class="el-icon-refresh text-xl"></i></button>
                  <button class="h-9 w-10 flex items-center justify-center bg-blue text-light rounded-lg"><i
                      class="el-icon-plus text-xl"></i></button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="rounded-xl mt-[60px] bg-dark py-4 px-6 rounded-tl-none border border-dark-3 relative">
            <div
              class="absolute flex items-center justify-center gap-5 -top-[49px] -left-[1px] rounded-t-xl bg-dark py-3 w-[200px] border border-b-0 border-dark-3">
              <button
                :style="{ color: activeTab2 === 'uzbek' ? '#3B82F6' : '', fontWeight: activeTab2 === 'uzbek' ? '700' : '' }"
                class="outline-none" @click="activeTab2 = 'uzbek'">Uzbek</button>
              <div class="w-[2px] h-5 bg-dark-3"></div>
              <button
                :style="{ color: activeTab2 === 'russian' ? '#3B82F6' : '', fontWeight: activeTab2 === 'russian' ? '700' : '' }"
                class="outline-none" @click="activeTab2 = 'russian'">Russian</button>
            </div>
            <h2 class="text-lg font-semibold">Информация о продукте</h2>
            <el-tabs class="mt-6" v-model="activeTab3">
              <el-tab-pane label="Описание" name="description">
                <quill-editor v-if="activeTab2 === 'uzbek'" :options="editorOption" :content="content">
                </quill-editor>
                <quill-editor v-else :options="editorOption" :content="content2">
                </quill-editor>
              </el-tab-pane>
              <el-tab-pane label="Характеристика" name="characteristic">
                <button
                  class="py-2 px-4 rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold flex items-center">
                  <i class="el-icon-circle-plus text-lg mr-1"></i>
                  Добавить xарактеристика
                </button>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="col-span-4 rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
          re
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data: () => {
    return {
      content: '',
      content2: '',
      activeTab1: 'uzbek',
      activeTab2: 'uzbek',
      activeTab3: 'description',
      value: '',
      options: [{
        value: 'guide',
        label: 'Guide',
        children: [{
          value: 'disciplines',
          label: 'Disciplines',
          children: [{
            value: 'consistency',
            label: 'Consistency'
          }, {
            value: 'feedback',
            label: 'Feedback'
          }, {
            value: 'efficiency',
            label: 'Efficiency'
          }, {
            value: 'controllability',
            label: 'Controllability'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'side nav',
            label: 'Side Navigation'
          }, {
            value: 'top nav',
            label: 'Top Navigation'
          }]
        }]
      }, {
        value: 'component',
        label: 'Component',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout'
          }, {
            value: 'color',
            label: 'Color'
          }, {
            value: 'typography',
            label: 'Typography'
          }, {
            value: 'icon',
            label: 'Icon'
          }, {
            value: 'button',
            label: 'Button'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio'
          }, {
            value: 'checkbox',
            label: 'Checkbox'
          }, {
            value: 'input',
            label: 'Input'
          }, {
            value: 'input-number',
            label: 'InputNumber'
          }, {
            value: 'select',
            label: 'Select'
          }, {
            value: 'cascader',
            label: 'Cascader'
          }, {
            value: 'switch',
            label: 'Switch'
          }, {
            value: 'slider',
            label: 'Slider'
          }, {
            value: 'time-picker',
            label: 'TimePicker'
          }, {
            value: 'date-picker',
            label: 'DatePicker'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker'
          }, {
            value: 'upload',
            label: 'Upload'
          }, {
            value: 'rate',
            label: 'Rate'
          }, {
            value: 'form',
            label: 'Form'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table'
          }, {
            value: 'tag',
            label: 'Tag'
          }, {
            value: 'progress',
            label: 'Progress'
          }, {
            value: 'tree',
            label: 'Tree'
          }, {
            value: 'pagination',
            label: 'Pagination'
          }, {
            value: 'badge',
            label: 'Badge'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert'
          }, {
            value: 'loading',
            label: 'Loading'
          }, {
            value: 'message',
            label: 'Message'
          }, {
            value: 'message-box',
            label: 'MessageBox'
          }, {
            value: 'notification',
            label: 'Notification'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu'
          }, {
            value: 'tabs',
            label: 'Tabs'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb'
          }, {
            value: 'dropdown',
            label: 'Dropdown'
          }, {
            value: 'steps',
            label: 'Steps'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog'
          }, {
            value: 'tooltip',
            label: 'Tooltip'
          }, {
            value: 'popover',
            label: 'Popover'
          }, {
            value: 'card',
            label: 'Card'
          }, {
            value: 'carousel',
            label: 'Carousel'
          }, {
            value: 'collapse',
            label: 'Collapse'
          }]
        }]
      }, {
        value: 'resource',
        label: 'Resource',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'docs',
          label: 'Design Documentation'
        }]
      }],
      editorOption: {
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['image'],
            ['code-block']
          ]
        }
      },

    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
}
</script>
<style>
.el-cascader__dropdown {
  border: 1px solid #1C2E45;
  background-color: #0F1824;
  border-radius: 10px;
}

.el-cascader-node:not(.is-disabled):hover {
  background: #1C2E45;
}

.el-cascader-menu {
  border-color: #1C2E45;
}

.el-cascader:not(.is-disabled):hover .el-input__inner {
  border-color: #3B82F6;
}

.ql-snow .ql-stroke {
  stroke: #C8D7E9;
}

.ql-snow .ql-fill {
  fill: #C8D7E9;
}

.ql-snow .ql-picker {
  color: #C8D7E9;
}

.ql-toolbar.ql-snow {
  border-color: #1C2E45;
  border-radius: 10px 10px 0 0;
}

.ql-container.ql-snow {
  border-color: #1C2E45;
  border-radius: 0 0 10px 10px;
}

.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
  background-color: #0F1824;
  border-radius: 5px 5px 0 0;
}

.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
  border-color: #1C2E45;
}

.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
  border-color: #1C2E45;
  border-radius: 0 0 5px 5px;
}

.ql-snow .ql-picker-options {
  border-color: #1C2E45;
  background-color: #0F1824;
  color: #C8D7E9;
}

.ql-editor.ql-blank::before  {
  color: #C8D7E9;
}

.ql-container.ql-snow {
  height: 300px;
}

.ql-snow .ql-editor pre.ql-syntax {
  background-color: #0F1824;
  color: #C8D7E9;
  border-radius: 5px;
}
</style>