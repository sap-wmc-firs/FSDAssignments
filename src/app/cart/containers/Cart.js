import {connect} from "react-redux";
import Cart from "../components/Cart"
import {addItemToCart, emptyCart} from "../state/actions"

import {bindActionCreators} from "redux";
// import {addItemToCart, emptyCart} from "../state/actions";
import * as actions from "../state/actions";


// Pure function, 
// callback, 
// callback by container
// when => on subscribe
// state == store.getState() => {counter1....}
function mapReduxStateToReactProps(state) {
    return {
        // componet property
        items: state.cartItems
    }
}

//called by container
//dispatch => store.dispath

function mapReduxDispatchToReactProps(dispatch) {
    return {
        // component propert
        /*onAddItem: function(item) {
            let action = addItemToCart(item);
            dispatch(action);
        },

        /*onEmptyCart: function() {
            dispatch(emptyCart());
        },*/

        /*
        onAddItem: bindActionCreators(actions.addItemToCart,
            dispatch),
        
        onEmptyCart: bindActionCreators(actions.emptyCart,
                dispatch)
        */

        actions: bindActionCreators(actions,dispatch)
    }
}

// decorator function
let connectFn = connect(mapReduxStateToReactProps,mapReduxDispatchToReactProps);

// create container component
let CartComponentContainer = connectFn(Cart);

export default CartComponentContainer;
