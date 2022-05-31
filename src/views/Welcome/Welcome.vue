<template lang="pug">
section
    totals
    report
</template>
<script>
import Totals from '@/views/Welcome/components/Totals.vue'
import Report from '@/views/Welcome/components/Report.vue'
export default {
  components: {
    Totals: Totals,
    Report: Report,
  },
}
</script>
