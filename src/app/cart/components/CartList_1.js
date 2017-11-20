
import React, {Component} from "react";
import PropTypes from "prop-types";

import CartItem from "./CartItem";

export default class CartList extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        console.log("### cart list rcv next props", nextProps);
        console.log("### cart list rcv current props", this.props);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("### Cart list should update");
        // return true, call render else no render call
        return this.props.items.length != nextProps.items.length;
    }
    
    render() {

        console.log("Cartlist render");
        
        let {items} = this.props;

        return (
             <div>
              <table>
                  <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>

                    {
                        items.map ( item => (
                            <CartItem item={item} 
                                key={item.id} 
                                onRemove={this.props.onRemove}
                                onUpdate={this.props.onUpdate}></CartItem>
                        ))
                    }

                 </tbody>
              </table>
            </div>
        )
    }
} 


CartList.defaultProps = {
    
}

CartList.propTypes = {
    items: PropTypes.array,

    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
}