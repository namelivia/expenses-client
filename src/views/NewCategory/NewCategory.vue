<template lang="pug">
section
    h1 Add new category
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('newCategory.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="form.name"
                type="text"
                required
                :placeholder="$t('newCategory.enterCategoryName')"
            )
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newCategory.submit')}}
        b-button(type="reset" variant="danger") {{$t('newCategory.reset')}}
</template>

<script>
import router from "@/router";
import { postCategory } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
export default {
  data() {
    return {
      form: {
        name: "",
      },
      show: true,
    };
  },
  methods: {
    async onSubmit(evt) {
      try {
        evt.preventDefault();
        await postCategory(this.form);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(
            `Category ${this.form.name} created`,
            okToast
          );
        });
      } catch (err) {
        this.$bvToast.toast(`Category could not be created`, errorToast);
      }
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form.name = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
