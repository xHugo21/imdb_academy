import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue'

declare module '@vue/runtime-core' {
    interface State {
        color_mode: string
        url: string
        query: string
        year_min: number
        year_max: number
        duration_min: number
        duration_max: number
        genre_selected: string
        country_selected: string
        rating_min: number
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
        duration_min: 0,
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
        setDurationMin(state: State, duration_min: number) {
            state.duration_min = duration_min
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
        updateUrl({ commit }) {
            commit('setUrl', 'http://localhost:8080/?query=' + this.state.search.query + '&startYear=' + this.state.search.year_min + '&minMinutes=' + this.state.search.duration_min + '&genres=' + this.state.search.genre_selected + '&size=20&page=0')
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
        getDurationMin(state: State): number {
            return state.duration_min
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
