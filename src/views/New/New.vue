<template lang="pug">
section
    expense-form(@submit="onSubmit")
</template>

<script>
import router from '@/router'
import ExpenseForm from '@/components/ExpenseForm'
import { postExpense } from '@/apis/apis'
//import { errorToast, okToast } from '@/helpers/ui'
export default {
  components: {
    ExpenseForm,
  },
  methods: {
    async onSubmit(data) {
      try {
        await postExpense(data)
        router.replace('/list', () => {
          //this.$root.$bvToast.toast(`Expense ${data.name} created`, okToast)
        })
      } catch (err) {
        //this.$bvToast.toast(`Expense could not be created`, errorToast)
      }
    },
  },
}
</script>
