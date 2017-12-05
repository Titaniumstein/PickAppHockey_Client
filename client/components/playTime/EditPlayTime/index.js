import { connect } from 'react-redux'
import services from '../../../services/PlayTime'
import * as PlayTimeActions from '../../../actions/playTime'
import * as RouterActions from '../../../actions/router'
import React from 'react';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
import Button from 'ui/Button';
import PlayTimeInput from '../PlayTimeInput';
const uuidv1 = require('uuid/v1');
const PlayTimeDto = require('shared/Contracts/DTOs/PlayTimeDto')




class EditPlayTime extends React.Component{

    



    editPlayTime = (playTime) =>{
        services.editPlayTime(playTime)
        .then(res=>{
            if (res.ok) {
                return res.json()
                .then(playTime => {
                    this.props.actions.editPlayTime(playTime)
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
    

    render(){
        return(
            <div>
                <PlayTimeInput isNew={false} playTime={this.props.playTime} onSave={this.editPlayTime}/>
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
      goToRinks:()=>dispatch(RouterActions.goToRinks()),
      
      
      actions: {
        editPlayTime: (payload)=>dispatch(PlayTimeActions.editPlayTime(payload)),
      }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditPlayTime)





