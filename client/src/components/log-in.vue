<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
            <form>
              <label>Email</label>
              <input v-model='email' required>
              <label>Password</label>
              <input type="password" v-model='password' required>
              <button type="button" v-on:click="logIn">LOG IN</button>
            </form>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                CLOSE
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LogIn',
  props: ['users'],
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {

    logIn() {
      fetch('http://localhost:3200/api/users/login', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),
      })
      .then((response) => response.json())
      .then((resp) => {
          console.log(resp);
          this.$emit('update-login', resp);
          this.$emit('close');
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
