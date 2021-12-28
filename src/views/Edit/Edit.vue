<template lang="pug">
section
    expense-form(@submit="onSubmit" :initial-data="form")
</template>

<script>
import router from '@/router'
import { getExpense, putExpense } from '@/apis/apis'
//import { errorToast, okToast } from '@/helpers/ui'
import ExpenseForm from '@/components/ExpenseForm'
import { valueFromInt } from '@/apis/helpers'
export default {
  components: {
    ExpenseForm,
  },
  props: {
    expenseId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        name: '',
        value: null,
        user_id: null,
        category: null,
      },
      show: true,
    }
  },
  mounted: function () {
    this.loadExpense()
  },
  methods: {
    async loadExpense() {
      try {
        const expense = await getExpense(this.expenseId)
        //TODO: I can't do this using the spread operator
        this.form.name = expense.name
        this.form.value = valueFromInt(expense.value)
        this.form.user_id = expense.user_id
        this.form.category = expense.category.id
      } catch (err) {
        //this.$bvToast.toast(`Expense can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
    async onSubmit(data) {
      try {
        await putExpense(this.expenseId, data)
        router.replace('/list', () => {
          //TODO: This needs to be translated
          //this.$root.$bvToast.toast(`Expense ${data.name} created`, okToast)
        })
      } catch (err) {
        //TODO: This needs to be translate d
        //this.$bvToast.toast(`Expense could not be updated`, errorToast)
      }
    },
  },
}
</script>
