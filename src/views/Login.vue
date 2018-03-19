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

  <section class="hero is-dark is-medium">
    <div class="hero-body">
      <div class="container max-500">
        <b-tabs v-model="activeTab" size="is-medium" type="is-toggle" expanded>
          <b-tab-item label="Logga in">
            <LoginForm></LoginForm>
          </b-tab-item>

          <b-tab-item label="Registrera">
            <RegisterForm></RegisterForm>
          </b-tab-item>
        </b-tabs>
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
.max-500 {
  max-width: 500px;
}
</style>
