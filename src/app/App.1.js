import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";

import Cart from "./cart/components/Cart";

export class App extends React.Component {

    // return a virtual DOM
    render() {
        // JSX
        return (
            <div>
                <h2>React App 2</h2>
                <Header title="React App"/>

                <Cart/>

                <Home/>
                <About/>

                <Footer year={2017} />
            </div>
        )
    }
}