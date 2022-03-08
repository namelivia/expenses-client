<template lang="pug">
section
    expense-form(@submit="onSubmit" :initial-data="form")
</template>

<script>
import router from '@/router'
import { getExpense, putExpense } from '@/apis/apis'
import { useToast } from 'vue-toastification'
import ExpenseForm from '@/components/ExpenseForm.vue'
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
        toast.error(`Expense can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
    async onSubmit(data) {
      const toast = useToast()
      try {
        await putExpense(this.expenseId, data)
        //TODO: This needs to be translated
        toast.success(`Expense ${data.name} created`)
        router.replace('/list')
      } catch (err) {
        //TODO: This needs to be translate d
        toast.error(`Expense could not be updated`)
      }
    },
  },
}
</script>
