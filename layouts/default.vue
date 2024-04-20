<template>
  <div>
    <div class="grid grid-cols-9">
      <div id="sidebarWrapper" class="col-span-2 sticky top-0 left-0">
        <customTheSideBar />
      </div>
      <div class="col-span-7">
        <customTheHeader />
        <div class="relative">
          <transition name="fade">
            <div v-if="isLoading" id="loader" :style="{width: `calc(100vw - ${sideBarWidth}px - 4px)`, backdropFilter: `blur(5px)`}" class="min-h-[calc(100vh-64px)] z-10 fixed bottom-0 right-0 bg-[#00000050] flex justify-center items-center">
              <i class="el-icon-loading text-5xl text-blue"></i>
            </div>
          </transition>
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  middleware: ['router', 'authMe'],
  data: () => {
    return {
      sideBarWidth: 0,
    }
  },
  mounted() {
    this.sideBarWidth = document.querySelector('#sidebarWrapper').clientWidth;
  },  
  computed: {
    ...mapGetters('loader', ['isLoading'])
  }
}
</script>
<style>
</style>