<template lang="pug">
section
    h3(v-if='loading' ) Loading...
    pre(v-else)
        | {{ totals }}
</template>

<script>
import { getTotals } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  data: function () {
    return {
      totals: [],
      loading: true,
    };
  },
  mounted: function () {
    this.loadTotals();
  },
  methods: {
    async loadTotals() {
      try {
        this.totals = await getTotals();
      } catch (err) {
        this.$bvToast.toast(`Totals can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
