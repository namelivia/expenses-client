<template lang="pug">
section
    loading(v-if='loading' )
    div(v-else)
        expense-card-big(:expense-id="expenseId")
</template>

<script>
import ExpenseCardBig from '@/views/ExpenseDetail/components/ExpenseCardBig.vue'
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
