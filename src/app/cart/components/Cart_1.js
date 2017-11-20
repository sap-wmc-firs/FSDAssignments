
import React, {Component} from "react";
import PropTypes from "prop-types";

import CartList from "./CartList";
import CartSummary from "./CartSummary";

export default class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [{id: 1, name: "Product 1", price: 100, qty: 1}],
            count: 0,
            amount: 0,
            flag: true //dummy
        }

        // bound method
        this.removeItem = this.removeItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    componentWillMount() {
        console.log("*** componentWillMount **");
        this.reCalculate(this.state.items);
    }

    addItem() {
        let id = 100 + Math.ceil(Math.random() * 100000);
        let item = {
            id: id,
            name: `Product ${id}`,
            price: Math.ceil(Math.random() * 1000),
            qty: 1
        }

        let newItems = [...this.state.items, item];
        this.setState({
            items: newItems
        })

        this.reCalculate(newItems);
    }

    reCalculate(items) {
        console.log("recalc called.");
        let count = 0;
        let amount = 0;

        for(let item of items) {
            count += item.qty;
            amount += item.qty * item.price;
        }

        // es6 syntax
        this.setState({
            count,
            amount
        })
    }

    //called by grand child
    removeItem(id) {
        console.log("Remove item called.");
        let newItems = this.state.items.filter(item => item.id != id);
        this.setState({
            items: newItems
        })
        this.reCalculate(newItems);
    }

    //called by grand child
    updateItem(id, qty) {
        
    }

    emptyCart() {

    }

    //dummy
    refresh() {
        this.setState({
            flag: true
        })
    }
    
    componentDidMount() {
        
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

            <button onClick={() => this.refresh()}>
                Refresh
            </button>

            <CartList items={this.state.items} 
                onRemove={ (id) => this.removeItem(id)}  
                onUpdate={ (id,qty) => this.updateItem(id,qty)}></CartList>
            
            <CartSummary count={this.state.count}
                amount={this.state.amount}>
            </CartSummary>       

            </div>
        )
    }
} 


Cart.defaultProps = {
    
}

Cart.propTypes = {
    
}