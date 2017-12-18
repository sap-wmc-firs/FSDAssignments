import * as ActionTypes from './ActionTypes';

const INITIAL_STATE = {
    rightPanel : 'none'
};

export default function tradeReducer(state = INITIAL_STATE, action){
    console.log("TradeReducer called: ", state, action);

    switch(action.types){
        
        case ActionTypes.LOADING: {
            return Object.assign({}, state, {loading: action.payload.loading})
        }

        case ActionTypes.INIT_ERROR: {
            return Object.assign({}, state, {error: action.payload.error})
        }

        case ActionTypes.INIT_TRADES: {
            return Object.assign({}, state, {trades: action.payload.trades})
        }

        case ActionTypes.SHOW_RIGHT_PANEL: {
            return Object.assign({}, state, {rightPanel: action.payload.panelName})
        }

        case ActionTypes.CREATE_TRADE: {

            let trade = state.find(trade => trade.id == action.payload.trade.id);
            if(!trade)
                return [...state, action.payload.trade]
        }

        case ActionTypes.EDIT_TRADE: {
            return state.map(trade => {
                if(trade.id != action.payload.trade.id)
                    return trade;

                return Object.assign({}, trade, 
                    {qty: action.payload.trade.qty,
                        price: action.payload.trade.price,
                        commodity: action.payload.trade.commodity,
                        side: action.payload.trade.side,
                        tradeDate: action.payload.trade.tradeDate,
                        counterParty: action.payload.trade.counterParty,
                        location: action.payload.trade.location
                    });
            })
        }

        case ActionTypes.DELETE_TRADE: {
            return state.filter(trade => trade.id != action.payload.id);
        }

        default:
            return state;
    }
}