<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <h1 class="text-5xl font-bold text-red-500">NIGGA ERROR OCCURED! FIX THAT!</h1>
    <p>{{ error }}</p>
  </div>
</template>
<script>
export default {
  layout: 'empty',
  props: ['error']
}
</script>
<style lang="">
  
</style>