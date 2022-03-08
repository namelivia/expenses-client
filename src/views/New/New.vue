<template lang="pug">
section
    expense-form(@submit="onSubmit")
</template>

<script>
import router from '@/router'
import ExpenseForm from '@/components/ExpenseForm.vue'
import { postExpense } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    ExpenseForm,
  },
  methods: {
    async onSubmit(data) {
      const toast = useToast()
      try {
        await postExpense(data)
        toast.success(`Expense ${data.name} created`)
        router.replace('/list')
      } catch (err) {
        toast.error(`Expense could not be created`)
      }
    },
  },
}
</script>
