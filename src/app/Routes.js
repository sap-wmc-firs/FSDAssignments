import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import {App} from "./App";


import NotFound from "./components/NotFound";
import Home from "./components/Home";
import About from "./components/About";
//import Cart from "./cart/components/Cart";
import Cart from "./cart/containers/Cart";

import ProductList from "./cart/containers/ProductList";

export default function Routes(props) {
    return (
        <Router>
                <App>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/products" component={ProductList} />
                            <Route path="/cart" component={Cart} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                </App>
        </Router>
    )
}
