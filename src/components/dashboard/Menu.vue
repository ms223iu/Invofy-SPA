<template>
  <aside class="menu">
    <ul class="menu-list">
      <template v-for="(entry, index) in menuItems">
        <p class="menu-label" :key="index">{{ entry.category }}</p>
        <router-link v-for="(item, i) in entry.items" :to="item.to" :key="(10*(index+1))+i">{{ item.name }}</router-link>
      </template>
    </ul>
  </aside>
</template>

<script>
import { DashboardMenuItems } from '../../mixins/DashboardMenuItems';
export default {
  mixins: [DashboardMenuItems]
};
</script>

<style>

</style>
