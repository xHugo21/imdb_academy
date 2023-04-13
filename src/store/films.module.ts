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
        saved_films: []
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

        async fetchTrendingDaily({ commit }) {
            let url =
                'https://api.themoviedb.org/3/trending/movie/day?api_key=9f772ff3aa5dfb8e963695d6c67ae338'

            // Catch errors when fetching url and display them
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                const data = await response.json()
                console.log(data);
                commit('setFilms', data.results)
            } catch (error) {
                console.log('NO MORE RESULTS TO DISPLAY')
            }
        },

        async fetchTrendingWeekly({ commit }) {
            let url =
                'https://api.themoviedb.org/3/trending/movie/week?api_key=9f772ff3aa5dfb8e963695d6c67ae338'

            // Catch errors when fetching url and display them
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                const data = await response.json()
                console.log(data);
                commit('setFilms', data.results)
            } catch (error) {
                console.log('NO MORE RESULTS TO DISPLAY')
            }
        },

        async fetchSearchBar({ commit, rootGetters }) {
            let url =
                rootGetters['search/getUrl']

            // Catch errors when fetching url and display them
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                const data = await response.json()
                console.log(data);
                commit('setPage', data.page)
                commit('setTotalPages', data.total_pages)
                commit('setTotalResults', data.total_results)
                commit('setFilms', data.results)
            } catch (error) {
                console.log('NO MORE RESULTS TO DISPLAY')
            }
        },

        async loadMoreResults({ commit, state, rootGetters }) {
            if (state.page < state.total_pages) {
                let url =
                    rootGetters['search/getUrl'] + '&page=' + (state.page + 1)
                try {
                    const response = await fetch(url)
                    if (!response.ok) {
                        throw Error(response.statusText)
                    }
                    const data = await response.json()
                    let aux = state.films;
                    aux = aux.concat(data.results)
                    commit('setPage', data.page)
                    commit('setFilms', aux)
                } catch (error) {
                    console.log('NO MORE RESULTS TO DISPLAY')
                }
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
        }
    }
}
