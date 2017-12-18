import React, {Component} from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import Icon from 'react-icons-kit';
import { user } from 'react-icons-kit/fa/user';
import Trades from "./Trades";
import Transfers from "./Transfers";
import Transports from "./Transports";

    const styles = theme => ({
        root: {
        marginTop: theme.spacing.unit,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        },
    });

    function TabContainer(props) {
        return <div style={{ padding: 8 * 3 }}>{props.children}</div>;
      }
      
    TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    };

   class Home extends Component {

    constructor(props){
      super(props);
      this.state = {
        tabValue: props.tabValue
      }

      this.classes = props;
    }
        
          handleChange = (event, value) => {
            const tabValue = value;
            this.setState({ tabValue });
          };

          render(){
            
            const  tab = this.state.tabValue;

            return (
              <div className={this.classes.root}>
                <AppBar position="static">
                  <Tabs value={tab} onChange={this.handleChange}>
                    <Tab value="trades" label="TRADES" />
                    <Tab value="transfers" label="TRANSFERS" />
                    <Tab value="transports" label="TRANSPORTS" />
                    <div>Shubha <Icon icon={user}/></div>
                  </Tabs> 
                </AppBar>
                
                {tab === 'trades' && <TabContainer><Trades /></TabContainer>}
                {tab === 'transfers' && <TabContainer><Transfers /></TabContainer>}
                {tab === 'transports' && <TabContainer><Transports /></TabContainer>}
              </div>
            );
          }
            
    }

    Home.defaultProps = {
      tabValue: 'trades'
    }

    Home.propTypes = {
        classes: PropTypes.object.isRequired,
   };

 export default withStyles(styles)(Home);
      