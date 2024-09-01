<template>
  <div>
    <h1>User List</h1>
    <div class="container">
      <UserFilter @filter="applyFilter" @search="applySearch" />
      <ul>
        <li v-for="user in filteredUsers" :key="user.id">
          <router-link :to="`/profile/${user.id}`">{{ user.name }} ({{ user.role }}, {{ user.status }})</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserFilter from '../components/UserFilter.vue';

export default {
  components: {
    UserFilter
  },
  data() {
    return {
      users: [],
      filteredUsers: []
    };
  },
  methods: {
    fetchUsers() {
      axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
        // Mock role and status for demonstration purposes
        this.users = response.data.map(user => ({
          id: user.id,
          name: user.name,
          role: user.id % 2 === 0 ? 'admin' : 'user',
          status: user.id % 3 === 0 ? 'active' : 'inactive'
        }));
        this.filteredUsers = this.users;
      });
    },
    applyFilter(filterCriteria) {
      this.filteredUsers = this.users.filter(user => {
        return (
          (filterCriteria.role ? user.role === filterCriteria.role : true) &&
          (filterCriteria.status ? user.status === filterCriteria.status : true)
        );
      });
    },
    applySearch(query) {
      let searchQuery = query.toLowerCase().split(' ');
      this.filteredUsers = this.users.filter(user => {
        return searchQuery.every(term => {
          if (term.includes('role:')) {
            return user.role === term.split(':')[1];
          } else if (term.includes('status:')) {
            return user.status === term.split(':')[1];
          } else {
            return user.name.toLowerCase().includes(term);
          }
        });
      });
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style>
.container {
  display: flex;
}
ul {
  list-style-type: none;
}
</style>
