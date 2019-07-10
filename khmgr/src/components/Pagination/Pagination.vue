<template>
  <div class="pagination" v-if="showPagination">
    <a-pagination
      @change="handlePageChange"
      v-model="current"
      :pageSize="pageSize"
      :total="totalCount"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pagination'],
  data () {
    return {
      Pagination: this.pagination
    }
  }
}
</script>

<style lang="less" scoped>
</style>
