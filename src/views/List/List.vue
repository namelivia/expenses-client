<template lang="pug">
section
    h1(v-t="'list.title'")
    expense-list
</template>

<script>
import ExpenseList from "./components/ExpenseList";
export default {
  components: {
    ExpenseList: ExpenseList,
  },
};
</script>
