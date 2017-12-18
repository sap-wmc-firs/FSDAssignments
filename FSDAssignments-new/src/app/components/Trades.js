import React, {Component} from "react";
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import Search from "../trade/components/Search";
import TradeList from "../trade/components/TradeList";
import CreateTrade from "../trade/components/CreateTrade";
import EditTrade from "../trade/components/EditTrade";
import ShowTrade from "../trade/components/ShowTrade";

export default class Trades extends Component{

    constructor(props){
        super(props);

        this.state = {
            id: 1,
            rightPanel : this.props.rightPanel
        }
    }

    createTrade = () => {
        let id  = this.state.id;
        id++;
        let rightPanel;
        if(id === 1)
            rightPanel = 'createTrade';
        else
            rightPanel = 'showTrade'
        this.setState(
            {
                id,
                rightPanel
            }
        );
        
    }

    render(){
        const showRightPanel = this.state.rightPanel;
        return (
            <div>
                <Search />
                <TradeList />
                <Button fab color="primary" aria-label="add" onClick={ this.createTrade }>
                    <AddIcon />
                </Button>
                
                {showRightPanel === 'showTrade' && <ShowTrade />}
                {showRightPanel === 'createTrade' && <CreateTrade />}
                {showRightPanel === 'editTrade' && <EditTrade />}
            </div>
        );
        
    }
}

Trades.defaultProps = {
    rightPanel : 'none'
    
}

Trades.propTypes = {
    
}