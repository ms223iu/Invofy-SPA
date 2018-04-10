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

          <div v-show="newUser" class="notification is-success">
            <button @click="closeNotification()" class="delete"></button>
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
            <router-view @newUserCreated="newUserCreated" @login="login" @register="register"></router-view>
          </transition>
        </div>
      </div>
    </section>

    <Footer></Footer>
  </div>
</template>

<script>
import { EventBus } from '../event-bus';
import { Toast } from '../mixins/Toast';
import Footer from '../components/Footer';

export default {
  components: { Footer },
  mixins: [Toast],
  data() {
    return {
      newUser: false
    };
  },

  created() {
    EventBus.$on('AUTH_LOGOUT', () => {
      this.showSuccessToast(
        'Du har blivit utloggad. Tack för att du är kund hos oss'
      );
      this.$store.commit('SET_AUTHENTICATED', false);
      this.$cookie.delete('token');
      this.$router.push('/');
    });
  },

  methods: {
    closeNotification() {
      this.newUser = false;
    },

    newUserCreated() {
      this.newUser = true;
    },

    login(token) {
      this.showSuccessToast('Du har blivit inloggad. Välkommen');
      this.$store.commit('SET_AUTHENTICATED', true);
      this.$cookie.set('token', token);
      this.$router.push('/dashboard/invoice');
    },

    logout() {},

    register() {
      console.log('user created');
    }
  }
};
</script>
