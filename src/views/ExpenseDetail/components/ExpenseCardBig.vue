<template lang="pug">
b-spinner(v-if="loading" label="Loading...")
section(v-else)
    p.mb-0 Id: {{ expense.id}}
    p.mb-0 {{$t("expenseDetails.name")}}: {{ expense.name }}
    p.mb-0 {{$t("expenseDetails.value")}}: {{ formattedValue }}
    p.mb-0 {{$t("expenseDetails.category")}}: {{ expense.category.name }}
    p.mb-0 {{$t("expenseDetails.user")}}: {{ expense.user_name }}
    p.mb-0 {{$t("expenseDetails.date")}}: {{ formattedDate }}
    .mt-4
    b-button(variant="danger" v-on:click="onDelete" v-t="'expenseDetails.deleteIt'")
    router-link(:to="{ name: 'edit', params: { expenseId: this.expense.id}}")
        b-button.ml-2(v-t="'expenseDetails.editIt'")
</template>

<script>
import { getExpense, deleteExpense } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
import { valueFromInt } from "@/apis/helpers";
import router from "@/router";
export default {
  props: {
    expenseId: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      expense: null,
      loading: true,
    };
  },
  computed: {
    formattedDate: function () {
      return new Date(this.expense.date).toLocaleString();
    },
    formattedValue: function () {
      let formatter = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      });
      if (this.expense.value > 0) {
        return formatter.format(valueFromInt(this.expense.value));
      }
      return this.expense.value;
    },
  },
  watch: {
    expenseId: {
      immediate: true,
      handler: function (newData) {
        this.loadExpense(newData);
      },
    },
  },
  methods: {
    async loadExpense(expenseId) {
      try {
        this.expense = await getExpense(expenseId);
      } catch (err) {
        this.$bvToast.toast(`Expense can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
    async onDelete(evt) {
      evt.preventDefault();
      try {
        deleteExpense(this.expense.id);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`Expense removed`, okToast);
        });
      } catch (err) {
        this.$bvToast.toast(`Expense could not be removed`, errorToast);
      }
    },
  },
};
</script>
