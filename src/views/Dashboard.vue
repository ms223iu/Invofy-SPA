<template>
  <section class="section">
    <div class="columns">
      <div class="column is-2">
        <Menu></Menu>
      </div>
      
      <div class="column is-10">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import Menu from '../components/dashboard/Menu.vue';

export default {
  components: { Menu }
};
</script>

<style>

</style>
