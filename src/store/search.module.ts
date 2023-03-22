import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue'

declare module '@vue/runtime-core' {
    interface State {
      query: string,
    }
  
    interface ComponentCustomProperties {
      $store:Store<State>|Store<Commit>|Store<Dispatch>
    }
  }
  
  export const search_module:Module<any, any> = {
    namespaced: true,
    state: {
      query: ''
    },
    mutations: {
      setQuery(state:State, query:string) {
        state.query = query
      }
    },
    actions: {
      
    },
    getters: {
      getQuery(state:State) {
        return state.query
      }
    }
  }