import type { Store, Commit, Dispatch, Module } from 'vuex'
import type { State } from 'vue'

declare module '@vue/runtime-core' {
    interface State {
        query: string,
        wand_selected: boolean
    }

    interface ComponentCustomProperties {
        $store: Store<State> | Store<Commit> | Store<Dispatch>
    }
}

export const search_module: Module<any, any> = {
    namespaced: true,
    state: {
        query: '',
        wand_selected: false
    },
    mutations: {
        setQuery(state: State, query: string) {
            state.query = query
        },
        setWandSelected(state: State, wand_selected: boolean) {
            state.wand_selected = wand_selected
        }
    },
    actions: {},
    getters: {
        getQuery(state: State):string {
            return state.query
        },
        getWandSelected(state: State):boolean {
            return state.wand_selected
        }
    }
}
