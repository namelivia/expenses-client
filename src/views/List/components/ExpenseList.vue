<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    table.table.table-striped(v-else)
        thead
            tr
                th Value
                th Name
                th User
                th Category
                th Date
                th 
        tbody
        expense-row(
            v-for='expense in expenses ' :key='expense.id'
            :id="expense.id"
            :name="expense.name"
            :value="expense.value"
            :user="expense.user"
            :category="expense.category"
            :date="expense.date"
        )
</template>

<script>
import ExpenseRow from "./ExpenseRow";
import { getExpenses } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  components: {
    expenseRow: ExpenseRow,
  },
  data: function () {
    return {
      expenses: [],
      loading: true,
    };
  },
  mounted: function () {
    this.loadList();
  },
  methods: {
    async loadList() {
      try {
        this.expenses = await getExpenses();
      } catch (err) {
        this.$bvToast.toast(`Expenses can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
