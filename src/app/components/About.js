
import React, {Component} from "react";
import PropTypes from "prop-types";

import Like from "./Like";
import store from "../store"

export default class About extends Component {
    constructor(props) {
        super(props);

        // state is a keyword
        this.state = {
            name: '',
            members: ['Member 1', "Member 1"],
            showList: true,
            aboutLikes: 1000
        }
    }
    
    componentDidMount() {
        
    }

    addMember() {
        //this.state.members.push("Member "+Math.random());
        //this.forceUpdate();
    }

    showHide() {
        console.log("showList before ", this.state.showList);
        
        this.setState(
            {
                showList: !this.state.showList
            }, () => {
                console.log("set state callback");
                console.log("showList callback", this.state.showList);
            }
        )

        this.setState({
            flag: true
        })

        this.setState({
            flag: !this.state.flag
        })

        console.log("showList after ", this.state.showList);
    }

    increment() {
        this.setState({
            aboutLikes: this.state.aboutLikes + 1
        });

        let actionIncr = {
            type: "INCREMENT",
            payload: {
                value: 1
            }
        }

        store.dispatch(actionIncr);
    }
    
    render() {
        console.log("Another render..");
        return (
            <div> 
            <h2>About</h2>
            <Like likes={this.state.aboutLikes} onIncr={() => this.increment()}></Like>

            <button onClick={() => this.showHide()}>
                {this.state.showList ? "Hide" : "Show"}
            </button>

            <button onClick={() => this.addMember()}>Add</button>

            { this.state.showList && 
            <ul>
                    {this.state.members.map ( (m, i) => <li key={i}> {m} </li>)}
            </ul>
            }
            </div>
        )
    }
} 


About.defaultProps = {
    
}

About.propTypes = {
    
}