<template lang="pug">
section
    loading(v-if='loading' )
    div
        styled-table
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
    pagination(
      :previous-label="$t('list.Previous')"
      :next-label="$t('list.Next')"
      :show-previous="showPrevious"
      :previous-link="previousPage"
      :next-link="nextPage"
    )
</template>

<script>
import ExpenseRow from '@/views/List/components/ExpenseRow.vue'
import { getExpenses } from '@/apis/apis'
import { useToast } from 'vue-toastification'
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
      const toast = useToast()
      try {
        this.expenses = await getExpenses(this.page)
      } catch (err) {
        toast.error(`Expenses can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
