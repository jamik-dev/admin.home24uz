<template>
  <div class="w-screen min-h-screen flex justify-center items-center">
    <div class="bg-dark border border-dark-3 py-8 px-12 rounded-xl w-[500px]">
      <div class="flex gap-2 items-center justify-center mb-4">
        <img src="~/assets/images/svg/logo.svg" alt="logo" />
        <h1 class="text-2xl">Admin Panel</h1>
      </div>
      <el-form :model="form" ref="loginForm">
        <el-form-item prop="username" :rules="[{ required: true, message: 'Please input username', trigger: 'blur' }]">
          <p class="text-light font-semibold">Username <span class="text-blue">*</span></p>
          <el-input v-model="form.username" class="!w-full" placeholder="admin"></el-input>
        </el-form-item>

        <el-form-item prop="password" :rules="[{ required: true, message: 'Please input password', trigger: 'blur' }]">
          <p class="text-light font-semibold">Password <span class="text-blue">*</span></p>
          <el-input v-model="form.password" type="password" class="!w-full" placeholder="123123"></el-input>
        </el-form-item>
        <div class="mt-4 pt-4 space-x-2 border-t border-dark-3">
          <button
            @click.prevent="authLoginForm"
            class="bg-blue w-full text-center font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200">
            <i :class="{'el-icon-loading' : loading}"></i>
            Continue
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  layout: 'empty',
  data: () => {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    ...mapActions('auth', ['authLogin']),
    authLoginForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const response = await this.authLogin(this.form);
          this.loading = false;
          if (response.token) {
            this.$notify({ title: 'Success', message: 'Successfully signed up!', type: 'success' });
            this.$router.push('/dashboard');
          } else {
            this.$notify({ title: 'Error', message: response.message, type: 'error' });
          }
        } else {
          this.$notify({ title: 'Error', message: 'Please fill all fields', type: 'error' });
        }
      });
    }
  }
}
</script>
<style></style>