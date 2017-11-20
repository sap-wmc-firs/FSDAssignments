import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

function counterReducer(state=0, action) {
    console.log("counter reducer", state, action);
    switch(action.type) {
        case "INCREMENT":
            return state + action.payload.value;
        case "DECREMENT":
            return state - action.payload.value;
        case "RESET":
            return 0;
        default:
            return state;
    }
}

function loggerMiddleware(store) {
    return function(next) {
        return function(action) {
            console.log("Logger", action);
            let result = next(action);
            return result;
        }
    }
}

import cartReducer from "./cart/state/reducer";
import productReducer from "./cart/state/productReducer";

let rootReducer = combineReducers({
    // key: reducer function
    counter: counterReducer,
    cartItems: cartReducer,
    productState: productReducer
})

let store = createStore(rootReducer,
                        applyMiddleware(loggerMiddleware, thunk));
export default store;

// 

console.log("Initial state", store.getState());
store.subscribe(function callback() {
    console.log("Subscribe..");
})

import {incrementAction} from "./actions";

// Action is an object
let actionIncr = {
    type: "INCREMENT",
    payload: {
        value: 1
    }
}

let actionDecr = {
    type: "DECREMENT",
    payload: {
        value: 1
    }
}

let actionReset = {
    type: "RESET",
    payload: {
        value: 1
    }
}

// call reducer
store.dispatch(actionIncr);
store.dispatch(incrementAction(10));
console.log("State", store.getState());
store.dispatch(actionReset);
console.log("State", store.getState());
store.dispatch(actionDecr);
store.dispatch(actionDecr);
store.dispatch(actionDecr);
console.log("State", store.getState());
store.dispatch(actionIncr);
console.log("State", store.getState());
