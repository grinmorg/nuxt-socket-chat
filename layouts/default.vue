<template>
  <v-app app dark>
    <v-navigation-drawer v-if="showDrawer" app>
      <div class="all-users">
        All users in room:
      </div>
      <div v-for="u in users" :key="u.id">
        <div
          class="user__item"
          :class="{
            yourIcon: u.id === user.id
          }"
        >
          <v-avatar size="56" color="primary">
            {{ u.name.slice(0, 1).toUpperCase() }}
          </v-avatar>
          <p>
            {{ u.name }}
          </p>
        </div>
      </div>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon
        v-if="!showDrawer"
        @click="toggleDrawer"
      ></v-toolbar-side-icon>
      <v-btn v-else icon @click="toggleDrawer"
        ><v-icon>arrow_back</v-icon></v-btn
      >
      <v-toolbar-title>Chat</v-toolbar-title>
      <v-btn class="btn-exit" @click="exit">
        <svg
          width="20px"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times"
          class="svg-inline--fa fa-times fa-w-11"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 352 512"
        >
          <path
            fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          ></path>
        </svg>
      </v-btn>
    </v-toolbar>
    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    showDrawer: false
  }),
  methods: {
    ...mapMutations(["clearData"]),
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
    exit() {
      this.$socket.emit("userLeft", this.user.id, () => {
        this.$router.push("/?message=leftChat");
        this.clearData();
      });
    }
  },
  computed: mapState(["user", "users"])
};
</script>

<style scoped>
.btn-exit {
  margin-left: auto;
}
.user__item {
  display: flex;
  align-items: center;
  margin: 1.6rem 1rem;
  padding: 0.4rem;
  border-radius: 1rem;
}

.user__item p {
  font-size: 1.4rem;
  font-weight: semi-bold;
  margin-left: 1rem;
  margin-top: 0.8rem;
}
.user__item.yourIcon {
  background: rgba(138, 128, 226, 0.445);
}
.all-users {
  margin-top: 1rem;
  text-align: center;
  font-size: 1.8rem;
}
</style>
