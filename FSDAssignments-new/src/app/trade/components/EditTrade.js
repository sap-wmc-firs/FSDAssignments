import React, {Component} from "react";
import PropTypes from "prop-types";

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Icon from 'react-icons-kit';
import { bin } from 'react-icons-kit/icomoon/bin';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Radio, { RadioGroup } from 'material-ui/Radio';

export default class EditTrade extends Component{
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
                        Trade ID: {this.props.trade.tradeId}
                        <Icon icon={bin} />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Trade Date</TableCell>
                            <TableCell>
                                <TextField
                                    id="tradeDate"
                                    label=""
                                    type="date"
                                    defaultValue={this.props.trade.tradeDate}
                                    className={this.classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Commodity</TableCell>
                            <TableCell>
                                <FormControl className={this.classes.formControl}>
                                    {/* <InputLabel htmlFor="uncontrolled-native">Commodity</InputLabel> */}
                                    <Select native defaultValue={this.props.trade.commodityId} input={<Input id="uncontrolled-native" />}>
                                    <option value="" />
                                    <option value={1}>AL</option>
                                    <option value={2}>ZN</option>
                                    <option value={3}>CU</option>
                                    <option value={4}>AU</option>
                                    <option value={5}>Ag</option>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Side</TableCell>
                            <TableCell>
                                <Radio
                                    checked= {this.props.trade.side === 'Buy'}
                                    onChange={this.handleChange}
                                    value="a"
                                    name="radio button demo"
                                    aria-label="A"
                                    label="Buy"
                                /> Buy
                                <Radio
                                    checked={this.props.trade.side === 'Sell'}
                                    onChange={this.handleChange}
                                    value="b"
                                    name="radio button demo"
                                    aria-label="B"
                                    label="Sell"
                                /> Sell
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Counterparty</TableCell>
                            <TableCell>
                                <FormControl className={this.classes.formControl}>
                                    {/* <InputLabel htmlFor="uncontrolled-native">Counterparty</InputLabel> */}
                                    <Select native defaultValue={this.props.trade.counterPartyId} input={<Input id="uncontrolled-native" />}>
                                        <option value="" />
                                        <option value={101}>Lorem</option>
                                        <option value={102}>Dolor</option>
                                        <option value={103}>Ipsum</option>
                                        <option value={104}>Amet</option>
                                    </Select>
                                    {/* <FormHelperText>Uncontrolled</FormHelperText> */}
                                    </FormControl>

                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Price</TableCell>
                            <TableCell>
                                <TextField
                                    id="price"
                                    label=""
                                    type="text"
                                    defaultValue={this.props.trade.price}
                                    className={this.classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />USD
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>
                                <FormControl className={this.classes.formControl}>
                                    {/* <InputLabel htmlFor="uncontrolled-native">Location</InputLabel> */}
                                    <Select native defaultValue={this.props.trade.locationId} input={<Input id="uncontrolled-native" />}>
                                        <option value="" />
                                        <option value={1}></option>
                                        <option value={10}>SG</option>
                                        <option value={20}>LN</option>
                                        <option value={30}>NY</option>
                                        <option value={40}>DN</option>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}