import React, {Component} from "react";
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import Search from "./Search";
import TradeList from "./TradeList";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as actions from "../state/actions";


class Trades extends Component{

    constructor(props){
        super(props);
        this.state = {
            socket : null
        }
    }
    
    componentWillReceiveProps(nextprops){
        console.log(nextprops.trades);
    }

    componentDidMount() {
        
        const data = [
            {
              "tradeId": 1001,
              "tradeDate": "03-23-2017",
              "commodityId": 1,
              "commodity": "AL",
              "side": "Buy",
              "qty": 100,
              "price": "$1,860.75",
              "counterPartyId": 101,
              "counterParty": "Lorem",
              "locationId": 10,
              "location": "SG"
            },
            {
              "tradeId": 1002,
              "tradeDate": "03-23-2017",
              "commodityId": 2,
              "commodity": "ZN",
              "side": "Sell",
              "qty": 50,
              "price": "$1,860.75",
              "counterPartyId": 102,
              "counterParty": "Dolor",
              "locationId": 20,
              "location": "LN"
            },
            {
              "tradeId": 1003,
              "tradeDate": "03-23-2017",
              "commodityId": 3,
              "commodity": "CU",
              "side": "Sell",
              "qty": 200,
              "price": "$1,860.75",
              "counterPartyId": 103,
              "counterParty": "Ipsum",
              "locationId": 30,
              "location": "NY"
            },
            {
              "tradeId": 1004,
              "tradeDate": "03-23-2017",
              "commodityId": 4,
              "commodity": "AU",
              "side": "Buy",
              "qty": 150,
              "price": "$1,860.75",
              "counterPartyId": 104,
              "counterParty": "Amet",
              "locationId": 40,
              "location": "DN"
            },
            {
              "tradeId": 1005,
              "tradeDate": "03-23-2017",
              "commodityId": 5,
              "commodity": "AG",
              "side": "Sell",
              "qty": 300,
              "price": "$1,860.75",
              "counterPartyId": 102,
              "counterParty": "Dolor",
              "locationId": 10,
              "location": "SG"
            }
          ];
        
        this.state.socket = io.connect( 'http://localhost:3030/' );

        // listen to messages on socket
        // built-in message
        this.state.socket.on( 'connect', () => {
            this.state.socket.emit( 'join channel', 'tradeAdded', function( confirmation ) {
                console.log( confirmation );
            } );
        } );
        this.state.socket.on( 'connect_error', () => {
                alert( "There seems to be an issue with Data Notification Service! Please contact #FIIDS" );
        } );
        this.state.socket.on( 'trade added', ( socketData ) => {
            var respData = JSON.parse(socketData);
               if(respData.length > 0){
                   respData.forEach(item =>{
                       data.push(item);
                   });
                   this.props.actions.initTrades(data);
               }
        } );

        
          this.props.actions.initTrades(data);
        //this.props.actions.fetchTradesAsync();
      }

    showRightPanel (panelName){
        this.props.actions.showRightPanel(panelName);
    }
    setSelected(tradeObj){
        this.props.actions.setSelected(tradeObj);
    }


    render(){
        const {rightPanel, selected, trades} = this.props;
        return (
            <div>
                <Search />
                <TradeList 
                    rightPanel = {this.props.rightPanel}
                    selected = {this.props.selected}
                    setSelected = {(tradeObj) => this.setSelected(tradeObj)}
                    trades = {this.props.trades}
                    showRightPanel = {(panelName) => this.showRightPanel(panelName)}
                ></TradeList>
            </div>
        );
        
    }
}

Trades.defaultProps = {
    rightPanel: 'none',
    selected: {},
    trades: [],
    loading: false,
    error: false,
    errorMessage: ''
}

Trades.propTypes = {
    
}