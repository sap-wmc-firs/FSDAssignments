
import React, {Component} from "react";
import PropTypes from "prop-types";

export default class CartSummary extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        console.log("summary rcv next props", nextProps);
        console.log("summary rcv current props", this.props);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("Cart sumary should update");
        // return true, call render else no render call
        return nextProps.count != this.props.count || nextProps.amount != this.props.amount;
    }
    
    render() {
        console.log("CartSummary render");
        let {count, amount} = this.props;

        return (

            <div> 
            <h2>Cart Summary</h2>

            <p> Count: {count} </p>
            <p> Amount: {amount} </p>
            
            </div>
        )
    }
} 


CartSummary.defaultProps = {
    
}

CartSummary.propTypes = {
    count: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
}