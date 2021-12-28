<template lang="pug">
    tr
        td {{ formattedValue }}
        td {{ name }}
        td {{ user }}
        td {{ category }}
        td {{ formattedDate }}
        td
            router-link(:to="{ name: 'expense', params: { expenseId: id}}")
                regular-button.ml-2(:text="$t('expenseRow.details')")
</template>
<script>
import { valueFromInt } from '@/apis/helpers'
export default {
  props: {
    name: {
      type: String,
      default: '',
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
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
  },
  computed: {
    formattedValue: function () {
      let formatter = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      })
      if (this.value > 0) return formatter.format(valueFromInt(this.value))
      return this.value
    },
    formattedDate: function () {
      return new Date(this.date).toLocaleString('es-ES')
    },
  },
}
</script>
