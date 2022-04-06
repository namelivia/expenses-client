<template lang="pug">
loading(v-if='loading')
selector(
    id="category"
    :label="$t('categorySelector.category')"
    :options="categoryOptions"
    :initialData="category"
    @selected="onChange"
    v-else
  )
</template>
<script>
import { getCategories } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  props: {
    selected: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      categories: [],
      category: '',
      loading: true,
    }
  },
  computed: {
    categoryOptions: function () {
      //TODO: This needs to be translated
      let options = [{ value: '', text: 'Select a category', disabled: true }]
      return options.concat(
        this.categories.map((category) => {
          return {
            value: category.id,
            text: category.name,
          }
        }),
      )
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler: function (newData) {
        this.category = newData
      },
    },
  },
  mounted: function () {
    this.loadCategories()
  },
  methods: {
    async loadCategories() {
      const toast = useToast()
      try {
        this.categories = await getCategories()
      } catch (err) {
        //TODO: This needs to be translated
        toast.error(`Categories can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
    onChange(evt) {
      this.$emit('selected', evt)
    },
  },
}
</script>
