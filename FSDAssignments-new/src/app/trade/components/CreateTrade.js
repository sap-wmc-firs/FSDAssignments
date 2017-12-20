import React, {Component} from "react";
import PropTypes from "prop-types";

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Radio, { RadioGroup } from 'material-ui/Radio';


export default class CreateTrade extends Component{

    constructor(props){
        super(props);
        this.classes = props;
        this.state ={
            
        }
    }

    render(){
        return(
             <div> 
                 <AppBar position="static">
                    <Toolbar>
                        <Typography type="Subheading" color="secondary">
                        Create Trade
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
                                    defaultValue=""
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
                                    <Select native defaultValue={0} input={<Input id="uncontrolled-native" />}>
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
                                    checked={this.state.selectedValue === 'a'}
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
                                    <Select native defaultValue={0} input={<Input id="uncontrolled-native" />}>
                                        <option value="" />
                                        <option value={1}></option>
                                        <option value={10}>Counterparty1</option>
                                        <option value={20}>Counterparty2</option>
                                        <option value={30}>Counterparty3</option>
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
                                    defaultValue=""
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
                                    <Select native defaultValue={1} input={<Input id="uncontrolled-native" />}>
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
                <Button raised  className={this.classes.button} onClick = {() => this.props.showRightPanel('none')}>Cancel</Button>&emsp;
                <Button raised  className={this.classes.button}>Save</Button>
            </div> 
        )
    }
}