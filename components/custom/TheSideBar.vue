<template>
  <aside class="bg-dark p-4 w-full sticky top-0 border-r h-screen border-dark-3">
    <div class="flex gap-2 items-center justify-center">
      <img src="~/assets/images/svg/logo.svg" alt="logo" />
      <h1 class="text-2xl">Admin Panel</h1>
    </div>
    <div class="mt-12 pr-2 overflow-y-auto h-[80vh]" style="scrollbar-gutter: stable;">
      <el-menu :default-active="$route.path" :router="true" :unique-opened="true" class="el-menu-vertical-demo"
        @open="handleOpen" @close="handleClose" background-color="transparent" text-color="#C8D7E9"
        active-text-color="#fff">
        <el-submenu index="/catalog">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>Каталог</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="route in catalogList" :key="route.slug" :index="`/catalog/${route.slug}`">
              <template slot="title">
                <span class="h-[5px] w-[5px] mr-3 inline-block bg-current rounded-full"></span>
                <span>{{ route.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/dashboard">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span>Dashboard</span>
          </template>
        </el-menu-item>
        <el-submenu index="/showcases">
          <template slot="title">
            <i class="el-icon-s-data"></i>
            <span>Витрины</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="showcase in showcases" :key="showcase.id" :index="`/showcases/case/${showcase.id}`">
              <template slot="title">
                <span class="h-[5px] w-[5px] mr-3 inline-block bg-current rounded-full"></span>
                <span>{{showcase.name.ru}}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/orders">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>Заказы</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="route in ordersList" :key="route.slug" :index="`/orders/${route.slug}`">
              <template slot="title">
                <span class="h-[5px] w-[5px] mr-3 inline-block bg-current rounded-full"></span>
                <span>{{ route.name }}</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/inbox">
          <template slot="title">
            <i class="el-icon-s-cooperation"></i>
            <span>Маркетинг</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/inbox/discount">
              <template slot="title">
                <span class="h-[5px] w-[5px] mr-3 inline-block bg-current rounded-full"></span>
                <span>Скидки</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/inbox/sms">
              <template slot="title">
                <span class="h-[5px] w-[5px] mr-3 inline-block bg-current rounded-full"></span>
                <span>SMS</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/inbox/promotions">
              <template slot="title">
                <span class="h-[5px] w-[5px] mr-3 inline-block bg-current rounded-full"></span>
                <span>Акции</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/clients">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>Клиенты</span>
          </template>
        </el-menu-item>
        <el-submenu index="/contents">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>Контент сайта</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/contents/discount">
              <template slot="title">
                <span class="h-[5px] w-[5px] mr-3 inline-block bg-current rounded-full"></span>
                <span>Blog</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/settings">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>Настройки сайта</span>
          </template>
          <el-menu-item-group>
            <el-submenu index="/settings/characteristics">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>Characteristics</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/settings/characteristics/options">
                  <template slot="title">
                    <span class="h-[5px] w-[5px] mr-3 inline-block bg-current rounded-full"></span>
                    <span>Options</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/settings/translations">
              <template slot="title">
                <span class="h-[5px] w-[5px] mr-3 inline-block bg-current rounded-full"></span>
                <span>Translations</span>
              </template>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </aside>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  data: () => {
    return {
      ordersList: [
        { name: 'Все заказы', slug: 'all-orders' },
        { name: 'Новые заказы', slug: 'new-orders' },
        { name: 'Принятые заказы', slug: 'accepted-orders' },
        { name: 'Ожидание', slug: 'pending-orders' },
        { name: 'В доставке', slug: 'delivery-orders' },
        { name: 'Возврат', slug: 'returned-orders' },
        { name: 'Доставленные', slug: 'done-orders' },
        { name: 'Отмененные', slug: 'canceled-orders' },
        { name: 'Заявки', slug: 'applications' },
      ],
      catalogList: [
        { name: 'Товары', slug: 'products' },
        { name: 'Категории', slug: 'categories' },
        { name: 'Атрибуты', slug: 'attributes' },
        { name: 'Характеристики', slug: 'characteristics' },
        { name: 'Бренды', slug: 'brands' },
      ]
    }
  },
  computed: {
    ...mapGetters({
      showcases: 'showcases/showcases'
    })
  },
  mounted() {
    this.getShowcases()
  },
  methods: {
    ...mapActions({
      getShowcases: 'showcases/getShowcases'
    }),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>
<style>
.el-menu {
  border: none;
}

.el-menu-item,
.el-submenu__title {
  border-radius: 10px;
}

.el-menu-item.is-active {
  background-color: #3B82F6 !important;
}

.el-menu-item:not(.is-active):hover,
.el-submenu__title:not(.is-active):hover,
.el-menu-item:not(.is-active):focus,
.el-submenu__title:not(.is-active):focus {
  background-color: #0F1824 !important;
}

.el-menu-item-group__title {
  display: none
}
</style>