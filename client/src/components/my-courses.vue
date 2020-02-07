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
            <div v-for="course in mycourses"
                 v-bind:id="course._id"
                 v-bind:key="course._id">
              {{course}}
              <button @click="deleteCourse(course._id)">Delete</button>
            </div>
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
  name: 'MyCourses',
  props: ['status'],
  data() {
    return {
      mycourses: []
    }
  },
  methods: {
    async myCourses() {
       await fetch(`http://localhost:3200/api/courses/${this.status.email}`)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.mycourses = myJson;
        });
    },

    async deleteCourse(courseId) {
      await fetch(`http://localhost:3200/api/courses/${courseId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors'
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      this.$emit('update-courses');
      this.myCourses();
    }
  },
  created() {
    this.myCourses();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
