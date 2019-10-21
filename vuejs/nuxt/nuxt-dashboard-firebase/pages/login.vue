<template>
  <div>
    <h2 class="title">Sign In with Google</h2>
    <div class="text-center">
      <b-btn @click="googleSignUp" variant="primary" block>Login</b-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: "clean",
  data() {
    return {
      formEmail: '',
      formPassword: ''
    };
  },
  computed: {
  },
  methods: {
    emailLogin () {
      this.$store.dispatch('signInWithEmail', {
        email: this.formEmail,
        password: this.formPassword
      }).then(() => {
        this.formEmail = ''
        this.formPassword = ''
      }).catch((e) => {
        console.log(e.message);
      })
    },
    googleSignUp () {
      this.$store.dispatch('signInWithGoogle').then(() => {
        console.log('inside then statement on login');
      }).catch((e) => {
        console.log(e.message);
      })
    }
  }
};
</script>
