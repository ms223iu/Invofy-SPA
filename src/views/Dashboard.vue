<template>
  <section class="section">
    <div class="columns">
      <div class="column is-narrow is-hidden-touch">
        <Menu></Menu>
      </div>

      <div class="column">
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

<style scoped>
@media screen and (max-width: 1024px) {
  .column {
    padding: 0;
  }
}
</style>
