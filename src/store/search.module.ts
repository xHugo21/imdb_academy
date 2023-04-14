import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue'

declare module '@vue/runtime-core' {
    interface State {
        color_mode: string,
        url: string,
        query: string,
        year_min: number,
        year_max: number,
        duration_max: number,
        genre_selected: string,
        country_selected: string,
        rating_min: number,
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
        year_min: 1900,
        year_max: 2023,
        duration_max: 300,
        genre_selected: '',
        country_selected: '',
        rating_min: 0,
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
        setYearMin(state: State, year_min: number) {
            state.year_min = year_min
        },
        setYearMax(state: State, year_max: number) {
            state.year_max = year_max
        },
        setWandSelected(state: State, wand_selected: boolean) {
            state.wand_selected = wand_selected
        }
    },
    actions: {
        updateSearchBar({ commit }, query: string) {
            commit('setQuery', query);
            commit('setUrl', 'https://api.themoviedb.org/3/search/multi?api_key=9f772ff3aa5dfb8e963695d6c67ae338&include_adult=false&query=' + query);
        },
        updateYear({ commit, state }, year: string) {
            commit('setYearMax', year);
            commit('setUrl', 'https://api.themoviedb.org/3/discover/multi?api_key=9f772ff3aa5dfb8e963695d6c67ae338&include_adult=false&query=' + state.query + '&year=' + year);
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
        getYearMin(state: State): number {
            return state.year_min
        },
        getYearMax(state: State): number {
            return state.year_max
        },
        getWandSelected(state: State): boolean {
            return state.wand_selected
        }
    }
}
