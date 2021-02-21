<template lang="pug">
    b-spinner(v-if="loading" label="Loading...")
    b-form-group(
        id="category-input-group"
        :label="$t('categorySelector.category')"
        label-for="category"
        v-else
    )
        b-form-select(
            id="category"
            name="category"
            v-model="category"
            @change="onChange($event)"
            :options="categoryOptions"
        )
</template>
<script>
import { getCategories } from "@/apis/apis";
import { errorToast } from "@/helpers/ui";
export default {
  props: {
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      categories: [],
      category: "",
      loading: true,
    };
  },
  computed: {
    categoryOptions: function () {
      //TODO: This needs to be translated
      let options = [{ value: "", text: "Select a category", disabled: true }];
      return options.concat(
        this.categories.map((category) => {
          return {
            value: category.id,
            text: category.name,
          };
        })
      );
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler: function (newData) {
        this.category = newData;
      },
    },
  },
  mounted: function () {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        this.categories = await getCategories();
      } catch (err) {
        //TODO: This needs to be translated
        this.$bvToast.toast(`Categories can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
    onChange(evt) {
      this.$emit("selected", evt);
    },
  },
};
</script>
