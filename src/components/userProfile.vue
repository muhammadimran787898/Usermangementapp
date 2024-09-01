<template>
  <div v-if="user">
    <h1>User Profile: {{ user.name }}</h1>
    <p><strong>ID:</strong> {{ user.id }}</p>
    <p><strong>Name:</strong> {{ user.name }}</p>
    <p><strong>Role:</strong> {{ user.role }}</p>
    <p><strong>Status:</strong> {{ user.status }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    const userId = this.$route.params.id
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`).then((response) => {
      this.user = {
        id: response.data.id,
        name: response.data.name,
        role: response.data.id % 2 === 0 ? 'admin' : 'user',
        status: response.data.id % 3 === 0 ? 'active' : 'inactive'
      }
    })
  }
}
</script>
