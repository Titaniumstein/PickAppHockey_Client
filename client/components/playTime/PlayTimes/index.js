import { connect } from 'react-redux'
import services from '../../../services/PlayTime'
import * as PlayTimeActions from '../../../actions/playTime'
import * as RouterActions from '../../../actions/router'
import React from 'react';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
import style from './style.css';
import Sidebar from 'ui/Sidebar';
import List from 'ui/List';
import ListItem from 'ui/ListItem';
import Row from 'ui/Row';
import Col from 'ui/Col';
import EditPlayTime from '../EditPlayTime';
import moment from 'moment';

const uuidv1 = require('uuid/v1');
const PlayTimeDto = require('shared/Contracts/DTOs/PlayTimeDto');





class PlayTimes extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            playTimes: [],
            selectedPlayTimeCard: null
        }

    }

    componentWillMount(){
        let player = this.props.player;
        (player) && this.setPlayTimesForPlayer(player.id);

        
    }

    setPlayTimesForPlayer = (playerId)=>{
        services.getPlayTimesByPlayerId(playerId)
        .then(res=>{
            if (res.ok) {
                return res.json()
                .then(playTimesData => {
                    let playTimes = playTimesData.map(pt=>{
                        let playTime = pt;
                        playTime.startDateTime = new Date(pt.startDateTime);
                        playTime.endDateTime = new Date(pt.endDateTime);
                        return playTime;
                        
                    })
                    
                    this.setState({playTimes});
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

    clickHandler=(id)=>{
        services.GetPlayTimeCardInfo(id)
        .then(res=>{
            if (res.ok) {
                return res.json()
                .then(cardInfo => {
                    this.setState({selectedPlayTimeCard:cardInfo});
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


    getSelectedPlayTime = (id)=>{
        let playTimeId = id;
        let playTimes = this.state.playTimes;
        for(let i = 0; i < playTimes.length; i++){
            let playTime = playTimes[i];
            if(playTime.id === playTimeId){
                return playTime;
            }
        };

    }


    render(){
        let playTimes = this.state.playTimes;
        let playTimeComps = playTimes.map((pt)=>{
            return <ListItem 
                        key={pt.id}
                        onClick={()=>this.clickHandler(pt.id)}
                        caption={moment(pt.startDateTime).format("dddd, MMM DD, YYYY")}
                         />
        })
        let playTimeInfo = this.state.selectedPlayTimeCard;
      
        return(
            <div>
                <h3> My Playtimes </h3>
                {this.state.playTimes.length === 0 && <p> You have no playtimes scheduled. Playtimes can be added by going to a rink page </p>}
                <Row>
                    <Col xs={6}>
                        <List>
                            {playTimeComps} 
                        </List>
                    </Col>
                    <Col xs={6}>
                        {playTimeInfo && <h3> {playTimeInfo.rink.name} </h3>}
                        {playTimeInfo && <EditPlayTime playTime={this.getSelectedPlayTime(playTimeInfo.playTimeId)}/>}
                    </Col>
                </Row>                   
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      player: state.player,
      playTimes: state.playTimes
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      //goToAccount:()=>dispatch(RouterActions.goToAccount()),
      
      
      actions: {
        addPlayTime: (payload)=>dispatch(PlayTimeActions.addPlayTime(payload)),
      }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PlayTimes)


//export default Rink;