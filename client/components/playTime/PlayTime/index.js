import { connect } from 'react-redux'
import services from '../../../services/PlayTime'
import * as PlayTimeActions from '../../../actions/playTime'
import * as RouterActions from '../../../actions/router'
import React from 'react';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
const uuidv1 = require('uuid/v1');
const PlayTimeDto = require('shared/Contracts/DTOs/PlayTimeDto')




class PlayTime extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playTime: this.props.playTime,
        }
    }

    componentWillMount(){
        let player = this.props.player;
        let rink = this.props.rink;
        let isNew = (!this.props.routeParams);
        let playTime = !isNew? getSelectedPlayTime(): new PlayTimeDto(uuidv1(),player.id,rink.id)
        playTime.startDateTime = new Date();
        playTime.endDateTime = new Date();
        
        this.setState({playTime, isNew});
        
        
    }

    getPlayTimeCardInfo = ()=>{
        let services 
        let playTimeId = this.props.routeParams.id;
        let playTimes = this.props.playTimes;
        for(let i = 0; i < playTimes.length; i++){
            let playTime = playTimes[i];
            if(playTime.id === playTimeId){
                return selectedPlayTime = playTime;
            }
        };

    }

    handleDateChange = (item,value) => {
        let playTime = Object.assign({}, this.state.playTime);
        playTime[key] = value;
        this.setState(playTime);
    };


    handleDurationChange = (value) => {
        let playTime = Object.assign({}, this.state.playTime);
        playTime.duration = value;
        this.setState(playTime);
    };



    handleSave = () => {
        if(this.state.isNew){
            this.addPlayTime();
        }
    };

    addPlayTime = () =>{
        let playTime = this.state.playTime;
        services.addPlayTime(playTime)
        .then(res=>{
            if (res.ok) {
                return res.json()
                .then(playTime => {
                    this.props.actions.addPlayTime(playTime);
                    this.props.goToAccount();
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
    
    

    editPlayTime = (value) =>{
        
    }

    render(){
        let player = this.props.player;
        let rink = this.props.rink;
        let selectedPlayTime = {};
        let playTimes = this.props.playTimes;
        return(
            <div>
                <h1> PlayTime </h1>
                <DatePicker label='date' sundayFirstDayOfWeek={true} onChange={(this.handleDateChange.bind(this, 'date'))} value={this.state.playTime.startDateTime} />
                <Input type="text" name="duration" value={this.state.playTime.duration} onChange={()=>this.handleDurationChange('duration')} label="duration"/>
                <button onClick={this.addPlayTime}> save </button>
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
      
      
      actions: {
        addPlayTime: (payload)=>dispatch(PlayTimeActions.addPlayTime(payload)),
      }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayTime)


//export default Rink;