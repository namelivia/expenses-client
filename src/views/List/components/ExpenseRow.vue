<template lang="pug">
    tr
        td {{ formattedValue }}
        td {{ name }}
        td {{ user }}
        td {{ category }}
        td {{ formattedDate }}
        td
            router-link(:to="{ name: 'expense', params: { expenseId: id}}")
                b-button.ml-2(v-t="'expenseRow.details'")
</template>
<script>
import { valueFromInt } from "@/apis/helpers";
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    user: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: "",
    },
  },
  computed: {
    formattedValue: function () {
      if (this.value > 0) return valueFromInt(this.value);
      return this.value;
    },
    formattedDate: function () {
      return new Date(this.date).toLocaleString();
    },
  },
};
</script>
