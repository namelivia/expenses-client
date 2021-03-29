<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    div(v-else)
        expense-card-big(:expense-id="expenseId")
</template>

<script>
import ExpenseCardBig from './components/ExpenseCardBig'
export default {
  components: {
    ExpenseCardBig,
  },
  props: {
    expenseId: {
      type: Number,
      default: 0,
    },
  },
}
</script>
