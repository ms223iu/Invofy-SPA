<template>
  <div>
    <section class="hero is-large bg-img has-extra-height">
      <div class="hero-body">
        <h2 class="title has-text-centered has-text-light is-size-2 is-uppercase">
          <span class="is-underline">Invofy</span> är faktureringsappen som du kommer att älska</h2>
      </div>
    </section>

    <section class="hero is-dark">
      <div class="hero-body">
        <h2 class="title has-text-centered is-size-3 is-uppercase">Toppmodern teknologi</h2>
      </div>
    </section>

    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <div class="level">
            <p class="level-item">
              <img src="../assets/do-logo.png" class="logo" alt="Digital Ocean logo">
            </p>
            <p class="level-item">
              <img src="../assets/js-logo.png" class="logo" alt="NodeJS logo">
            </p>
            <p class="level-item">
              <img src="../assets/db-logo.png" class="logo" alt="NodeJS logo">
            </p>
            <p class="level-item">
              <img src="../assets/vue-logo.png" class="logo" alt="VueJS logo" style="width: 130px">
            </p>
          </div>
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
.bg-img {
  background: url('../assets/main-bg.jpg') center center;
  background-size: cover;
}

.has-extra-height {
  min-height: 500px;
}

.logo {
  max-width: 200px;
  padding: 10px 10px;
}

.is-underline {
  display: inline-block;
  border-bottom: 3px solid #167df0;
}
</style>
