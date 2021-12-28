<template lang="pug">
    loading(v-if='loading')
    selector(
        id="user"
        :label="$t('userSelector.user')"
        :options="userOptions"
        @selected="onChange"
        v-else
      )
</template>
<script>
import { getUsers } from '@/apis/apis'
//import { errorToast } from '@/helpers/ui'
export default {
  props: {
    selected: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      users: [],
      user: '',
      loading: true,
    }
  },
  computed: {
    userOptions: function () {
      //TODO: This needs to be translated
      let options = [{ value: '', text: 'Select a user', disabled: true }]
      return options.concat(
        this.users.map((user) => {
          return {
            value: user.user_id,
            text: user.name,
          }
        }),
      )
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler: function (newData) {
        this.user = newData
      },
    },
  },
  mounted: function () {
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      try {
        this.users = await getUsers()
      } catch (err) {
        //TODO: This needs to be translated
        //this.$bvToast.toast(`Users can't be retrieved`, errorToast)
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
