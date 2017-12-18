import React, {Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actions from "../state/actions";

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

/*   let id = 0;
  function createData(tradeDate, commodity, side, qty, price, counterParty, location) {
    id += 1;
    return { id, tradeDate, commodity, side, qty, price, counterParty, location };
  }
  
  const data = [
    createData('23-03-2017', 'AL', 'Buy', 100, '$1,860.75', 'Loren', 'BA'),
    createData('23-03-2017', 'AL', 'Sell', 50, '$1,860.75', 'Dolor', 'LON'),
    createData('23-03-2017', 'AL', 'Buy', 100, '$1,860.75', 'Amet', 'NYC'),
    createData('23-03-2017', 'AL', 'Buy', 200, '$1,860.75', 'Sit', 'TOK'),
    createData('23-03-2017', 'AL', 'Sell', 100, '$1,860.75', 'Ipsum', 'DUB'),
    createData('23-03-2017', 'AL', 'Buy', 50, '$1,860.75', 'Consectitor', 'NOR'),
    createData('23-03-2017', 'AL', 'Sell', 75, '$1,860.75', 'Loren', 'HON'),
    createData('23-03-2017', 'AL', 'Buy', 100, '$1,860.75', 'amet', 'BA'),
    createData('23-03-2017', 'AL', 'Sell', 110, '$1,860.75', 'Dolor', 'Lon')
  ]; */

/*   const createTrade = () => {
    const rightPanel = 'createTrade';
    this.setState(
        {
            rightPanel
        }
    );
  }; */

  /*  const handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  }; */

  class TradeList extends Component {

    constructor(props){
      super(props);
      this.classes = props;
    }

    componentDidMount() {
      this.props.actions.fetchTradesAsync();
    }

    showRightPanel (panelName){
      this.props.actions.showRightPanel(panelName);
    }

    render() {

      if (this.props.loading) {
        return (
            <h2>Trades loading ...</h2>
        );
      }

      if (this.props.error) {
        return (
            <h2> Error loading trades {this.props.errorMessage} </h2>
        )
      }

      return (
        <Paper className={this.classes.root}>
          <Table className={this.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Trade Date</TableCell>
                <TableCell>Commodity</TableCell>
                <TableCell>Side</TableCell>
                <TableCell>Qty (MT)</TableCell>
                <TableCell>Price (/MT)</TableCell>
                <TableCell>Counterparty</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.trades.map(n => {
                return (
                  <TableRow 
                  hover
                /*  onClick={event => this.handleClick(event, n.id)}
                  onKeyDown={event => this.handleKeyDown(event, n.id)}
                  //role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  selected={isSelected} */
                  key={n.id}>
                    <TableCell>{n.tradeDate}</TableCell>
                    <TableCell>{n.commodity}</TableCell>
                    <TableCell>{n.side}</TableCell>
                    <TableCell>{n.qty}</TableCell>
                    <TableCell>{n.price}</TableCell>
                    <TableCell>{n.counterParty}</TableCell>
                    <TableCell>{n.location}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
                <TableRow>
                  <Button fab color="primary" aria-label="add" onClick={ this.showRightPanel('create') }>
                      <AddIcon />
                  </Button>
                </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      );
    }
  }
  
  TradeList.defaultProps = {
    trades: [],
    loading: false,
    error: false,
    errorMessage: ''
  }

  TradeList.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => {
    return {
         rightPanel: state.tradeState.rightPanel,
         trades: state.tradeState.trades,
         loading: state.tradeState.loading,
         error: state.tradeState.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch),
        //showRightPanel: bindActionCreators(actions.showRightPanel, dispatch)
    }
}

export default connect(mapStateToProps, 
                    mapDispatchToProps) (withStyles(styles)(TradeList))