import { connect } from 'react-redux'
import services from '../../../services/PlayTime'
//import * as PlayerActions from '../../../actions/player'
import * as RouterActions from '../../../actions/router'
import React from 'react';
import DatePicker from 'react-toolbox/lib/date_picker';
const uuidv1 = require('uuid/v1');
const PlayTimeDto = require('shared/Contracts/DTOs/PlayTimeDto')




class PlayTimeTraffic extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playTime: {},
            isNew: false


        }
    }

    componentWillMount(){
        let rinkId = this.props.routeParams.id;
        //services
        let player = this.props.player;
        let rink = this.props.rink;
        let isNew = (playTimeId === 0);
        let playTime = !isNew? getSelectedPlayTime(): new PlayTimeDto(uuidv1(),player.id,rink.id)
        this.setState(playTime,isNew);
        
        
    }

    getSelectedPlayTime = (playTimeId)=>{
        let playTimes = this.props.playTimes;
        for(let i = 0; i < playTimes.length; i++){
            let playTime = playTimes[i];
            if(playTime.id === playTimeId){
                return selectedPlayTime = playTime;
            }
        };

    }

    handleChange = (value) => {
        this.setState({[date]: value});
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
                .then(player => {
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
                <DatePicker label='date' sundayFirstDayOfWeek={true} onChange={()=>this.handleChange('date1')} value={this.state.date1} />
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
      goToRinks:()=>dispatch(RouterActions.goToRinks()),
      
      
      actions: {
        editPlayer: (payload)=>dispatch(PlayerActions.editPlayer(payload)),
      }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayTimeTraffic)


//export default Rink;