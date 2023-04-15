import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue'
import type { Film } from '@/types'

declare module '@vue/runtime-core' {
    interface State {
        films: Array<Film>,
        page: number,
        total_pages: number,
        total_results: number,
        saved_films: Array<Film>
        more_results: boolean
    }

    interface ComponentCustomProperties {
        $store: Store<State> | Store<Commit> | Store<Dispatch>
    }
}

export const films_module: Module<any, any> = {
    namespaced: true,
    state: {
        films: [],
        page: 0,
        total_pages: 0,
        total_results: 0,
        saved_films: [],
        more_results: true
    },
    mutations: {
        setFilms(state: State, films: Array<Film>) {
            state.films = films
        },
        setPage(state: State, page: number) {
            state.page = page
        },
        setTotalPages(state: State, total_pages: number) {
            state.total_pages = total_pages
        },
        setTotalResults(state: State, total_results: number) {
            state.total_results = total_results
        },
        setSavedFilms(state: State, films: Array<Film>) {
            state.saved_films = films
        },
        setMoreResults(state: State, more_results: boolean) {
            state.more_results = more_results
        }
    },
    actions: {
        // Saves film into saved_films
        saveFilm({ commit, state }, film: Film) {
            let films = state.saved_films
            films.push(film)
            commit('setSavedFilms', films)
        },
        // Removes film from saved_films
        removeFilm({ commit, state }, film: Film) {
            let films = state.saved_films
            films = films.filter((f: { id: number }) => f.id !== film.id)
            commit('setSavedFilms', films)
        },

        async fetchFilms({ commit, rootGetters }, type: string = '') {
            // Set more_results to true
            commit('setMoreResults', true)

            // Get url depending on type of fetch
            let url:string = rootGetters['search/getUrl'];
            if (type === 'trending_daily'){
                url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=9f772ff3aa5dfb8e963695d6c67ae338';
            }
            else if (type === 'trending_weekly'){
                url = 'https://api.themoviedb.org/3/trending/movie/week?api_key=9f772ff3aa5dfb8e963695d6c67ae338';
            }

            // Fetch films from url
            const response = await fetch(url)
            const data = await response.json()

            // Save films and data inside state
            console.log(data);
            commit('setPage', data.page)
            commit('setTotalPages', data.total_pages)
            commit('setTotalResults', data.total_results)
            commit('setFilms', data.results)
        },

        

        async loadMoreResults({ commit, state, rootGetters }) {
            // Only load more results if we aren't in the last page
            if (state.page < state.total_pages) {
                // Set url with page number
                let url = rootGetters['search/getUrl'] + '&page=' + (state.page + 1)

                // Fetch films from url
                const response = await fetch(url)
                const data = await response.json()
                
                // Save films and data inside state
                console.log(data.results)
                let aux:Array<Film> = state.films;
                aux = aux.concat(data.results)
                commit('setPage', data.page)
                commit('setFilms', aux)
            }
            else {
                commit('setMoreResults', false)
            }


        }
    },
    getters: {
        getFilms(state: State): Array<Film> {
            return state.films
        },
        getPage(state: State): number {
            return state.page
        },
        getTotalPages(state: State): number {
            return state.total_pages
        },
        getTotalResults(state: State): number {
            return state.total_results
        },
        getSavedFilms(state: State): Array<Film> {
            return state.saved_films
        },
        getMoreResults(state: State): boolean {
            return state.more_results
        }
    }
}
