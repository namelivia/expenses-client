<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    ul(v-else)
        h3(v-for='debt in debts' :key='debt.user')
            | {{ debt.user }} {{$t("totals.owes")}} {{debt.amount}}
</template>

<script>
import { getTotals } from '@/apis/apis'
//import { errorToast } from '@/helpers/ui'
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
      try {
        this.totals = await getTotals()
      } catch (err) {
        //TODO: This needs to be translated
        //this.$bvToast.toast(`Totals can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
