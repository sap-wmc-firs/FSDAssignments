import React from "react";
import Cart from "./cart/components/Cart";

import Footer from "./components/Footer";
import Header from "./components/Header";

export class App extends React.Component {

    // return a virtual DOM
    render() {
        // JSX
        return (
            <div>
                <Header/>
                
                {/*View container*/}
                <div>
                    {this.props.children}
                </div>
                
                <Footer year={2017}>
                    <p>Footer paragraph</p>
                </Footer>
            </div>
        )
    }
}