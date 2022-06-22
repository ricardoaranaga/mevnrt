import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as any,
    loggedIn: false,
  }),
  getters: {
    isLogged: (state) => state.loggedIn,
    isEmpty: (state) => !state.user,
    isAdmin: (state) => state.user ? state.user.roles.includes("ROLE_ADMIN") : null,
  },
  actions: {
    setUser(newUser: any): Boolean {
      this.user = newUser;
      this.loggedIn = true;
      return true
    },
    clearUser() : Boolean {
      try {
        this.user = null
        this.loggedIn = false
        localStorage.clear()
        return true
      }
      catch(err) {
        console.log(err);
        return false
      }
    },
  },
});
