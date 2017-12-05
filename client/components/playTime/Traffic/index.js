import { connect } from 'react-redux'
import services from '../../../services/PlayTime';
import Button from 'ui/Button';
//import * as PlayerActions from '../../../actions/player'
import * as RouterActions from '../../../actions/router'
import AddPlayTime from "../../playTime/AddPlayTime";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'Recharts';
import moment from 'moment';
import DateToggle from 'ui/DateToggle';

import React from 'react';

class Traffic extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            trafficInfo: null
        }
    }

    componentWillMount(){
        this.setTrafficInfo(this.props.date);
    }


    setTrafficInfo=(date)=>{
        let startDateTime = new Date(date);
        startDateTime.setHours(0,0,0,0);
        let endDateTime = new Date(date);
        endDateTime =new Date(endDateTime.setHours(23,59,59,999));
        let rinkId = this.props.rinkId;
        services.GetPlayTimeTrafficByRinkAndTime(rinkId,startDateTime,endDateTime)
        .then(res=>{
            if (res.ok) {
                return res.json()
                .then(trafficInfo => {
                    this.setState({trafficInfo});
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
        let trafficInfo = this.state.trafficInfo;
        let playTimes = (trafficInfo)? trafficInfo.trafficDistribution: [];
        return(
            <div>
                <DateToggle value={this.props.date} onClick={this.setTrafficInfo}/>
                <LineChart width={600} height={300} data={playTimes} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis label={{ value: "Time", position: "insideBottomRight", dy: 10}} dataKey="timeInterval"/>
                    <YAxis label={{ value: "Traffic", position: "insideLeft", angle: -90,   dy: -10}}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="traffic" stroke="#8884d8" activeDot={{r: 8}}/>
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </div>
        )
    }
}
  
  
export default Traffic


