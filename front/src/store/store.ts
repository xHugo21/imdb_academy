import { createStore, Store } from 'vuex'

import { search_module } from './search.module'
import { films_module } from './films.module'

export const store: Store<any> = createStore({
    modules: {
        search: search_module,
        films: films_module
    }
})
