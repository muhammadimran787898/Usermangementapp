<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">User Profile: {{ user.name }}</h1>
    <div class="bg-white p-4 shadow rounded-md">
      <p><strong>ID:</strong> {{ user.id }}</p>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
      <p><strong>Status:</strong> {{ user.status }}</p>
    </div>
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
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      const userId = this.$route.params.id
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => {
          this.user = {
            id: response.data.id,
            name: response.data.name,
            role: response.data.id % 2 === 0 ? 'admin' : 'user',
            status: response.data.id % 3 === 0 ? 'active' : 'inactive'
          }
        })
        .catch((error) => {
          console.error('There was an error fetching the user data:', error)
        })
    }
  }
}
</script>
