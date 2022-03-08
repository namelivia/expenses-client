<template lang="pug">
section
    section-title(text="Add new category")
    form(@submit="onSubmit" @reset="onReset"  v-if="show")
        text-input(
            :name="name"
            :label="$t('newCategory.name')"
            :placeholder="$t('newCategory.enterCategoryName')"
            @update="form.name = $event"
            required
        )
        .mt-4
        submit-button.mr-2(:text="$t('newCategory.submit')")
        reset-button(:text="$t('newCategory.reset')")
</template>

<script>
import router from '@/router'
import { postCategory } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  data() {
    return {
      form: {
        name: '',
      },
      show: true,
    }
  },
  methods: {
    async onSubmit(evt) {
      const toast = useToast()
      try {
        evt.preventDefault()
        await postCategory(this.form)
        toast.success(`Category ${this.form.name} created`)
        router.replace('/list')
      } catch (err) {
        toast.error(`Category could not be created`)
      }
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.form.name = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
