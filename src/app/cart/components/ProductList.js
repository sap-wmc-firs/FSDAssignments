
import React, {Component} from "react";
import PropTypes from "prop-types";

// NOT a component
import Loading from "./Loading.jsx";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        // dispatch an action that contains a function
        this.props.actions.fetchProducts();
    }
    
    render() {
        let {products,loading} = this.props;
        if(loading) {
            return (
                <div>
                    {Loading}
                </div>
            )
        }
        return (
            <div> 
            <h2>ProductList</h2>
                <ul>
                    {  
                    products.map( product => (
                        <li key={product.id}>
                            {product.name} ~ {product.price} ~ {product.released} 
                        </li>
                    ))
                    }
                 </ul>
            </div>
        )
    }
} 


ProductList.defaultProps = {
    
}

ProductList.propTypes = {
    
}