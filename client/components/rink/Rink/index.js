import { connect } from 'react-redux'
import services from '../../../services/Rink'
//import * as PlayerActions from '../../../actions/player'
import * as RouterActions from '../../../actions/router'
import AddPlayTime from "../../playTime/AddPlayTime";
import Traffic from "../../playTime/Traffic";
import React from 'react';
import style from './style.css';
import Button from 'ui/Button';

class Rink extends React.Component{


    getSelectedRink=()=>{
        let rinks = this.props.rinks;
        let rinkId = this.props.routeParams.id;
        for(let i = 0; i < rinks.length; i++){
            let rink = rinks[i];
            if(rink.id === rinkId){
                return rink;
                
            }
        };

    }

    render(){
        let rink = (this.props.rinks.length>0)? this.getSelectedRink(): null;
        let startDate = new Date();
        startDate.setHours(0,0,0,0);

        return(
            <div>
                <h1> {(rink) ? rink.name: "Rink"} </h1>
                <div className={style.rinkContentContainer}>
                    {(rink) && <Traffic rinkId={rink.id} date={startDate}/>}
                    {/* <div>
                        {(rink) &&  <Button onClick={()=>this.state.goToAddPlayTime(rink.id)}> Commit PlayTime </Button>}
                    </div> */}
                   
                    {(this.props.player) && <AddPlayTime rink={rink}/>}

                </div>
            </div>
        )


    }
}

function mapStateToProps(state) {
    return {
      rinks: state.rinks,
      player: state.player
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      goToRinks:()=>dispatch(RouterActions.goToRinks()),
      goToAddPlayTime:(rinkId)=>dispatch(RouterActions.goToAddPlayTime(rinkId)),
      
      
      
      actions: {
        editPlayer: (payload)=>dispatch(PlayerActions.editPlayer(payload)),
      }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Rink)


//export default Rink;