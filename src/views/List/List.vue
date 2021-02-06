<template lang="pug">
section
    totals
    h1(v-t="'list.title'")
    expense-list
</template>

<script>
import ExpenseList from "./components/ExpenseList";
import Totals from "./components/Totals";
export default {
  components: {
    ExpenseList: ExpenseList,
    Totals: Totals,
  },
};
</script>
