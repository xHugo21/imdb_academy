import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue'

declare module '@vue/runtime-core' {
    interface State {
        query: string,
        url: string,
        wand_selected: boolean
    }

    interface ComponentCustomProperties {
        $store: Store<State> | Store<Commit> | Store<Dispatch>
    }
}

export const search_module: Module<any, any> = {
    namespaced: true,
    state: {
        query: '',
        wand_selected: false
    },
    mutations: {
        setQuery(state: State, query: string) {
            state.query = query
        },
        setUrl(state: State, url: string) {
            state.url = url
        },
        setWandSelected(state: State, wand_selected: boolean) {
            state.wand_selected = wand_selected
        }
    },
    actions: {
        updateSearchBar({ commit }, query: string) {
            commit('setQuery', query);
            commit('setUrl', 'https://api.themoviedb.org/3/search/movie?api_key=9f772ff3aa5dfb8e963695d6c67ae338&query=' + query);
        }
    },
    getters: {
        getQuery(state: State): string {
            return state.query
        },
        getUrl(state: State): string {
            return state.url
        },
        getWandSelected(state: State): boolean {
            return state.wand_selected
        }
    }
}
