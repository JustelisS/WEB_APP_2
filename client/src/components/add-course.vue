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
              <button type="button" v-on:click="addCourse">ADD COURSE</button>
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
  name: 'AddCourse',
  props: ['status', 'courses'],
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
    async addCourse() {
      if(this.topic !== '' && this.price !== null && this.county !== '' &&
         this.postcode !== '' && this.day !== '' && this.time !== '' &&
         this.length !== null && this.description !== '') {
           await fetch('http://localhost:3200/api/courses/addcourse', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               topic: this.topic,
               price: this.price,
               county: this.county,
               postcode: this.postcode,
               day: this.day,
               time: this.time,
               length: this.length,
               description: this.description,
               author: this.status.email
             })
           })
           .then((response) => response.json())
           .then(() => {})
           .catch((error) => {
             console.log(error);
           });
           this.$emit('update-courses');
           this.$emit('close');
         } else {
           alert("Please fill in the fields");
         }
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
