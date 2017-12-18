import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';

 const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  });



  function Search(props) {
    const { classes } = props;

    const {status } = {
        checkedA: true,
        checkedB: false,
        checkedF: true,
        checkedG: true,
      };
  
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="tradeDate"
          label="Trade Date"
          type="date"
          defaultValue="2017-03-22"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        /> 
        to
        <TextField
          id="toTradeDate"
          label="To TradeDate"
          type="date"
          defaultValue="2017-03-22"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        &emsp;
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="uncontrolled-native">Commodity</InputLabel>
          <Select native defaultValue={30} input={<Input id="uncontrolled-native" />}>
            <option value="" />
            <option value={10}>AL</option>
            <option value={20}>CU</option>
            <option value={30}>Fe</option>
            <option value={40}>Commodity1</option>
          </Select>
        </FormControl>
        &emsp;
        <FormGroup row>
        {/* <InputLabel htmlFor="uncontrolled-native">Side</InputLabel> */}
        <FormControlLabel
          control={
            <Checkbox
              checked="true"
              onChange=""
              value="checkedA"
            />
          }
          label="Buy"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked="false"
              onChange=""
              value="checkedB"
            />
          }
          label="Sell"
        />
        </FormGroup>
        &emsp;
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="uncontrolled-native">Counterparty</InputLabel>
          <Select native defaultValue={1} input={<Input id="uncontrolled-native" />}>
            <option value="" />
            <option value={1}></option>
            <option value={10}>Counterparty1</option>
            <option value={20}>Counterparty2</option>
            <option value={30}>Counterparty3</option>
          </Select>
          {/* <FormHelperText>Uncontrolled</FormHelperText> */}
        </FormControl>
        &emsp;
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="uncontrolled-native">Location</InputLabel>
          <Select native defaultValue={1} input={<Input id="uncontrolled-native" />}>
            <option value="" />
            <option value={1}></option>
            <option value={10}>Location1</option>
            <option value={20}>Location2</option>
            <option value={30}>Location3</option>
          </Select>
        </FormControl>
        <Button className={classes.button}>clear</Button>
        <Button className={classes.button}>Search</Button>
      </form>
    );
  }
    
  Search.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Search);
// export default class Search extends Component{
//     render(){
//         return(
//             <div>
//                 <table>
//                     <tr>
//                         <th>Trade Date</th>
//                         <th>Commodity</th>
//                         <th>Side</th>
//                         <th>Counterparty</th>
//                         <th>Location</th>
//                     </tr>
//                     <tr>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                     </tr>
//                 </table>
//                 <form className={classes.container} noValidate>
//                     <TextField
//                         id="date"
//                         label="Birthday"
//                         type="date"
//                         defaultValue="2017-05-24"
//                         className={classes.textField}
//                         InputLabelProps={{
//                         shrink: true,
//                         }}
//                     />
//                 </form>
//                 <form>
//                     <label>Trade Date</label>
//                     <input type="date" />to<input type="date" />
//                     <label>Commodity</label>
//                     <select>
//                         <option>All</option>
//                     </select>
//                     <label>Side</label>
//                     <input type="checkbox" />Buy
//                     <input type="checkbox" />Sell
//                     <label>Counterparty</label>
//                     <select>
//                         <option>A</option>
//                         <option>B</option>

//                     </select>
//                     <label>Location</label>
//                     <select>
//                         <option>Ggn</option>
//                         <option>Noida</option>
//                     </select>
//                     <a href ="#">CLEAR</a> <a href="#">SEARCH</a>
//                 </form>
                
//             </div>
//         )
//     }
// }