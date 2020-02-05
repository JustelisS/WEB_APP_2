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
        <!--<select v-model="selectedPrice">
          <option></option>
          <option v-for="price in prices">{{price}}</option>
        </select>-->
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
    <div v-for="(course, index) in filteredSortedList"
         v-bind:key="index">
      {{course}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseList',
  props: ['topics', 'prices', 'courses'],
  data() {
    return {
      search: '',
      selectedTopic: '',
      selectedPrice: '',
      sorting: '',
      sortingType: ''
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
          //this.sortingType = 'ascending';
          //return this.filteredList.slice().sort((a,b) => (a.topic > b.topic) ? 1 : ((b.topic > a.topic) ? -1 : 0));
          return this.getCourses();
        }
      } else if(this.sorting === 'Price') {
        if(this.sortingType === 'ascending') {
          return this.filteredList.slice().sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
        } else if(this.sortingType === 'descending') {
          return this.filteredList.slice().sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)).reverse();
        } else {
          //this.sortingType = 'ascending';
          //return this.filteredList.slice().sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
          return this.getCourses();
        }
      } else {
        //this.sorting = '';
        //this.sortingType = '';
        return this.filteredList;
      }
    },

    searchList() {
      //this.getCourses();
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
