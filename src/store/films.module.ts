import { Store, Commit, Dispatch, Module } from 'vuex'
import { State } from 'vue' 

declare module '@vue/runtime-core' {
    interface State {
      films: Array<any>,
    }
  
    interface ComponentCustomProperties {
      $store:Store<State>|Store<Commit>|Store<Dispatch>
    }
  }
  
  export const films_module:Module<any, any> = {
    namespaced: true,
    state: {
      films: []
    },
    mutations: {
      setFilms(state:State, films:Array<any>) {
        state.films = films
      }
    },
    actions: {
      
    },
    getters: {
      getFilms(state:State) {
        return state.films
      }
    }
  }