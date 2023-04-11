import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue'
import type { Film } from '@/types'

declare module '@vue/runtime-core' {
    interface State {
        films: Array<Film>,
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
        films: [
            /*{
                id: 1,
                name: 'A New Hope',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            },
            {
                id: 2,
                name: 'The Empire Strikes Back',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            },
            {
                id: 3,
                name: 'Return of the Jedi',
                image: 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg'
            },
            {
                id: 4,
                name: 'The Phantom Menace',
                image: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg'
            },
            {
                id: 5,
                name: 'Attack of the Clones',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            },
            {
                id: 6,
                name: 'Revenge of the Sith',
                image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg'
            },
            {
                id: 7,
                name: 'The Force Awakens',
                image: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg'
            },
            {
                id: 8,
                name: 'The Last Jedi',
                image: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg'
            },
            {
                id: 9,
                name: 'The Rise of Skywalker',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            },
            {
                id: 10,
                name: 'A New Hope',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            },
            {
                id: 11,
                name: 'The Empire Strikes Back',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            },
            {
                id: 12,
                name: 'Return of the Jedi',
                image: 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg'
            },
            {
                id: 13,
                name: 'The Phantom Menace',
                image: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg'
            },
            {
                id: 14,
                name: 'Attack of the Clones',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            },
            {
                id: 15,
                name: 'Revenge of the Sith',
                image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg'
            },
            {
                id: 16,
                name: 'The Force Awakens',
                image: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg'
            },
            {
                id: 17,
                name: 'The Last Jedi',
                image: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg'
            },
            {
                id: 18,
                name: 'The Rise of Skywalker',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            },
            {
                id: 19,
                name: 'A New Hope',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            },
            {
                id: 20,
                name: 'The Empire Strikes Back',
                image: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg'
            }*/
        ],
        total_results: 0,
        saved_films: []
    },
    mutations: {
        setFilms(state: State, films: Array<Film>) {
            state.films = films
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
        
        async fetchTrending({ commit }) {
            let url =
                'https://api.themoviedb.org/3/trending/movie/day?api_key=9f772ff3aa5dfb8e963695d6c67ae338'

            // Catch errors when fetching url and display them
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                const data = await response.json()
                commit('setFilms', data.results)
            } catch (error) {
                console.log('NO MORE RESULTS TO DISPLAY')
            }
        },

        async fetchSearchBar({ commit, rootGetters }) {
            let url = "https://api.themoviedb.org/3/search/movie?api_key=9f772ff3aa5dfb8e963695d6c67ae338&query=" + rootGetters['search/getQuery'];

            // Catch errors when fetching url and display them
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                const data = await response.json()
                commit('setTotalResults', data.total_results);
                commit('setFilms', data.results)
            } catch (error) {
                console.log('NO MORE RESULTS TO DISPLAY')
            }
        }
    },
    getters: {
        getFilms(state: State): Array<Film> {
            return state.films
        },
        getTotalResults(state: State): number {
            return state.total_results
        },
        getSavedFilms(state: State): Array<Film> {
            return state.saved_films
        }
    }
}
