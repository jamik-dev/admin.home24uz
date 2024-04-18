<template>
  <header class="sticky top-0 w-full py-4 px-8 z-10 bg-dark flex justify-between items-center shadow-md shadow-dark-3">
    <div class="space-x-3 flex items-center">
      <h2 class="text-2xl">Dashboard</h2>
      <div class="h-full w-[1px] bg-dark-3"></div>
      <p class="text-sm">Catalog - Dashboard</p>
    </div>
    <div class="space-x-8 flex items-center">
      <button>
        <i class="el-icon-chat-line-round text-2xl cursor-pointer"></i>
      </button>
      <el-dropdown @command="authLogoutUser">
        <button class="text-light hover:text-blue">
          <i class="el-icon-user text-2xl text-current duration-200"></i>
        </button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  methods: {
    ...mapActions('auth', ['authLogout']),
    async authLogoutUser() {
      const response = await this.authLogout();
      if (response) {
        this.$notify({
          title: 'Success',
          message: 'You have been logged out',
          type: 'success'
        });
        this.$router.push('/login');
      }
    }
  }
}
</script>
<style>
</style>