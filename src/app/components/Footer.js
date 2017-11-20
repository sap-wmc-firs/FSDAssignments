import React from "react";
import PropTypes from "prop-types";

export default function Footer(props) {
         return (
            <div>
                <hr/>
                Copyrights @{props.year}, {props.company}
                {props.children}
            </div>
        )
 }

 Footer.PropTypes = {
     year: PropTypes.number.isRequired,
     company: PropTypes.string
 }

 Footer.defaultProps = {
     company: "Product App"
 }