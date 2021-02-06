<template lang="pug">
section
    h1(v-t="'list.title'")
    expense-list
    totals
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
