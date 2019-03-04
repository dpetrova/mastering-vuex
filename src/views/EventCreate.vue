<template>
  <div>
    <h1>Create Event</h1>
    <form @submit.prevent="createEvent">
      >
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input v-model="event.title" type="text" placeholder="Add an event title">
      </div>
      <div class="field">
        <label>Description</label>
        <input v-model="event.description" type="text" placeholder="Add a description">
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input v-model="event.location" type="text" placeholder="Add a location">
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date"/>
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit">
    </form>

    <!-- <p>This event is created by {{ userName }}</p> -->
    <!-- <p>This event is created by {{ user.name }}</p> -->
    <!-- <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <p>There are {{ catCount }} categories.</p>
    <input type="number" v-model.number="incrementBy">-->
    <!-- using the .number modifier to typecast the input value as a number -->
    <!-- <BaseButton @click.native="incrementCount">Increment Count</BaseButton> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times, //same as times: times
      //categories: this.$store.state.categories,
      incrementBy: 0
    }
  },
  computed: {
    //local computed properties
    userName() {
      return this.$store.state.user.name
    },
    userId() {
      return this.$store.state.user.id
    },
    // catLength() {
    //   return this.$store.getters.catLength
    // },
    //retrieve some state based upon a parameter
    // getEvent() {
    //   return this.$store.getters['event/getEventById']
    // },
    //from store (using spread operator)
    ...mapState({
      userName: state => state.user.name,
      userId: state => state.user.id,
      categories: state => state.categories
    }),
    ...mapGetters({
      catCount: 'catLength',
      getEvent: 'event/getEventById'
    })
  },
  methods: {
    incrementCount() {
      //this.$store.commit('INCREMENT_COUNT', this.incrementBy) //commit a mutation
      this.$store.dispatch('updateCount', this.incrementBy) //dispatch an action
    },
    createFreshEvent() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          // navigate to newly create event
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          //reset event data
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          //console.log('There was a problem creating your event.')
        })
    }
  },
  components: {
    Datepicker
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
