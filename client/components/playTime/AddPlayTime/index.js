import { connect } from 'react-redux'
import services from '../../../services/PlayTime'
import * as PlayTimeActions from '../../../actions/playTime'
import * as RouterActions from '../../../actions/router'
import React from 'react';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
import PlayTimeInput from '../PlayTimeInput';
import style from './style.css';
const uuidv1 = require('uuid/v1');
const PlayTimeDto = require('shared/Contracts/DTOs/PlayTimeDto')




class AddPlayTime extends React.Component{
    
    addPlayTime = (playTime) =>{
        services.addPlayTime(playTime)
        .then(res=>{
            if (res.ok) {
                return res.json()
                .then(playTime => {
                    this.props.actions.addPlayTime(playTime);
                    this.props.goToPlayTimes(this.props.player.id);
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
    
    getDefaultPlayTime=()=>{
        let player = this.props.player;
        let rink = this.props.rink;
        let playTime = new PlayTimeDto(uuidv1(), player.id, rink.id);
        let defaultDurationMinutes = 60 //min 
        playTime.startDateTime = new Date();
        playTime.endDateTime = new Date(playTime.startDateTime.getTime() + defaultDurationMinutes*60000);
        return playTime;
    }


    render(){
      
        let playTime = (this.props.rink) && this.getDefaultPlayTime();

        return(
            <div className={style.addPlayTimeContainer}>
                <h3> Add Playtime </h3>
                {playTime && <PlayTimeInput isNew={true} playTime={playTime} onSave={this.addPlayTime}/>}
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
      goToPlayTimes:(id)=>dispatch(RouterActions.goToPlayTimes(id)),
      
      
      
      actions: {
        addPlayTime: (payload)=>dispatch(PlayTimeActions.addPlayTime(payload)),
      }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPlayTime)










//export default Rink;