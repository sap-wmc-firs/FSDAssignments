import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

export default function Navigation(props){
    return (
        <div>
            <NavLink to="/trades">Trades</NavLink>
            <NavLink to="/transfers">Transfers</NavLink>
            <NavLink to="/transports">Transports</NavLink>

        </div>
    )
    
}

Navigation.defaultProps = {}

Navigation.PropTypes = {}