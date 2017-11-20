
import React from "react";
import PropTypes from "prop-types";

export default function Like(props) { 
    //deconstruct
    let {likes, onIncr} = props;

    return (
        <div> 
        <h2>Like: {likes} </h2>

        <button onClick={onIncr}>
            +1
        </button>
        
        </div>
    )
} 


Like.defaultProps = {

}

Like.propTypes = {
    likes: PropTypes.number.isRequired,
    onIncr: PropTypes.func.isRequired
}