<template lang="pug">
    b-spinner(v-if="loading" label="Loading...")
    b-form-group(
        id="user-input-group"
        :label="$t('newExpense.user')"
        label-for="user"
        v-else
    )
        b-form-select(
            id="user"
            name="user"
            v-model="user"
            @change="onChange($event)"
            :options="userOptions"
        )
</template>
<script>
import { getUsers } from "@/apis/apis";
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
      users: [],
      user: "",
      loading: true,
    };
  },
  computed: {
    userOptions: function () {
      let options = [{ value: "", text: "Select a user", disabled: true }];
      return options.concat(
        this.users.map((user) => {
          return {
            value: user.user_id,
            text: user.name,
          };
        })
      );
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler: function (newData) {
        this.user = newData;
      },
    },
  },
  mounted: function () {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        this.users = await getUsers();
      } catch (err) {
        this.$bvToast.toast(`Users can't be retrieved`, errorToast);
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
