<template>
  <div>
    <TopBar :drawer="drawer" :toggleDrawer="toggleDrawer" />
    <v-content style="padding-top:2rem">
      <v-container>
        <v-card
          :style="'background-color:' + getColor.backColor"
          style="box-shadow:none"
        >
          <v-card-title>
            Games
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="games"
            :search="search"
            :items-per-page="5"
            :loading="loader"
            loading-text="Loading... Please wait"
            style="border-spacing: 0 1em;"
            :style="'background-color:' + getColor.backColor"
          >
            <template v-slot:body="{ items }">
              <tbody :style="'background-color:' + getColor.backColor">
                <tr
                  v-for="(item, index) in items"
                  :key="item.Rank"
                  @click="handleClick(index), (selected = item.Rank)"
                  :style="'background: ' + getColor.cardColor"
                >
                  <td>
                    {{ item.Rank }}
                  </td>
                  <td>
                    {{ item.Name }}
                  </td>
                  <td>
                    {{ item.Platform }}
                  </td>
                  <td>
                    {{ item.Year }}
                  </td>
                  <td>
                    {{ item.Genre }}
                  </td>
                  <td>
                    {{ item.Publisher }}
                  </td>
                  <td>
                    {{ item.Global_Sales }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import TopBar from "@/components/inner/TopBar.vue";

export default {
  name: "GamesHome",
  components: {
    TopBar
  },
  data: () => ({
    drawer: true,
    search: "",
    headers: [
      { text: "Rank", value: "Rank" },
      { text: "Name", value: "Name" },
      { text: "Platform", value: "Platform" },
      { text: "Year", value: "Year" },
      { text: "Genre", value: "Genre" },
      { text: "Publisher", value: "Publisher" },
      { text: "Global Sales", value: "Global_Sales" }
    ]
  }),
  computed: {
    ...mapState(["loader", "games"]),
    ...mapGetters(["getColor"])
  },
  methods: {
    toggleDrawer: function() {
      this.drawer = !this.drawer;
    },
    handleClick(value) {
      console.log(value);
      this.$router.push("/" + value);
    },
    ...mapActions(["getGames"])
  },
  created() {
    this.getGames();
  }
};
</script>
<style scoped>
::v-deep .v-data-table__wrapper td {
  border: none !important;
  cursor: pointer;
}
::v-deep .v-data-table__wrapper table {
  border-spacing: 0 1em;
}
::v-deep tr:last-child th {
  border: none !important;
}
::v-deep .v-data-footer {
  border: none !important;
}
</style>
