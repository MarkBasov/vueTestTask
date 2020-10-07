import { createStore } from "vuex";
import Axios from 'axios';

export default createStore({
  state: {
    city: null,
  },
  mutations: {
    setCity: (state, loadedData) => {
      state.city = loadedData;
    },
  },
  getters: {
    cities: (state) => {
      return state.city;
    }
  },
  actions: {
    getCity: async (context, datas) => {
      let {data} = await Axios({
        method: 'get',
        url: https://www.metaweather.com/api/location/${datas.item.uid}/${datas.date.toISOString().split('T')[0].replace(/-/g, '/')}
      });
      context.commit('setCity', data.data);
    },
  },
  modules: {}
});
