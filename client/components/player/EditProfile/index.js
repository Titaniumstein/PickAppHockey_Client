import { connect } from 'react-redux'
import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input';
import services from '../../../services/player'
import * as PlayerActions from '../../../actions/player'
import * as RouterActions from '../../../actions/router'
import Button from 'ui/Button';
import {startCase} from 'lodash'
import style from '../style.css'

class EditProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      player: props.player
    }
    this.handle = {};
    this.attrs = ['username', 'position', 'skillLevel', 'gender'];
    this.attrs.forEach((key)=>{
      this.handle[key] = (val)=>{
        this.state.player[key] = val
        this.setState({
          player: this.state.player,
        });
      }
    })
  }

  editProfile=()=>{
    let player = this.state.player;
    services.editPlayerProfile(player)
    .then(res=>{
      if (res.ok) {
        return res.json()
          .then(player => {
            this.props.actions.editPlayer(player);
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






  render() {
    
    return (
        <div className={style.inputContainer}>
          <h1> Edit Profile </h1>
          {
            [this.attrs.map((key)=>{
              return <Input type="text" name={key} value={this.state.player[key]} onChange={this.handle[key]} label={startCase(key)}/>
            })]
          }
        <Button onClick={this.editProfile}> save </Button>
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
    //goToAccount:()=>dispatch(RouterActions.goToAccount()),
    goToRinks:()=>dispatch(RouterActions.goToRinks()),
    
    
    
    actions: {
      editPlayer: (payload)=>dispatch(PlayerActions.editPlayer(payload)),
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile)


//export default EditProfile
