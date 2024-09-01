<template>
  <div class="bg-gray-100 p-4 rounded-md shadow">
    <input
      v-model="query"
      placeholder="Search (e.g., role:admin status:active)"
      @input="emitSearch"
      class="w-full p-2 mb-4 border rounded-md"
    />
    <div class="mb-4">
      <h3 class="text-lg font-semibold mb-2">Role</h3>
      <label class="block">
        <input type="radio" value="" v-model="role" @change="emitFilter" /> All
      </label>
      <label class="block">
        <input type="radio" value="admin" v-model="role" @change="emitFilter" /> Admin
      </label>
      <label class="block">
        <input type="radio" value="user" v-model="role" @change="emitFilter" /> User
      </label>
    </div>
    <div>
      <h3 class="text-lg font-semibold mb-2">Status</h3>
      <label class="block">
        <input type="radio" value="" v-model="status" @change="emitFilter" /> All
      </label>
      <label class="block">
        <input type="radio" value="active" v-model="status" @change="emitFilter" /> Active
      </label>
      <label class="block">
        <input type="radio" value="inactive" v-model="status" @change="emitFilter" /> Inactive
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      role: '',
      status: ''
    }
  },
  methods: {
    emitFilter() {
      this.$emit('filter', {
        role: this.role,
        status: this.status
      })
    },
    emitSearch() {
      this.$emit('search', this.query)
    }
  }
}
</script>

<style scoped>
/* Additional styles can go here if needed */
</style>
