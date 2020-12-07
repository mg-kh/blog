import { LOGIN } from "@/store/action.types";

export const auth = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    [LOGIN]({ commit }, userInfo) {
      console.log(userInfo);
    },
  },
};
