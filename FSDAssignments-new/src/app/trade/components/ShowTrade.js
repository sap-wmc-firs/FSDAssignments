import React, {Component} from "react";
import PropTypes from "prop-types";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Icon from 'react-icons-kit';
import { bin } from 'react-icons-kit/icomoon/bin';
import { pencil } from 'react-icons-kit/icomoon/pencil'; 
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

export default class ShowTrade extends Component{

    constructor(props){
        super(props);

        this.classes = props;
    }

    render(){
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography type="Subheading" color="secondary">
                        Trade ID: 1001
                        <Icon icon={pencil} />
                        <Icon icon={bin} />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Trade Date</TableCell>
                            <TableCell>23-03-2017</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Commodity</TableCell>
                            <TableCell>AL</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Side</TableCell>
                            <TableCell>Buy</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Counterparty</TableCell>
                            <TableCell>Dollar</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>$1,860.75</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>NY</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}

ShowTrade.defaultProps = {

}

ShowTrade.PropTypes = {
    classes: PropTypes.object.isRequired,
}