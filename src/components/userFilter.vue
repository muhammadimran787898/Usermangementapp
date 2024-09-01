<template>
  <div class="filter-sidebar">
    <input v-model="query" placeholder="Search (e.g., role:admin status:active)" @input="emitSearch" />
    <div>
      <h3>Role</h3>
      <label><input type="radio" value="" v-model="role" @change="emitFilter" /> All</label>
      <label><input type="radio" value="admin" v-model="role" @change="emitFilter" /> Admin</label>
      <label><input type="radio" value="user" v-model="role" @change="emitFilter" /> User</label>
    </div>
    <div>
      <h3>Status</h3>
      <label><input type="radio" value="" v-model="status" @change="emitFilter" /> All</label>
      <label><input type="radio" value="active" v-model="status" @change="emitFilter" /> Active</label>
      <label><input type="radio" value="inactive" v-model="status" @change="emitFilter" /> Inactive</label>
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
    };
  },
  methods: {
    emitFilter() {
      this.$emit('filter', {
        role: this.role,
        status: this.status
      });
    },
    emitSearch() {
      this.$emit('search', this.query);
    }
  }
};
</script>

<style>
.filter-sidebar {
  margin-right: 20px;
}
</style>
