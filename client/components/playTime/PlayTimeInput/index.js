import { connect } from 'react-redux'
import services from '../../../services/PlayTime'
import * as PlayTimeActions from '../../../actions/playTime'
import * as RouterActions from '../../../actions/router'
import React from 'react';
import DatePicker from 'react-toolbox/lib/date_picker';
import Input from 'react-toolbox/lib/input';
import moment from 'moment';
import TimePicker from 'ui/TimePicker';
import Button from 'ui/Button';
const uuidv1 = require('uuid/v1');
const PlayTimeDto = require('shared/Contracts/DTOs/PlayTimeDto')





class PlayTimeInput extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            //playTime: this.props.playTime
            startDateTime: null,
            duration: null
            
            
            //time: this.props.playTime.startDateTime.getTime(),
            //duration: (this.props.playTime.endDateTime - this.props.playTime.startDateTime)/60000,

        }
    }

    componentWillMount(){
        this.setInitialValues();
    }

    componentDidUpdate(prevProps){
        if(this.props.playTime !== prevProps.playTime){
            this.setInitialValues();
        }
    }

    setInitialValues(){
        let startDateTime = this.props.playTime.startDateTime;
        let duration = this.getDurationMin(this.props.playTime);
        this.setState({startDateTime, duration});            
    }

    getDurationMin=(playTime)=>{
        let start =moment(playTime.startDateTime);
        let end = moment(playTime.endDateTime);
        var duration = moment.duration(end.diff(start));
        var minutes = duration.asMinutes();
        return minutes;
    }



    handleDurationChange = (duration) => {        
        this.setState({duration});
    };


    handleDateTimeChange = (value) => {
        let startDateTime = new Date(value);
        this.setState({startDateTime});
    };



    handleSave = () => {

        let playTime = this.props.playTime;
        playTime.startDateTime = this.state.startDateTime;
        playTime.endDateTime = moment(playTime.startDateTime).add(this.state.duration,"minutes");
        this.props.onSave(playTime);
    };

    handleRemove = () => {
        this.props.onRemove(this.state.playTime);
    };
    



    render(){
        return(
            <div>
                <DatePicker label='Date' sundayFirstDayOfWeek={true} onChange={this.handleDateTimeChange} value={this.state.startDateTime} />
                <TimePicker label="Start Time" onChange={this.handleDateTimeChange} value={this.state.startDateTime}/>
                <Input type="text" name="duration" value={this.state.duration} onChange={this.handleDurationChange} label="Duration (minutes)"/>
                <div>
                        <Button onClick={this.handleSave}> Save </Button>
                        {/* {!this.props.isNew && <Button onClick={this.handleRemove}> Remove </Button>} */}
                </div>
            </div>
        )
    }
}



export default PlayTimeInput;