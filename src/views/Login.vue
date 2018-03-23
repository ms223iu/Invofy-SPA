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
        <div class="container mw-500 pb-1">
          <div class="tabs is-toggle is-medium is-fullwidth">
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
  components: { Footer }
};
</script>

<style scoped>
.mw-500 {
  max-width: 500px;
}
</style>
