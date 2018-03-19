<template>
  <div id="app">
    <div class="container-fluid">
      <Navbar></Navbar>

      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { EventBus } from './event-bus';
import { Toast } from './mixins/Toast';

export default {
  name: 'app',
  components: { Navbar },
  mixins: [Toast],

  beforeMount() {
    if (this.$cookie.get('token')) {
      EventBus.$emit('AUTH_LOGIN');
    }
  },

  created() {
    EventBus.$on('AUTH_LOGIN', token => {
      if (token) {
        // User just logged in with credentials
        this.showSuccessToast('Du har blivit inloggad. Välkommen');
        this.$store.commit('SET_AUTHENTICATED', true);
        this.$cookie.set('token', token);
        this.$router.push('/dashboard/invoice');
      } else {
        // Token was found in a cookie
        this.$store.commit('SET_AUTHENTICATED', true);
        this.showSuccessToast('Välkommen tillbaka');
      }
    });

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
    /*parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
      
      // if(!this.tokenCookie) return;

    //var expDate = this.parseJwt(this.token).exp;
    //var currentDate = Math.ceil(new Date().getTime() / 1000);
    }*/
  }
};
</script>

<style lang="scss">
@import './styles/global.scss';
</style>

<style>
@import './styles/style.css';
</style>