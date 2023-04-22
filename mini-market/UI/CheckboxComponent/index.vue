<template>
  <div>
    <input type="checkbox" v-model="isChecked" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["cartStats"]),
    isChecked: {
      get() {
        return this.cartStats.InstallOption;
      },
      set() {
        this.toggleInstallOption();
      },
    },
  },
  methods: {
    ...mapActions(["toggleInstallOption"]),
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 20px;
  height: 20px;
}
</style>
