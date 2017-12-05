
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PlayerActions from '../../../actions/player'
import * as RouterActions from '../../../actions/router'
import Navigation from 'react-toolbox/lib/navigation';
import services from '../../../services/player'
import style from './style.css'






class Profile extends Component {
  constructor(){
    super()
    this.handle = {};
    this.attrs = ['position', 'skillLevel', 'gender']



  }


  render() {
    let player = this.props.player;
    return (
        <div>
        {
          [this.attrs.map((key)=>{
            return <h3> {key +": " + this.props.player[key]} </h3>
          })]
        }
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
    goToRinks:()=>dispatch(RouterActions.goToRinks()),
    goToEditProfile:()=>dispatch(RouterActions.goToEditProfile()),
    goToPlayTimes: (playerId)=>dispatch(RouterActions.goToPlayTimes(playerId)),
    
    
    actions: {
      //addPlayer: (payload)=>dispatch(PlayerActions.addPlayer(payload)),
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)


//export default Profile
