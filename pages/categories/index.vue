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
            <el-option v-for="item in 3" :key="3" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div>
          <table v-if="true" class="w-full whitespace-nowrap duration-200">
            <thead class="text-left">
              <tr class="text-sm w-full">
                <th class="px-3.5 py-2.5 w-1/2 font-semibold border-b border-dark-3">ПРОДУКТ</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3">ИКОНА</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3 text-center">ПОПУЛЯРНЫЙ</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3 text-center">СТАТУС</th>
                <th class="px-3.5 py-2.5 font-semibold border-b border-dark-3 text-center">ДЕЙСТВИЯ</th>
              </tr>
            </thead>
            <tbody :id="'categories-tbody-' + data.id" v-for="data in dataTree" :key="data.name">
              <localCategoriesRow :key="data.id" :data="data" :id="data.id" />
            </tbody>
          </table>
          <div v-if="false" class="noresult">
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
        status: ''
      },
      dataTree: [
        {
          id: 1,
          name: 'Category 1',
          children: [
            {
              id: 2,
              name: 'Category 1.1',
              children: [
                {
                  id: 3,
                  name: 'Category 1.1.1',
                }
              ]
            }
          ]
        },
        {
          id: 4,
          name: 'Category 2',
          children: [
            {
              id: 5,
              name: 'Category 2.1',
              children: [
                {
                  id: 6,
                  name: 'Category 2.1.1',
                }
              ]
            }
          ]
        },
        {
          id: 7,
          name: 'Category 3',
          children: [
            {
              id: 8,
              name: 'Category 3.1',
              children: [
                {
                  id: 9,
                  name: 'Category 3.1.1',
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
<style>
.el-checkbox__inner {
  height: 20px;
  width: 20px;
  background-color: #1C2E45;
  border-color: #1C2E45;
  border-radius: 4px;
}

.el-checkbox__inner::after {
  left: 25%;
  top: 50%;
}

.el-checkbox__input.is-checked .el-checkbox__inner::after {
  transform: rotate(45deg) scaleY(1.5) translate(-50%, -50%);
}
</style>