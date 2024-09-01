<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">User List</h1>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <UserFilter @filter="applyFilter" @search="applySearch" />
      <ul class="md:col-span-3 space-y-2">
        <li v-for="user in filteredUsers" :key="user.id" class="bg-white shadow p-4 rounded-md">
          <router-link :to="`/profile/${user.id}`" class="text-blue-500 hover:underline"
            >{{ user.name }} ({{ user.role }}, {{ user.status }})</router-link
          >
        </li>
      </ul>
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

<style scoped>
/* Additional styles can go here if needed */
</style>
