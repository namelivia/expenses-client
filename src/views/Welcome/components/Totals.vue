<template lang="pug">
section
    loading(v-if='loading' )
    ul(v-else)
        h3(class="text-center text-6xl leading-relaxed" v-for='debt in debts' :key='debt.user')
            | {{ debt.user }} {{$t("totals.owes")}} {{debt.amount}}
</template>

<script>
import { getTotals } from '@/apis/apis'
import { useToast } from 'vue-toastification'
import { valueFromInt } from '@/apis/helpers'
export default {
  data: function () {
    return {
      totals: [],
      loading: false,
    }
  },
  computed: {
    debts: function () {
      let max = Math.max.apply(
        Math,
        this.totals.map(function (total) {
          return total.total
        }),
      )
      return this.totals
        .map(function (total) {
          if (total.total < max) {
            let formatter = new Intl.NumberFormat('es-ES', {
              style: 'currency',
              currency: 'EUR',
            })
            return {
              user: total.user,
              amount: formatter.format(valueFromInt(max - total.total)),
            }
          }
        })
        .filter((total) => total)
    },
  },
  mounted: function () {
    this.loadTotals()
  },
  methods: {
    async loadTotals() {
      const toast = useToast()
      try {
        this.totals = await getTotals()
      } catch (err) {
        //TODO: This needs to be translated
        toast.error(`Totals can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
