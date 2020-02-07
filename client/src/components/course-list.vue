<template>
  <div>
    <div style="display:flex;">
      <div class="search-wrapper">
        <label>Search title</label>
        <input type="text" v-model="search">
      </div>
      <div>
        <label>Filter</label>
        <select v-model="selectedTopic" placeholder="Topic filter">
          <option></option>
          <option v-for="(topic, index) in topics"
                  v-bind:key="index">{{topic}}</option>
        </select>
      </div>
      <div>
        <label>Sort</label>
        <select v-model="sorting">
          <option></option>
          <option>Alphabetically</option>
          <option>Price</option>
        </select>
        <input type="radio" name="type" value="ascending" v-model="sortingType"> Ascending
        <input type="radio" name="type" value="descending" v-model="sortingType"> Descending
      </div>
    </div>
    <div v-for="course in filteredSortedList"
         v-bind:id="course._id"
         v-bind:key="course._id">
      {{course}}
      <select v-bind:id="course._id"
              v-model="ratingField">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <button @click="addRating(course._id)">Rate</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  props: ['topics', 'prices', 'courses', 'status'],
  data() {
    return {
      search: '',
      selectedTopic: '',
      selectedPrice: '',
      sorting: '',
      sortingType: '',
      ratingField: null
    }
  },

  methods: {
    async addRating(id) {
      if(this.status.email !== '' && id !== null) {
        await fetch(`http://localhost:3200/api/courses/${id}-${this.status.email}-${this.ratingField}`, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
        this.$emit('update-courses');
      } else {
        alert("Log in to leave a rating");
      }
    }
  },

  computed: {
    filteredSortedList() {

      if(this.sorting === 'Alphabetically') {
        if(this.sortingType === 'ascending') {
          return this.filteredList.slice().sort((a,b) => (a.topic > b.topic) ? 1 : ((b.topic > a.topic) ? -1 : 0));
        } else if(this.sortingType === 'descending') {
          return this.filteredList.slice().sort((a,b) => (a.topic > b.topic) ? 1 : ((b.topic > a.topic) ? -1 : 0)).reverse();
        } else {
          return this.courses;
        }
      } else if(this.sorting === 'Price') {
        if(this.sortingType === 'ascending') {
          return this.filteredList.slice().sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
        } else if(this.sortingType === 'descending') {
          return this.filteredList.slice().sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)).reverse();
        } else {
          return this.courses;
        }
      } else {
        return this.filteredList;
      }
    },

    searchList() {
      return this.courses.filter(course => {
        return course.topic.toLowerCase().includes(this.search.toLowerCase());
      })
    },

    filteredList() {
      return this.searchList.filter(course => {
        return course.topic.toLowerCase().includes(this.selectedTopic.toLowerCase());
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
