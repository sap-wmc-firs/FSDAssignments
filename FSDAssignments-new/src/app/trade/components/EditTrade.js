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
        this.state ={
            commodity: 'AL'
        }
    }
    render(){
        return(
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography type="Subheading" color="secondary">
                        Trade ID: 1001
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
                                    defaultValue="23-03-2017"
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
                                    <Select native defaultValue={10} input={<Input id="uncontrolled-native" />}>
                                    <option value="" />
                                    <option value={10}>AL</option>
                                    <option value={20}>CU</option>
                                    <option value={30}>Fe</option>
                                    <option value={40}>Commodity1</option>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Side</TableCell>
                            <TableCell>
                                <Radio
                                    checked= "true" //{this.state.selectedValue === 'a'}
                                    onChange={this.handleChange}
                                    value="a"
                                    name="radio button demo"
                                    aria-label="A"
                                    label="Buy"
                                /> Buy
                                <Radio
                                    checked={this.state.selectedValue === 'b'}
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
                                    <Select native defaultValue={20} input={<Input id="uncontrolled-native" />}>
                                        <option value="" />
                                        <option value={1}></option>
                                        <option value={10}>Dollar</option>
                                        <option value={20}>Ipsum</option>
                                        <option value={30}>Amet</option>
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
                                    defaultValue="12345"
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
                                    <Select native defaultValue={10} input={<Input id="uncontrolled-native" />}>
                                        <option value="" />
                                        <option value={1}></option>
                                        <option value={10}>NY</option>
                                        <option value={20}>LN</option>
                                        <option value={30}>Location3</option>
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