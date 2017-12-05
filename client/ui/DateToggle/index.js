import React from 'react';
import Button from 'ui/Button';
import moment from 'moment';
import Row from 'ui/Row';
import Col from 'ui/Col';
import style from './style.css';

class DateToggle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: this.props.value && new Date(),
            trafficInfo: null

        }
    }

    onClick =(incrementDay)=>{
 
        let date = new Date(this.state.date);
        let newDate = moment(this.state.date).add(incrementDay,"days").toDate();
        this.setState({date:newDate});
        if(this.props.onClick){this.props.onClick(newDate)}
    }

    render(){
        let dateFormat = this.props.dateFormat ? this.props.dateFormat : "dddd, MMM DD, YYYY";
        return(
            <div>
                <Row>
                    <Col xs={2}>
                        <div className={style.date}> {moment(this.state.date).format(dateFormat)} </div>
                    </Col>
                    <Col xs={10}>
                        <Button  onClick={()=>this.onClick(-1)}> prev </Button>
                        <Button  onClick={()=>this.onClick(1)}> next </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DateToggle;