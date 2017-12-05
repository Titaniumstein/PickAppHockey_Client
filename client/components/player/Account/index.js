
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PlayerActions from '../../../actions/player'
import * as RouterActions from '../../../actions/router'
import Navigation from 'react-toolbox/lib/navigation';
import services from '../../../services/player'
import style from './style.css'
import Button from 'ui/Button';






class Account extends Component {
  constructor(){
    super()
    this.state = {
      showBackBtn: false
    }
  }

  clickHandler=(key, navFxn)=>{
    let showBackBtn = (key!=="profile")
    this.setState({showBackBtn});
    navFxn();
    
  }

  render() {
    let props = this.props;
    let player = props.player;
    let profileLink = <a key="1" className={style.link} onClick={()=>this.clickHandler("profile", props.goToAccount)}> back </a>
    let editLink = <a key="2" className={style.link} onClick={()=>this.clickHandler("edit",props.goToEditProfile)}>Edit</a>
    let playTimeLink = <a key="3" className={style.link} onClick={()=>this.clickHandler("playTimes", ()=>props.goToPlayTimes(player.id))}> play-times</a>
    
    let links = [];
    // if(this.state.showBackBtn){links.push(profileLink)}
    // else{
    //   links.push(editLink);
    //   links.push(playTimeLink);
    // }

    
    return (

      <div>
        <h1>{(player) && player.username}</h1>
        {links}
        {this.props.children}
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
    goToAccount:()=>dispatch(RouterActions.goToAccount()),
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
)(Account)


//export default Profile
