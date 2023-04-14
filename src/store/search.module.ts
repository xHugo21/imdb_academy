import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue'

declare module '@vue/runtime-core' {
    interface State {
        color_mode: string,
        url: string,
        query: string,
        year_min: number,
        year_max: number,
        duration: number,
        wand_selected: boolean
    }

    interface ComponentCustomProperties {
        $store: Store<State> | Store<Commit> | Store<Dispatch>
    }
}

export const search_module: Module<any, any> = {
    namespaced: true,
    state: {
        color_mode: 'dark',
        query: '',
        wand_selected: false
    },
    mutations: {
        setColorMode(state: State, color_mode: string) {
            state.color_mode = color_mode
        },
        setUrl(state: State, url: string) {
            state.url = url
        },
        setQuery(state: State, query: string) {
            state.query = query
        },
        setWandSelected(state: State, wand_selected: boolean) {
            state.wand_selected = wand_selected
        }
    },
    actions: {
        updateSearchBar({ commit }, query: string) {
            commit('setQuery', query);
            commit('setUrl', 'https://api.themoviedb.org/3/search/movie?api_key=9f772ff3aa5dfb8e963695d6c67ae338&query=' + query);
        },
        updateYear({ commit }, year: string) {
            commit('setQuery', year);
            commit('setUrl', 'https://api.themoviedb.org/3/discover/movie?api_key=9f772ff3aa5dfb8e963695d6c67ae338&primary_release_year=' + year);
        }
    },
    getters: {
        getColorMode(state: State): string {
            return state.color_mode
        },
        getUrl(state: State): string {
            return state.url
        },
        getQuery(state: State): string {
            return state.query
        },
        getWandSelected(state: State): boolean {
            return state.wand_selected
        }
    }
}
