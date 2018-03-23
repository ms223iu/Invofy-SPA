<template>
  <div>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Logga in eller skapa ett konto
          </h1>
        </div>
      </div>
    </section>

    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container mw-500">

          <div v-show="newUserCreated" class="notification is-success">
            <button @click="newUserCreated=false" class="delete"></button>
            Ditt konto har nu skapats och du kan logga in. I framtiden kommer kontoaktivering via email att implementeras.
          </div>

          <div class="tabs is-toggle is-medium is-fullwidth mt-2">
            <ul>
              <router-link to="/auth/login" tag="li">
                <a>Login</a>
              </router-link>
              <router-link to="/auth/register" tag="li">
                <a>Register</a>
              </router-link>
            </ul>
          </div>

          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </section>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../components/Footer';

export default {
  components: { Footer },
  data() {
    return {
      newUserCreated: false
    };
  },

  created() {
    this.$on('LOGIN_NEW_REGISTRATION', function() {
      this.newUserCreated = true;
    });
  }
};
</script>

<style scoped>
.mw-500 {
  max-width: 500px;
}
</style>
