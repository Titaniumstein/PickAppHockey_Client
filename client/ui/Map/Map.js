import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { connect } from 'react-redux'
// import * as PlayerActions from '../../../actions/player'
import * as RouterActions from 'actions/router'
import {flowRight} from 'lodash'

class MyMapComponent extends React.PureComponent {
    state = {
        showInfoWindow: '',
    }
    toggleInfoWindow = (id = '') => {
        this.setState({
            showInfoWindow: id,
        })
    }
    render(){
        const {props} = this;
        return <GoogleMap  
            defaultZoom={11}
            defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
        >
        {
            this.props.rinks.map(rink=>{
                return <Marker
                        onClick={()=>this.props.goToRink(rink.id)}
                        onMouseOut={this.toggleInfoWindow}
                        onMouseOver={()=>this.toggleInfoWindow(rink.id)}
                        position={{ lat: Number(rink.latitude), lng: Number(rink.longitute) }}
                        >
                            {
                                rink.id === this.state.showInfoWindow && <InfoWindow>
                                <div>
                                    {rink.name}
                                </div>
                            </InfoWindow>
                            }
                        </Marker>        
            })
        }
      </GoogleMap>
    
    }
}


  
// function mapStateToProps(state) {
//     return {
//       rinks: state.rinks
//     }
//   }
  
  function mapDispatchToProps(dispatch) {
    return {
      goToRink:(id)=>dispatch(RouterActions.goToRink(id)),
      
      
    //   actions: {
    //     editPlayer: (payload)=>dispatch(PlayerActions.editPlayer(payload)),
    //   }
    }
  }
  


export default flowRight([
    withScriptjs,    
    withGoogleMap,
    connect(
        null,
        mapDispatchToProps
    )

])(MyMapComponent)