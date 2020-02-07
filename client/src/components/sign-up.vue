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
              <input type="radio" name="type" value="user" v-model="usertype" required> User <br>
              <input type="radio" name="type" value="creator" v-model="usertype" required> Creator <br>
              <label>Email</label>
              <input v-model='email' required>
              <label>Password</label>
              <input type="password" v-model='password' required>
              <button type="button" v-on:click='addUser'>SIGN UP</button>
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
  name: 'SignUp',
  props: ['users'],
  data() {
    return {
      usertype: "",
      email: "",
      password: ""
    }
  },
  methods: {
    addUser() {
      const exists = this.doesExist();
      if(this.email == '' || this.email == '' || this.email == '') {
        alert("All fiels must be filled");
      } else if(this.invalidDetails()){
          alert("Username or Password Too Long");
      } else if(exists) {
          alert("User With This Name Already Exists");
      } else {
          fetch('http://localhost:3200/api/users/newUser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              mode: 'cors',
              body: JSON.stringify({
                usertype: this.usertype,
                email: this.email,
                password: this.password
              }),
          })
          .then((response) => response.json())
          .then(() => {
              alert("You Have Successfully Registered");
          })
          .catch((error) => {
              console.log(error);
          });
          this.$emit('close');
      }
    },

    doesExist() {
      fetch(`http://localhost:3200/api/users/${this.email}`)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          return res;
        });
    },
    invalidDetails: function() {
      if(this.email.length <= 20 && this.password.length <= 25) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
