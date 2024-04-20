<template>
  <tr @click="openChild = !openChild" class="hover:bg-dark-2 duration-200"
    :style="{ cursor: data?.children?.length > 0 ? 'pointer' : '' }">
    <td :style="{ paddingLeft: parent > 0 ? '22px' : '' }" class="px-3.5 py-2.5 border-y border-dark-3 relative">
      <button v-if="data?.children?.length > 0" :style="{ left: parent ? '-14px' : '' }"
        class="absolute h-5 w-5 top-1/2 -left-5 z-10 -translate-y-1/2"><i
          :style="{ transform: openChild ? 'rotate(90deg)' : '' }"
          class="el-icon-arrow-right duration-200"></i></button>
      <div class="flex items-center gap-2">
        <div class="border border-light bg-light rounded-lg overflow-hidden h-12 w-12">
          <img :src="data?.lg_img || require(`~/assets/images/jpg/default.jpg`)" alt="Product images"
            class="object-cover h-full w-full">
        </div>
        <div>
          <h6>{{ data.name.ru }} <span class="text-blue" v-if="data?.children?.length > 0">({{ data?.children?.length
              }})</span></h6>
        </div>
      </div>
    </td>
    <td class="px-3.5 py-2.5 border-y border-dark-3">
      <div class="border border-light bg-light rounded-lg overflow-hidden h-12 w-12">
        <img
          :src="data.icon ? `https://e-shop.ndc.uz/uploads/categories/icons/${data.icon}` : require(`~/assets/images/jpg/default.jpg`)"
          alt="Product images" class="object-cover h-full w-full">
      </div>
    </td>
    <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
      <el-checkbox :checked="!!data.is_popular" disabled></el-checkbox>
    </td>
    <td class="px-3.5 py-2.5 border-y border-dark-3 text-center">
      <span v-if="data?.is_active"
        class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-green-500 text-green-500 bg-green-500/20">Active</span>
      <span v-else
        class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border border-red-500 text-red-500 bg-red-500/20">Inactive</span>
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
    <teleport v-if="openChild" :to="'#categories-tbody-' + id">
      <localCategoriesRow :parent="true" :id="data.id" v-for="child in data?.children" :key="child.id" :data="child" />
    </teleport>
  </tr>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
    },
    parent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      openChild: false
    }
  },
}
</script>
<style></style>