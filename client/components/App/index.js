
import React, { Component } from 'react'
const RinkServices = require('../../services/Rink');

import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
//import NavMenu from '../NavMenu';
import Link from 'react-toolbox/lib/Link';
import { connect } from 'react-redux'

import * as PlayerActions from '../../actions/player'
import * as RinkActions from '../../actions/rink'

import * as RouterActions from '../../actions/router'
import NavMenu from './NavMenu'
import style from './style.css'


// const AddPlayerCommand = require('shared/Contracts/Commands/AddPlayerCommand');
// const EditPlayerProfileCommand = require('shared/Contracts/Commands/EditPlayerProfileCommand');




class App extends Component {


  componentWillMount(){
    this.initializeRinkData();
  }

  initializeRinkData=()=>{
    RinkServices.GetAllRinks()
    .then(res =>{
      if (res.ok) {
        return res.json()
          .then(rinks => {
            this.props.actions.setRinks(rinks);
            return rinks;
          })
      } 
      else {
        return res.json()
          .then(function(err) {
            alert("an error occured in gettng rinks");
            throw new Error("There's an error upstream and it says " + err.detail);
          });
        }
      })
  }

  render() {
    const { player, actions, children } = this.props


    let link = <a className={style.link} onClick={this.props.goToLogin}>Login</a>;
    if(player){
       link = <a> {player.username}</a>
    }
    
    return (
      <div>
        <AppBar title="PickApp Hockey">
          <Navigation type='horizontal'>
            <a className={style.link} onClick={this.props.goToRinks}>Rinks</a>
            {link}
            {this.props.player && <NavMenu/>}

          </Navigation>
        </AppBar>
        {children}
      </div>
    )
  }
}




function mapStateToProps(state) {
  return {
    player: state.player
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToHome:()=>dispatch(RouterActions.goToHome()),
    goToRinks:()=>dispatch(RouterActions.goToRinks()),
    goToLogin:()=>dispatch(RouterActions.goToLogin()),
    goToRegister:()=>dispatch(RouterActions.goToRegister()),
    goToAccount:()=>dispatch(RouterActions.goToAccount()),
    
    actions: {
      setRinks: (payload)=>dispatch(RinkActions.setRinks(payload)),
      //editTodo: (payload)=>dispatch(TodoActions.editPlayer(payload)),
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
