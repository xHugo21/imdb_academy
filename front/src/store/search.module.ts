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
        media_type: 'movie',
        rating_min: 0,
        wand_selected: false
    },
    mutations: {
        setColorMode(state: State, color_mode: string):void {
            state.color_mode = color_mode
        },
        setUrl(state: State, url: string):void {
            state.url = url
        },
        setQuery(state: State, query: string):void {
            state.query = query
        },
        setYearMin(state: State, year_min: number):void {
            state.year_min = year_min
        },
        setYearMax(state: State, year_max: number):void {
            state.year_max = year_max
        },
        setDurationMin(state: State, duration_min: number):void {
            state.duration_min = duration_min
        },
        setDurationMax(state: State, duration_max: number):void {
            state.duration_max = duration_max
        },
        setGenre(state: State, genre_selected: string):void {
            state.genre_selected = genre_selected
        },
        setMediaType(state: State, media_type: string):void {
            state.media_type = media_type
        },
        setRatingMin(state: State, rating_min: number):void {
            state.rating_min = rating_min
        },
        setWandSelected(state: State, wand_selected: boolean):void {
            state.wand_selected = wand_selected
        }
    },
    actions: {
        // Updates url with current search parameters previously saved inside search store module
        updateUrl({ commit, state }):void {
            commit(
                'setUrl',
                'http://localhost:8080/?query=' +
                    state.query +
                    '&titleType=' +
                    state.media_type +
                    '&startYear=' +
                    state.year_min +
                    '&endYear=' +
                    state.year_max +
                    '&minMinutes=' +
                    state.duration_min +
                    '&maxMinutes=' +
                    state.duration_max +
                    '&minRating=' +
                    state.rating_min +
                    '&maxRating=10' +
                    '&genres=' +
                    state.genre_selected +
                    '&size=20'
            )

            console.log(state.url)
        },

        // Calls similar endpoint passing tconst parameter to get similar films and deselects wand
        updateWandSelection({ commit }, tconst:string):void {
            commit('setUrl', 'http://localhost:8080/similar?tconst=' + tconst + '&size=20')    
            commit('setWandSelected', false)        
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
