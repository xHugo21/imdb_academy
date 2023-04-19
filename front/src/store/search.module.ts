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
        media_type: string
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
        media_type: '',
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
        setMediaType(state: State, media_type: string) {
            state.media_type = media_type
        },
        setRatingMin(state: State, rating_min: number) {
            state.rating_min = rating_min
        },
        setWandSelected(state: State, wand_selected: boolean) {
            state.wand_selected = wand_selected
        }
    },
    actions: {
        // Updates url with current search parameters previously saved inside search store module
        updateUrl({ commit }) {
            commit('setUrl', 'http://localhost:8080/?query=' + this.state.search.query + '&startYear=' + this.state.search.year_min + '&minMinutes=' + this.state.search.duration_min + '&genres=' + this.state.search.genre_selected + '&size=20')
        },

        // Updates all parameters considered for wand search mode
        updateWandSelection({ commit }, film) {
            commit('setYearMin', film.startYear)   
            commit('setYearMax', film.startYear)
            commit('setDurationMin', film.runtimeMinutes)
            commit('setDurationMax', film.runtimeMinutes)
            commit('setGenre', film.genres)       
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
        getMediaType(state: State): string {
            return state.media_type
        },
        getRatingMin(state: State): number {
            return state.rating_min
        },
        getWandSelected(state: State): boolean {
            return state.wand_selected
        }
    }
}
