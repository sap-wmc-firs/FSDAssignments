
import React, {PureComponent} from "react";
import PropTypes from "prop-types";

//import CartItem from "./CartItem";
import CartItem from "../containers/CartItem";

export default class CartList extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }
 
    
    render() {
        
        console.log("CartList render");
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
                            >
                            </CartItem>
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
    items: PropTypes.array
}