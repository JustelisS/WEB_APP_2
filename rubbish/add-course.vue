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
              <label for="topic">Topic</label>
              <select v-model="topic" id="topic" required>
                <option v-for="(topic, index) in topics"
                        v-bind:key="index">{{topic}}</option>
              </select>
              <label for="price">Price</label>
              <input id="price" v-model.number='price' required>
              <label for="counties">Location</label>
              <select v-model="county" id="counties" required>
                <option v-for="(county, index) in counties"
                        v-bind:key="index">{{county}}</option>
              </select>
              <label for="postcode">Postcode</label>
              <input id="postcode" v-model='postcode' required>
              <label for="days">Days</label>
              <select v-model="day" id="days" required>
                <option v-for="(day, index) in days"
                        v-bind:key="index">{{day}}</option>
              </select>
              <label for="time">Time</label>
              <input id="time" v-model='time' required>
              <label for="length">Length</label>
              <input id="length" v-model.number='length' required>
              <label for="description">Description</label>
              <input type="text" id="description" v-model='description' required>
              <button v-on:click="submitToDB">ADD COURSE</button>
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
import RoutingService from '../RoutingService'

export default {
  name: 'AddCourse',
  props: ['logedInUser', 'courses'],
  data() {
    return {
      id: 0,
      topic: '',
      description: '',
      price: null,
      county: '',
      postcode: '',
      day: '',
      time: '',
      length: null,
      counties: ['hendon',
                 'colindale',
                 'barnet'],
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      topics: [
        'Math',
        'Physics',
        'Astrology',
        'Computer Science',
        'Sports',
        'Cooking',
        'Driving'
      ]
    }
  },
  methods: {
    async submitToDB() {
      if(this.topic !== '' && this.price !== null && this.county !== '' &&
         this.postcode !== '' && this.day !== '' && this.time !== '' &&
         this.length !== null && this.description !== '') {
           await RoutingService.postData('http://localhost:3200/api/courses/reg', {
             topic: this.topic,
             price: this.price,
             county: this.county,
             postcode: this.postcode,
             day: this.day,
             time: this.time,
             length: this.length,
             description: this.description,
             author: this.logedInUser
           });
         }
    },

    addCourse: function() {
      if(this.topic !== '' && this.price !== null && this.county !== '' &&
         this.postcode !== '' && this.day !== '' && this.time !== '' &&
         this.length !== null && this.description !== '') {
           this.setId();
           this.courses.push({
             id: this.id,
             topic: this.topic,
             price: this.price,
             county: this.county,
             postcode: this.postcode,
             day: this.day,
             time: this.time,
             length: this.length,
             description: this.description,
             author: this.logedInUser
           });
           localStorage.setItem("courses", JSON.stringify(this.courses));
           //this.submitToDB();
         }
    },
    setId: function() {
      var courseId = 0;
        if(this.courses.length !== 0 && this.courses.length !== 1) {
          for(let course = 1; course < this.courses.length; course++) {
            if(this.courses[course].id >= this.courses[course - 1].id) {
              courseId = this.courses[course].id;
            } else {
              courseId = this.courses[course - 1].id;
            }
          }
          this.id = courseId + 1;
        } else if(this.courses.length === 1){
          courseId = this.courses[0].id;
          this.id = courseId + 1;
        } else {
          this.id = courseId;
        }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
