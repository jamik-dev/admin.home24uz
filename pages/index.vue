<template>
  <main>
    <div class="py-6 px-10">
      <el-dialog title="Tips" top="40vh" custom-class="!bg-dark !rounded-xl !border !border-dark-3 -translate-y-1/2" :visible.sync="dialogVisible"
        width="40%">
        <div class="px-8">
          <el-date-picker v-model="dateRange" type="daterange" align="center" class="!w-full !bg-dark-2 !border-blue"
            start-placeholder="Start Date" end-placeholder="End Date" default-value="2010-10-01">
          </el-date-picker>
          <div class="flex justify-end mt-4 pt-4 space-x-2 border-t border-dark-3">
            <button @click="dialogVisible = false" class="bg-dark-3 font-semibold rounded-lg py-2 px-4 text-light">cancel</button>
            <button @click="dialogVisible = false"
              class="bg-blue font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200">confirm</button>
          </div>
        </div>
      </el-dialog>
      <button @click="dialogVisible = true"
        class="p-2 block ml-auto rounded-lg bg-blue hover:bg-blue-2 duration-200 mb-3 text-sm font-semibold">Изменить дату</button>
      <div class="grid grid-cols-12 gap-3">
        <div v-for="item in 6" :key="item"
          class="col-span-4 rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
          <h3 class="text-xl">Количество заказов на сегодня</h3>
          <p class="text-2xl"><strong>0</strong></p>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-3 mt-8">
        <div v-for="item in 7" :key="item"
          class="col-span-1 rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
          <h3 class="text-xl">Новые</h3>
          <p class="text-2xl"><strong>0</strong></p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3 mt-8">
        <div v-for="item in 4" :key="item"
          class="col-span-1 rounded-xl bg-dark py-4 px-6 space-y-4 border border-dark-3">
          <apexchart width="100%" type="bar" :options="options" :series="series"></apexchart>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data: () => {
    return {
      dialogVisible: false,
      dateRange: '',
      options: {
        chart: {
          toolbar: {
            show: false
          },
          foreColor: '#C8D7E9',
          fontFamily: 'Public sans, sans-serif',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
        fill: {
          colors: ['#3B82F6']
        },
        title: {
          text: 'Vue Chart Example',
          style: {
            fontSize: '24px',
            color: '#C8D7E9'
          }
        },
        tootltip: {
          enabled: false
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  }
}
</script>

<style>
.el-dialog__wrapper {
  backdrop-filter: blur(5px);
}

.el-dialog__title,
.el-date-table th,
.el-picker-panel__icon-btn,
.el-picker-panel.el-date-range-picker.el-popper,
.el-date-editor .el-range-separator,
.el-date-editor .el-range-input {
  color: #C8D7E9;
}

.el-range-input {
  background-color: inherit;
}

.el-picker-panel.el-date-range-picker.el-popper {
  background-color: #0F1824;
}

.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: #1E2E3E;
}

.el-date-table td.prev-month,
.el-date-table td.next-month {
  color: #92AFD3;
}


.el-date-range-picker__content.is-left,
.el-date-table th,
.el-picker-panel.el-date-range-picker.el-popper {
  border-color: #1C2E45;
}
</style>
