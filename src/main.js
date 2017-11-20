import React from "react";

import {render} from "react-dom";

//import {App} from "./app/App";
import Routes from "./app/Routes"

import store from "./app/store"

// Provider expose store as a context to connect containers
import {Provider} from "react-redux";

// bind VDOM to RDOM
// render => diffing, patching real doom
render(<Provider store={store}>
        <Routes/> 
        </Provider>, // virtual dom
        document.getElementById("root"));
