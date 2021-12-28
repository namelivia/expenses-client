<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    .table-responsive-md(v-else)
        table.table.table-striped
            tbody
            expense-row(
                v-for='expense in expenses ' :key='expense.id'
                :id="expense.id"
                :name="expense.name"
                :value="expense.value"
                :user="expense.user_name"
                :category="expense.category.name"
                :date="expense.date"
            )
    nav(aria-label="Pagination")
        ul.pagination
            li.page-item(v-if='showPrevious')
                a.page-link(:href="previousPage") {{$t('list.Previous')}}
            li.page-item.ml-auto
                a.page-link(:href="nextPage") {{$t('list.Next')}}
</template>

<script>
import ExpenseRow from './ExpenseRow'
import { getExpenses } from '@/apis/apis'
//import { errorToast } from '@/helpers/ui'
export default {
  components: {
    expenseRow: ExpenseRow,
  },
  data: function () {
    return {
      expenses: [],
      page: 0,
      loading: true,
    }
  },
  computed: {
    nextPage: function () {
      return `?page=${this.page + 1}`
    },
    previousPage: function () {
      return `?page=${this.page - 1}`
    },
    showPrevious: function () {
      return this.page > 0
    },
  },
  mounted: function () {
    this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 0
    this.loadList()
  },
  methods: {
    async loadList() {
      try {
        this.expenses = await getExpenses(this.page)
      } catch (err) {
        //this.$bvToast.toast(`Expenses can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
