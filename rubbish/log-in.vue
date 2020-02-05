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
              <input v-model='username' required>
              <label>Password</label>
              <input type="password" v-model='password' required>
              <button v-on:click="logIn">LOG IN</button>
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
      username: "",
      password: ""
    }
  },
  methods: {
    logIn: function(){
      for(let user = 0; user < this.users.length; user++) {
        if(this.users[user].username == this.username &&
           this.users[user].password == this.password) {
             this.users[user].isSignedIn = true;
             localStorage.setItem("users", JSON.stringify(this.users));
             break;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
