
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import CartSummary from "../components/CartSummary";
import * as actions from "../state/actions";

const mapStateToProps = (state) => {

    let count = 0;
    let amount = 0;
    for (let item of state.cartItems) {
        count += item.qty;
        amount += item.qty * item.price
    }

    return {
         count: count,
         amount: amount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, 
                    mapDispatchToProps) (CartSummary)