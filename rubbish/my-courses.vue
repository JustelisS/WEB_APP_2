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
            <div v-for="course in myCourses"
                 v-bind:id="course.id"
                 v-bind:key="course.id">
              {{course}}
              <button @click="deleteCourse(course.id)">Delete</button>
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
  props: ['logedInUser', 'courses'],
  computed: {
    myCourses() {
      return this.courses.filter(course => {
        return course.author.toLowerCase().includes(this.logedInUser.toLowerCase());
      })
    }
  },
  methods: {
    deleteCourse: function(courseId) {
      for(let course = 0; course < this.courses.length; course++) {
        if(this.courses[course].id === courseId) {
          this.courses.splice(course, 1);
          localStorage.setItem("courses", JSON.stringify(this.courses));
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
