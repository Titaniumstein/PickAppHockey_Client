import { connect } from 'react-redux'
import services from '../../../services/rink'
//import * as PlayerActions from '../../../actions/player'
import * as RouterActions from '../../../actions/router'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import MyMapComponent from "ui/Map/Map"
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"


class Rinks extends React.Component{
    render(){
        return (
            <div>
                <h1> Toronto Rinks </h1>
                <MyMapComponent
                    rinks={this.props.rinks}
                    isMarkerShown 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCP45YHzauoWXWsb0EEj9Sv9ikBIcFR7x0&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    />
   
         </div>
   
        )

    }
}



function mapStateToProps(state) {
    return {
      rinks: state.rinks
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      goToRink:(id)=>dispatch(RouterActions.goToRink(id)),
      
      
      actions: {
        editPlayer: (payload)=>dispatch(PlayerActions.editPlayer(payload)),
      }
    }
  }
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Rinks)

//export default Rinks;