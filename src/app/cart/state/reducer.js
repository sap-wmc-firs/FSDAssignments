import * as ActionTypes from "./ActionTypes";

export default function cartReducer(state=[], action) {
    switch(action.type) {
        case ActionTypes.ADD_ITEM_TO_CART :
            return [...state, action.payload.item];
        
        case ActionTypes.EMPTY_CART :
            return [];
        
        case ActionTypes.REMOVE_ITEM_FROM_CART: 
            return state.filter(item => item.id != action.payload.id)

        case ActionTypes.UPDATE_ITEM_IN_CART: {
            return state.map( item => {
                if (item.id != action.payload.id) 
                    return item;
                
                return Object.assign({}, item, {qty: action.payload.qty});
            })
        }
        default:
            return state;
    }
}
