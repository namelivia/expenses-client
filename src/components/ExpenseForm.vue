<template lang="pug">
    form(@submit="onSubmit" @reset="onReset"  v-if="show")
        text-input(
          :name="name"
          :label="$t('expenseForm.name')"
          :placeholder="$t('expenseForm.enterExpenseName')"
          @update="expense.name = $event"
          required
        )
        number-input(
          :name="value"
          :label="$t('expenseForm.value')"
          :placeholder="$t('expenseForm.enterExpenseValue')"
          @update="expense.value = $event"
          step="0.01"
          min="0"
          required
        )
        user-selector(@selected="onUserSelected" :selected="expense.user_id")
        category-selector(@selected="onCategorySelected" :selected="expense.category")
        .mt-4
        submit-button.mr-2(:text="$t('newExpense.submit')")
        reset-button(:text="$t('newExpense.reset')")
</template>
<script>
import { valueToInt } from '@/apis/helpers'
import UserSelector from '@/components/UserSelector'
import CategorySelector from '@/components/CategorySelector'
export default {
  components: {
    UserSelector,
    CategorySelector,
  },
  props: {
    initialData: {
      type: Object,
      default: () => {
        return {
          name: '',
          value: null,
          user_id: null,
          category_id: null,
        }
      },
    },
  },
  data() {
    return {
      show: true,
      expense: {
        name: '',
        value: null,
        user_id: null,
        category_id: null,
      },
    }
  },
  watch: {
    initialData: {
      immediate: true,
      handler: function (newData) {
        this.expense = newData
      },
    },
  },
  methods: {
    onUserSelected(selectedUser) {
      this.expense.user_id = selectedUser
    },
    onCategorySelected(selectedCategory) {
      this.expense.category_id = selectedCategory
    },
    async onSubmit(evt) {
      if (evt) {
        evt.preventDefault()
      }
      let expense = this.expense
      expense.value = valueToInt(this.expense.value)
      this.$emit('submit', expense)
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.expense.name = ''
      this.expense.value = null
      this.expense.user_id = null
      this.expense.category_id = null
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
