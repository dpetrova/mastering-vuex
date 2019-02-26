<template>
  <div>
    <h1>Create Event</h1>
    <p>This event is created by {{ userName }}</p>
    <!-- <p>This event is created by {{ user.name }}</p> -->
    <ul>
      <li v-for="cat in categories" :key="cat">{{ cat }}</li>
    </ul>
    <p>There are {{ catCount }} categories.</p>
    <!-- pass the parameter for the computed property -->
    <p>{{ getEvent(1) }}</p>
    <!-- displays default slot content -->
    <BaseButton />
    <!-- pass Update as slot content -->
    <BaseButton>Update</BaseButton>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
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
    //   return this.$store.getters.getEventById
    // },
    //from store (using spread operator)
    ...mapState({
      userName: state => state.user.name,
      userId: state => state.user.id,
      categories: state => state.categories
    }),
    ...mapGetters({
      catCount: 'catLength',
      getEvent: 'getEventById'
    })
  }
  // computed: mapState({
  //   user: 'user',
  //   categories: 'categories'
  // })
}
</script>
