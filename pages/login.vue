<template>
  <div class="w-screen min-h-screen flex justify-center items-center">
    <div class="bg-dark border border-dark-3 py-8 px-12 rounded-xl w-[500px]">
      <div class="flex gap-2 items-center justify-center mb-4">
        <img src="~/assets/images/svg/logo.svg" alt="logo" />
        <h1 class="text-2xl">Admin Panel</h1>
      </div>
      <el-form :model="form" ref="loginForm">
        <el-form-item prop="email" :rules="[{ required: true, message: 'Please input login', trigger: 'blur' }]">
          <p class="text-light font-semibold">Login <span class="text-blue">*</span></p>
          <el-input v-model="form.email" class="!w-full" placeholder="admin"></el-input>
        </el-form-item>

        <el-form-item prop="password" :rules="[{ required: true, message: 'Please input password', trigger: 'blur' }]">
          <p class="text-light font-semibold">Password <span class="text-blue">*</span></p>
          <el-input v-model="form.password" type="password" class="!w-full" placeholder="123123"></el-input>
        </el-form-item>
        <div class="mt-4 pt-4 space-x-2 border-t border-dark-3">
          <button
            @click.prevent="$notify({ title: 'Success', message: 'Login and password is correct', type: 'success' })"
            class="bg-blue w-full text-center font-semibold rounded-lg py-2 px-4 text-light hover:bg-blue-2 duration-200">
            Continue
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'empty',
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  }
}
</script>
<style></style>