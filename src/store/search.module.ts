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
        url: '',
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
        setDurationMax(state: State, duration_max: number) {
            state.duration_max = duration_max
        },
        setGenre(state: State, genre_selected: string) {
            state.genre_selected = genre_selected
        },
        setCountry(state: State, country_selected: string) {
            state.country_selected = country_selected
        },
        setRatingMin(state: State, rating_min: number) {
            state.rating_min = rating_min
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
            if (state.query = ''){
                commit('setUrl', 'https://api.themoviedb.org/3/discover/multi?api_key=9f772ff3aa5dfb8e963695d6c67ae338&include_adult=false&year=' + year);
            }
            else{
                commit('setUrl', 'https://api.themoviedb.org/3/discover/multi?api_key=9f772ff3aa5dfb8e963695d6c67ae338&include_adult=false&query=' + state.query + '&year=' + year);
            }
        },
        updateDuration({ commit, state }, duration: number) {
            commit('setDurationMax', duration);
            commit('setUrl', 'https://api.themoviedb.org/3/discover/multi?api_key=9f772ff3aa5dfb8e963695d6c67ae338&include_adult=false&query=' + state.query);
        },
        updateGenre({ commit, state }, genre: string) {
            commit('setGenre', genre);
            commit('setUrl', 'https://api.themoviedb.org/3/discover/multi?api_key=9f772ff3aa5dfb8e963695d6c67ae338&include_adult=false&query=' + state.query);
        },
        updateCountry({ commit, state }, country: string) {
            commit('setCountry', country);
            commit('setUrl', 'https://api.themoviedb.org/3/discover/multi?api_key=9f772ff3aa5dfb8e963695d6c67ae338&include_adult=false&query=' + state.query);
        },
        updateRating({ commit, state }, rating: number) {
            commit('setRatingMin', rating);
            commit('setUrl', 'https://api.themoviedb.org/3/discover/multi?api_key=9f772ff3aa5dfb8e963695d6c67ae338&include_adult=false&query=' + state.query);
        },

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
        getDurationMax(state: State): number {
            return state.duration_max
        },
        getGenre(state: State): string {
            return state.genre_selected
        },
        getCountry(state: State): string {
            return state.country_selected
        },
        getRatingMin(state: State): number {
            return state.rating_min
        },
        getWandSelected(state: State): boolean {
            return state.wand_selected
        }
    }
}
