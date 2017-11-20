import * as ActionTypes from "./ActionTypes";

// Action creators

export function addItemToCart(item) {
    return {
        type: ActionTypes.ADD_ITEM_TO_CART,
        payload: {
            item: {
                id: item.id,
                name: item.name,
                price: item.price,
                qty: item.qty | 1
            }
        }
    }
}

export const updateItemInCart = (id, qty) => {
    return {
        type: ActionTypes.UPDATE_ITEM_IN_CART,
        payload: {
            id: id,
            qty: qty
        }
    }
}

export const removeItemFromCart = (id) => {
    return {
     type: ActionTypes.REMOVE_ITEM_FROM_CART,
     payload: {
         id: id
     }
 }
}

export function emptyCart() {
    return {
        type: ActionTypes.EMPTY_CART
    }
}

export const initProducts = (products) => {
    return {
     type: ActionTypes.INIT_PRODUCTS,
     payload: {
        products: products
     }
 }
}

export const initLoading = (loading) => {
    return {
     type: ActionTypes.INIT_LOADING,
     payload: {
        loading: loading
     }
 }
}

function fetchJson(url) {
    return fetch(url)
    .then(response => {
        console.log(response);
        // parse json serialzed text to JSON onj
        return response.json();
    })
}

// action creator function
// return a function instead of objects
export function fetchProducts() {
    // this function called by thung middleware
    return function(dispatch) {
        console.log("inside fetchproducts");
        
        dispatch(initLoading(true));

        fetchJson("http://localhost:7070/delayed/api/products")
        .then(products => {
            let action = initProducts(products);
            dispatch(action);
            dispatch(initLoading(false));
        })
    }
}
