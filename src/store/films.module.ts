import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue' 

declare module '@vue/runtime-core' {
    interface State {
      films: Array<any>, // Substitute for Film interface
      //saved_films: Array<any>, // Substitute for Film interface
    }
  
    interface ComponentCustomProperties {
      $store:Store<State>|Store<Commit>|Store<Dispatch>
    }
  }
  
  export const films_module:Module<any, any> = {
    namespaced: true,
    state: {
      films: [],
      //saved_films: []
    },
    mutations: {
      setFilms(state:State, films:Array<any>) {
        state.films = films;
      },
      /*setSavedFilms(state:State, films:Array<any>) {
        state.saved_films = films;
      }*/

    },
    actions: {
      
    },
    getters: {
      getFilms(state:State) {
        return state.films;
      },
      /*getSavedFilms(state:State) {
        return state.saved_films;
      }*/
    }
  }