<template lang="pug">
loading(v-if='loading')
span(v-else) {{ report.content }}
</template>
<script>
import { getReport } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  data() {
    return {
      report: null,
    }
  },
  mounted: function () {
    this.getReport()
  },
  methods: {
    async getReport() {
      const toast = useToast()
      try {
        this.report = await getReport()
      } catch (err) {
        //TODO: This needs to be translated
        toast.error(`Report can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
