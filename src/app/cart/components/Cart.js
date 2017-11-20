
import React, {Component} from "react";
import PropTypes from "prop-types";

import CartList from "./CartList";
//import CartSummary from "./CartSummary";
import CartSummary from "../containers/CartSummary";

//stateless component
export default class Cart extends Component {
    constructor(props) {
        super(props);
    }
 
    //simulation
    addItem() {
        let id = 100 + Math.ceil(Math.random() * 100000);
        let item = {
            id: id,
            name: `Product ${id}`,
            price: Math.ceil(Math.random() * 1000),
            qty: 1
        }
        ///
        //this.props.onAddItem(item);
        this.props.actions.addItemToCart(item);
    }
  

    emptyCart() {
        //this.props.onEmptyCart();
        this.props.actions.emptyCart();
    }
    
    render() {
        
        console.log("Cart render");

        return (
            <div> 
            <h2>Cart</h2>

            <button onClick={() => this.addItem()}>
                Add
            </button>

            <button onClick={() => this.emptyCart()}>
                Empty
            </button>

           
            <CartList items={this.props.items}
            >
            </CartList>

            <CartSummary  >

            </CartSummary>
                      

            </div>
        )
    }
} 


Cart.defaultProps = {
    items: []
}

Cart.propTypes = {
    items: PropTypes.array,
    onAddItem: PropTypes.func,
    onEmptyCart: PropTypes.func

}