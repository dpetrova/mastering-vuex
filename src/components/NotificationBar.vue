<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>
    
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  computed: {
    notificationTypeClass() {
      //this will return ‘-text-success’ or ‘-text-error’ depending upon the type of the notification
      return `-text-${this.notification.type}`
    }
  },
  mounted() {
    //dispatches the remove Action 5 seconds (5000ms) after the component is mounted
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    //make sure to clear the setTimeout just before this component is destroyed
    //This will make sure we avoid a memory leak by not leaving the setTimeout running if this component isn’t being actively displayed
    clearTimeout(this.timeout)
  },
  methods: mapActions('notification', ['remove'])
}
</script>
    
<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
.-text-success {
  color: green;
}
.-text-error {
  color: red;
}
</style>
