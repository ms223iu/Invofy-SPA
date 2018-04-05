<template>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <div class="navbar-item">
        <img src="../assets/logo.png">
      </div>
      <div :class="[isActive ? 'is-active' : '', 'navbar-burger burger']" @click="isActive=!isActive">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div :class="[isActive ? 'is-active' : '', 'navbar-menu']">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item" @click.native="isActive=false" exact>Hem</router-link>
        <router-link v-if="isAuthenticated" to="/dashboard" class="navbar-item is-hidden-touch" @click.native="isActive=false">Kontrollpanel</router-link>

        <div v-if="isAuthenticated" class="navbar-item has-dropdown is-hoverable is-hidden-desktop">
          <div class="navbar-dropdown">
            <template v-for="(entry, index) in menuItems">
              <p class="navbar-label" :key="index">{{ entry.category }}</p>
              <router-link class="navbar-item" v-for="(item, i) in entry.items" :to="item.to" :key="(10*(index+1))+i" @click.native="isActive=false" exact>{{ item.name }}</router-link>
            </template>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <a v-if="isAuthenticated" class="navbar-item" @click="isActive=false, logout()">Logga ut</a>
        <router-link v-else to="/auth" class="navbar-item" @click.native="isActive=false">Logga in</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { DashboardMenuItems } from '../mixins/DashboardMenuItems';

import { EventBus } from '../event-bus';

export default {
  mixins: [DashboardMenuItems],
  data() {
    return {
      isActive: false
    };
  },

  methods: {
    logout() {
      EventBus.$emit('AUTH_LOGOUT');
    }
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style scoped>
.navbar-label {
  font-size: 0.72rem;
  padding: 0.4rem 0 0.4rem 1.1rem;
  letter-spacing: 1px;
}
</style>
