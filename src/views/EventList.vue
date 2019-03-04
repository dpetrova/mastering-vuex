<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <!-- user.user.name -> first user is module name, second user is state -->
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link>|
    </template>
    <template v-if="event.eventsTotal > this.page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">Next Page</router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  created() {
    //this.$store.dispatch('fetchEvents')
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3, // <-- How many items to display per page
      page: this.page // <-- What page we're on
    })
  },
  //computed: mapState(['events'])
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    //use event. when we accessed parts of the state
    ...mapState(['event', 'user']) //this is mapping to our modules event and user
  },
  components: {
    EventCard
  }
}
</script>
