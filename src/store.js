import { action, createStore } from "easy-peasy";

const store = createStore({
  upload: {
    start: false,
    setStart: action((state, payload) => {
      state.start = payload;
    }),
  },
});

export default store;
