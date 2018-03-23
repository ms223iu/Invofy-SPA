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
              <li :class="{'is-active' : activeTab == 0}" @click="activeTab=0">
                <a>Login</a>
              </li>
              <li :class="{'is-active' : activeTab == 1}">
                <a @click="activeTab=1">Register</a>
              </li>
            </ul>
          </div>

          <LoginForm v-if="activeTab==0"></LoginForm>
          <RegisterForm v-if="activeTab==1"></RegisterForm>
        </div>
      </div>
    </section>

    <Footer></Footer>
  </div>
</template>

<script>
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import Footer from '../components/Footer';

export default {
  components: { LoginForm, RegisterForm, Footer },
  data() {
    return {
      activeTab: 0
    };
  }
};
</script>

<style scoped>
.mw-500 {
  max-width: 500px;
}
</style>
