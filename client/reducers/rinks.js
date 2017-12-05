// const RinkDto = require('shared/Contracts/DTOs/RinkDto');
//const RinkServices = require('../services/Rink');
const initialState = [];            

export default (state = initialState, action)=>{
  switch(action.type){
    case "Set Rinks":
      return action.payload;

    // case "Login":
    //   return action.payload;

    // case "Edit Player":
    //   return action.playload;

    default: return state;
  }
}



