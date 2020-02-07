<template>
  <div id="app">

      <nav>
        <a v-if="!isLogedIn" @click="showLogModal = true"> LOGIN </a>
        <a v-if="!isLogedIn" @click="showRegModal = true"> SIGN UP </a>
        <a v-if="isLogedIn && status.usertype == 'creator'" @click="showAddCourseModal = true">ADD COURSE</a>
        <a v-if="isLogedIn && status.usertype == 'creator'" @click="showMyCoursesModal = true">MY COURSES</a>
        <a v-if="isLogedIn" @click="logout"> LOG OUT </a>
        <a v-if="isLogedIn">Loged in as: {{status.email}}</a>
      </nav>

      <LogIn v-if="showLogModal"
             @update-login="updateLoginStatus"
             @close="showLogModal = false">

        <h1 slot="header">LOG IN</h1>
      </LogIn>

      <SignUp v-if="showRegModal"
               @close="showRegModal = false">

        <h1 slot="header">SIGN UP</h1>
      </SignUp>

      <AddCourse v-if="showAddCourseModal"
                  @update-courses="getCourses"
                  @close="showAddCourseModal = false"
                  v-bind:status="status"
                  v-bind:courses="courses">

        <h1 slot="header">ADD COURSE</h1>
      </AddCourse>

      <MyCourses v-if="showMyCoursesModal"
                  @close="showMyCoursesModal = false"
                  @update-courses="getCourses"
                  v-bind:status="status">

        <h1 slot="header">MY COURSES</h1>
      </MyCourses>



      <CourseList v-bind:topics="topics"
                   v-bind:prices="prices"
                   v-bind:courses="courses"
                   v-bind:status="status"
                   v-bind:is-loged-in="isLogedIn"
                   @update-courses="getCourses">
      </CourseList>

    </div>
</template>

<script>

import LogIn      from './components/log-in.vue'
import SignUp     from './components/sign-up.vue'
import MyCourses  from './components/my-courses.vue'
import CourseList from './components/course-list.vue'
import AddCourse  from './components/add-course.vue'

export default {
  name: 'app',
  components: {
    LogIn,
    SignUp,
    MyCourses,
    CourseList,
    AddCourse
  },
  data() {
    return {
      showRegModal: false,
      showLogModal: false,
      showAddCourseModal: false,
      showMyCoursesModal: false,
      isLogedIn: false,
      status: {
        email: '',
        usertype: ''
      },
      courses: [],
      topics: [
        'Math',
        'Physics',
        'Astrology',
        'Computer Science',
        'Sports',
        'Cooking',
        'Driving'
      ],
      prices: [
        '0-50',
        '50-100',
        '>100'
      ]
    }
  },
  methods: {
    async getCourses() {
       await fetch('http://localhost:3200/api/courses')
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          this.courses = myJson;
        });
    },

    updateLoginStatus(user) {
      if(user) {
        this.isLogedIn = true;
        this.status = { email: user.email,
                        usertype: user.usertype };
      } else {
        this.isLogedIn = false;
        this.status = { email: '',
                        usertype: '' };
      }
    },

    async logout() {
       await fetch('http://localhost:3200/api/users/logout')
        .then(() => {
          this.updateLoginStatus();
          this.showRegModal = false;
          this.showLogModal = false;
          this.showAddCourseModal = false;
          this.showMyCoursesModal = false;
        })
    }

  },
  beforeMount(){
    this.getCourses();
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
