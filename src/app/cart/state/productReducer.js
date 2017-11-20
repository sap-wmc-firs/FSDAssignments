import * as ActionTypes from "./ActionTypes";

const INITIAL_STATE = {
    loading: false,
    products: []
}

export default function productReducer(state = INITIAL_STATE,
                                      action) {
    switch(action.type) {
        case ActionTypes.INIT_LOADING:
            return Object.assign({}, state, {loading: action.payload.loading})
        
        case ActionTypes.INIT_PRODUCTS:
            return Object.assign({}, state, {products: action.payload.products})
        default: 
            return state;
    }

}

