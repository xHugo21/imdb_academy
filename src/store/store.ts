import { createStore, Store } from 'vuex'

import { search_module } from './search_module'
import { films_module } from './films_module'

export const store:Store<any>  = createStore({
    modules: {
      search: search_module,
      films: films_module,
    }
  })