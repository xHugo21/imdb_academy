import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue'
import type { Film } from '@/types'

declare module '@vue/runtime-core' {
    interface State {
        films: Array<Film>
        page: number
        total_pages: number
        total_results: number
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
        setFilms(state: State, films: Array<Film>):void {
            state.films = films
        },
        setPage(state: State, page: number):void {
            state.page = page
        },
        setTotalPages(state: State, total_pages: number):void {
            state.total_pages = total_pages
        },
        setTotalResults(state: State, total_results: number):void {
            state.total_results = total_results
        },
        setSavedFilms(state: State, films: Array<Film>):void {
            state.saved_films = films
        },
        setMoreResults(state: State, more_results: boolean):void {
            state.more_results = more_results
        }
    },
    actions: {
        // Saves film into saved_films
        saveFilm({ commit, state }, film: Film):void {
            let films = state.saved_films
            films.push(film)
            commit('setSavedFilms', films)
        },

        // Removes film from saved_films
        removeFilm({ commit, state }, film: Film):void {
            let films = state.saved_films
            films = films.filter((f: { id: string }) => f.id !== film.id)
            commit('setSavedFilms', films)
        },

        // Fetches films from backend API
        async fetchFilms({ commit, dispatch, rootGetters }, type: string = 'search'):Promise<void> {
            // Set more_results to true
            commit('setMoreResults', true)

            // Get url depending on type of fetch
            let url: string = rootGetters['search/getUrl'] + '&page=0'
            if (type === 'top_rated_movies') {
                url = 'http://localhost:8080/trending?size=20&page=0&minNumVotes=100000&titleType=movie'
            } else if (type === 'top_rated_tv') {
                url = 'http://localhost:8080/trending?size=20&page=0&minNumVotes=200000&titleType=tvSeries'
            }

            // Fetch films from url
            const response = await fetch(url)
            const data = await response.json()

            console.log(data)
            // Change state only if fetch returns films
            if (data.message === undefined) {
                // Save page, total results and films inside state
                commit('setPage', 0)
                commit('setTotalResults', data.total)
                commit('setFilms', data.hits)

                // Fetch available posters overviews and trailers from TMDB API
                await dispatch('fetchAditionalTMDB')
            }
        },

        // Searches TMDB API for available posters, overviews and trailers
        async fetchAditionalTMDB({ rootGetters }: any):Promise<void> {
            // Get number of films in state
            const n_films = rootGetters['films/getFilms'].length
            const films = rootGetters['films/getFilms']
            let i = 0;

            // If there are films in the state, fetch each film's poster and overviews from TMDB API
            if (rootGetters['films/getFilms']) {
                if (n_films > 20){
                    i = n_films-20;
                }
                for (i; i < n_films; i++) {
                    let url =
                        'https://api.themoviedb.org/3/find/' +
                        films[i].id +
                        '?api_key=9f772ff3aa5dfb8e963695d6c67ae338&language=en-US&external_source=imdb_id'

                    await fetch(url)
                        .then((response) => response.json())
                        .then(async (data) => {
                            // Get movie results
                            var type;
                            if (data.movie_results.length) {
                                data = data.movie_results[0];
                                type = 'movie'
                            } else if (data.tv_results.length) {
                                data = data.tv_results[0];
                                type = 'tv'
                            }

                            // Update film's poster and overview

                            films[i].posterPath = data.poster_path

                            if (data.overview) {
                                films[i].overview = data.overview
                            }
                            
                            
                            // Get trailer
                            if (data.id !== undefined) {
                                await fetch(
                                    'https://api.themoviedb.org/3/' + type + '/' +
                                        data.id +
                                        '/videos?api_key=9f772ff3aa5dfb8e963695d6c67ae338&language=en-US' +
                                        data.id
                                )
                                    .then((response) => response.json())
                                    .then((data) => {
                                        if (data.results.length !== 0) {
                                            for (let i = 0; i < data.results.length; i++) {
                                                if (
                                                    data.results[i].site.toLowerCase() === 'youtube'
                                                ) {
                                                    if (
                                                        data.results[i].name
                                                            .toLowerCase()
                                                            .includes('trailer')
                                                    ) {
                                                        films[i].trailer =
                                                            'https://www.youtube.com/embed/' +
                                                            data.results[i].key
                                                        break
                                                    } else {
                                                        films[i].trailer =
                                                            'https://www.youtube.com/embed/' +
                                                            data.results[0].key
                                                    }
                                                }
                                            }
                                        }
                                    })
                                    .catch((error) => {})
                            }
                        })
                        .catch((error) => {})
                }
            }
        },

        // Loads more results from backend API
        async loadMoreResults({ commit, dispatch, state, rootGetters }):Promise<void> {
            // Set url with desired page number
            let url = rootGetters['search/getUrl'] + '&page=' + (state.page + 1)

            // Fetch films from url
            const response = await fetch(url)
            const data = await response.json()

            if (data.message === undefined){
                // Save page number and films inside state
                let aux: Array<Film> = state.films
                aux = aux.concat(data.hits)
                commit('setPage', state.page + 1)
                commit('setFilms', aux)

                // Fetch posters, overviews and trailers from TMDB API
                await dispatch('fetchAditionalTMDB')
            }
            else{
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
