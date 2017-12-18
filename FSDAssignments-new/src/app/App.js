import React, {Component} from "react";
import PropTypes from "prop-types";

import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/footer";

export default class App extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
        <div>
            <Header />
            <Home />
            <Footer />
        </div>
        );
    }
}

App.defaultProps = {
    
}

App.propTypes = {
    
}