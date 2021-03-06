import React, {Component} from "react";
import PropTypes from "prop-types";

import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import CreateTrade from "./CreateTrade";
import EditTrade from "./EditTrade";
import ShowTrade from "./ShowTrade";

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    }
  });


  class TradeList extends Component {

    constructor(props){
      super(props);
      this.classes = props;
    }

    loadShowPanel(event, trade) {
      this.props.setSelected(trade);
      this.props.showRightPanel('showTrade');
    } 

    loadEditPanel(){
      this.props.showRightPanel('editTrade');
    }

    isSelected = (id) => {
      if(this.props.selected !== undefined && this.props.selected != {} && this.props.selected.tradeId === id)
        return true;
      else        
        return false;
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

      const showRightPanel = this.props.rightPanel;
      const tableColSize = () => {
        if(showRightPanel === 'showTrade' || showRightPanel === 'createTrade' || showRightPanel === 'editTrade')
          return 9;
        else
          return 12;
      }
      const tableRowColSize = () => {
        if (tableColSize() === 9)
          return 'col-md-9';
        else
          return 'col-md-12';
      }

      return (
        <div>
          <Row>
            <Col md= {tableColSize()} xs={12}>
              <Paper className={this.classes.root}>
                <Table className={this.classes.table}>
                  <TableHead>
                    <TableRow >
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
                      const isSelected = this.isSelected(n.tradeId);
                      return (
                        <TableRow 
                        hover
                        onClick={event => this.loadShowPanel(event, n)}
                        //onKeyDown={event => this.handleKeyDown(event, n.id)}
                        //role="checkbox"
                        //aria-checked={isSelected}
                        tabIndex={-1}
                        selected={isSelected} 
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
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell><Button fab color="primary" aria-label="add" onClick={ () => this.props.showRightPanel('createTrade') }>
                            <AddIcon />
                        </Button></TableCell>
                        
                      </TableRow>
                  </TableFooter>
                </Table>
              </Paper>
            </Col>
            <Col md={3} xs={12}>
              {showRightPanel === 'showTrade' && <ShowTrade trade = {this.props.selected} editAction = { () => this.loadEditPanel()} />}
              {showRightPanel === 'createTrade' && <CreateTrade isEditable='false' trade = {this.props} showRightPanel = {(panelName) => this.props.showRightPanel(panelName)}/>}
              {showRightPanel === 'editTrade' && <CreateTrade isEditable='true' trade = {this.props.selected} showRightPanel = {(panelName) => this.props.showRightPanel(panelName)}/>}
            </Col>
          </Row>
        </div>
      );
    }
  }
  
  TradeList.defaultProps = {

  }

  TradeList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TradeList);