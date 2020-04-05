<template>
  <v-app-bar app :style="'background-color:' + getColor.toolbarColor">
    <v-toolbar-title class="ml-0 px-3">Speech App</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TopBar",
  computed: {
    ...mapGetters(["getColor"])
  },
  watch: {
    searchText: function() {
      let text = this.searchText || "";
      this.SET_SEARCH(text);
    }
  }
};
</script>
