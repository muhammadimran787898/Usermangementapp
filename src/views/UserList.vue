<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Welcome to the User List</h1>
    <ul class="space-y-2">
      <li v-for="user in users" :key="user.id" class="bg-white shadow p-4 rounded-md">
        {{ user.name }} ({{ user.role }}, {{ user.status }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Example data, you can replace this with real data fetched from an API
const users = ref([
  { id: 1, name: 'John Doe', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', role: 'user', status: 'inactive' },
  { id: 3, name: 'Alice Johnson', role: 'user', status: 'active' }
])
</script>

<style scoped>
/* Add any custom styles for this component */
</style>
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-6">User List</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Sidebar with Filters -->
      <UserFilter @filter="applyFilter" @search="applySearch" />

      <!-- User List -->
      <div class="md:col-span-3">
        <ul class="space-y-4">
          <li
            v-for="user in filteredUsers"
            :key="user.id"
            class="flex items-center justify-between p-4 bg-white shadow rounded-lg"
          >
            <div>
              <p class="text-lg font-semibold">{{ user.name }}</p>
              <p class="text-sm text-gray-500">Role: {{ user.role }}, Status: {{ user.status }}</p>
            </div>
            <router-link :to="`/profile/${user.id}`" class="text-blue-600 hover:text-blue-800">
              View Profile
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserFilter from '../components/UserFilter.vue'

export default {
  components: {
    UserFilter
  },
  data() {
    return {
      users: [],
      filteredUsers: []
    }
  },
  methods: {
    fetchUsers() {
      axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        this.users = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          role: user.id % 2 === 0 ? 'admin' : 'user',
          status: user.id % 3 === 0 ? 'active' : 'inactive'
        }))
        this.filteredUsers = this.users
      })
    },
    applyFilter(filterCriteria) {
      this.filteredUsers = this.users.filter((user) => {
        return (
          (filterCriteria.role ? user.role === filterCriteria.role : true) &&
          (filterCriteria.status ? user.status === filterCriteria.status : true)
        )
      })
    },
    applySearch(query) {
      const filters = {}
      const searchTerms = query.toLowerCase().split(' ')

      searchTerms.forEach((term) => {
        const [key, value] = term.split(':')
        if (key && value) {
          filters[key.trim()] = value.trim()
        }
      })

      this.filteredUsers = this.users.filter((user) => {
        return Object.keys(filters).every((key) => {
          return user[key] && user[key].toLowerCase() === filters[key]
        })
      })
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<style scoped></style>
