const PlayerDto = require('shared/Contracts/DTOs/PlayerDto');
import React, { Component } from 'react'
import { connect } from 'react-redux'
import services from '../../../services/player'
import * as PlayerActions from '../../../actions/player'
import * as RouterActions from '../../../actions/router'
import Input from 'ui/Input'
import Button from 'ui/Button'
import style from '../style.css'


class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: props.username? props.username: null,
      hash: props.hash? props.hash: null,
      
    }
  
  }


  handleSave =() => {
    services.login(this.state.username,this.state.hash)
      .then(res=>{
        if (res.ok) {
          return res.json()
            .then(player => {
              if(player === null){return alert("failed login attempt")}
                this.props.actions.login(player);
                this.props.goToRinks();
            })
        } 
        else {
          return res.json()
            .then(function(err) {
              throw new Error("There's an error upstream and it says " + err.detail);
            });
          }
      })
    
  }

  setUsername = (val)=> {
    let username = val;
    this.setState({username: username});
  }

  setPassword = (val)=>{
    
    let hash = val;
    this.setState({hash: hash});
  }


  render() {
    return (
      <header className={style.inputContainer}>
        <h1>Login</h1>
        <div>
          <div>
            {/* <label htmlFor="username"> username </label> */}
            <Input value={this.state.username} label={"Username"} onChange={this.setUsername} type="text" id="username"/>

            {/* <label htmlFor="password"> password </label> */}
            <Input value={this.state.hash} label={"Password"} onChange={this.setPassword} type="password" id="password"/>
          </div>
          <Button onClick={this.handleSave}> Login </Button>
        </div>
        <Button onClick={this.props.goToRegister}> Register </Button>


      </header>
    )
  }
}



function mapDispatchToProps(dispatch) {
  return {
    goToAccount:()=>dispatch(RouterActions.goToAccount()),
    goToRegister:()=>dispatch(RouterActions.goToRegister()),
    goToRinks:()=>dispatch(RouterActions.goToRinks()),
    
    
    actions: {
      login: (payload)=>dispatch(PlayerActions.login(payload)),
      
    }
  }
}



export default connect(
  null,
  mapDispatchToProps
)(Login)





//export default Login
