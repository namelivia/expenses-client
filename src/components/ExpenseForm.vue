<template lang="pug">
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('expenseForm.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="expense.name"
                type="text"
                required
                :placeholder="$t('expenseForm.enterExpenseName')"
            )
        b-form-group(
            id="value-input-group"
            :label="$t('expenseForm.value')"
            label-for="category"
        )
            b-form-input(
                id="value"
                name="value"
                v-model="expense.value"
                type="number"
                step="0.01"
                min="0"
                required
                :placeholder="$t('expenseForm.enterExpenseValue')"
            )
        user-selector(@selected="onUserSelected" :selected="expense.user")
        b-form-group(
            id="category-input-group"
            :label="$t('expenseForm.category')"
            label-for="category"
        )
            b-form-input(
                id="category"
                name="category"
                v-model="expense.category"
                type="text"
                required
                :placeholder="$t('expenseForm.enterExpenseCategory')"
            )
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newExpense.submit')}}
        b-button(type="reset" variant="danger") {{$t('newExpense.reset')}}
</template>
<script>
import { valueToInt } from "@/apis/helpers";
import UserSelector from "@/components/UserSelector";
export default {
  components: {
    UserSelector,
  },
  props: {
    initialData: {
      type: Object,
      default: () => {
        return {
          name: "",
          value: null,
          user: null,
          category: null,
        };
      },
    },
  },
  data() {
    return {
      show: true,
      expense: {
        name: "",
        value: null,
        user: null,
        category: null,
      },
    };
  },
  watch: {
    initialData: {
      immediate: true,
      handler: function (newData) {
        this.expense = newData;
      },
    },
  },
  methods: {
    onUserSelected(selectedUser) {
      this.expense.user = selectedUser;
    },
    async onSubmit(evt) {
      if (evt) {
        evt.preventDefault();
      }
      let expense = this.expense;
      expense.value = valueToInt(this.expense.value);
      this.$emit("submit", expense);
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.expense.name = "";
      this.expense.value = null;
      this.expense.user = null;
      this.expense.category = null;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
