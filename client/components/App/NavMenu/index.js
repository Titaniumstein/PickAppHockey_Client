import { connect } from 'react-redux'
import * as RouterActions from 'actions/router'
import * as PlayerActions from 'actions/player'
import React from 'react';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';

class NavMenu extends React.Component{


    logout=()=>{
        this.props.actions.logout(null)
        this.props.goToRinks();
    }


    getMenuItems=()=>{
        const player = this.props.player || {}
        let profileItems = [
            <MenuItem disabled={true} caption={"Profile"} />,
            <MenuItem disabled={true} caption={"Position: " + player.position} />,
            <MenuItem disabled={true} caption={"Skill Level: " + player.skillLevel} />,
            <MenuItem disabled={true} caption={"Gender: " + player.gender} />,
            <MenuDivider />,
            <MenuItem onClick={this.props.goToEditProfile} caption={"Edit Profile"} />,
            <MenuDivider />,
            <MenuItem onClick={()=>this.props.goToPlayTimes(this.props.player.id)} caption={"Playtimes"} />,
            <MenuDivider />,

        ]
        let otherItems = [
            <MenuItem onClick={this.logout} caption={"Logout"} />,
        ]


        if(this.props.player){
            return [...profileItems, ...otherItems]
        }
        return otherItems;
        
    }
    render(){
        return (
            <IconMenu icon='more_vert' position='topRight' menuRipple>
                {this.getMenuItems()}
            </IconMenu>
          )
    };
          
    

}



function mapStateToProps(state) {
    return {
      player: state.player
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      //goToRink:(id)=>dispatch(RouterActions.goToRink(id)),
      goToEditProfile:()=>dispatch(RouterActions.goToEditProfile()),
      goToPlayTimes:(id)=>dispatch(RouterActions.goToPlayTimes(id)),
      goToRinks:()=>dispatch(RouterActions.goToRinks()),
      
      
      actions: {
        logout: (payload)=>dispatch(PlayerActions.logout(payload)),
      }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavMenu)


