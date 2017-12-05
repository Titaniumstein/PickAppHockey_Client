//import react from 'react';
//import { connect } from 'react-redux'
const AddPlayTimeCommand = require('shared/Contracts/Commands/AddPlayTimeCommand');
const EditPlayTimeCommand = require('shared/Contracts/Commands/EditPlayTimeCommand');
const GetPlayTimesByPlayerIdQuery = require('shared/Contracts/Queries/GetPlayTimesByPlayerIdQuery');
const GetPlayTimeCardInfoQuery = require('shared/Contracts/Queries/GetPlayTimeCardInfoQuery');
const GetPlayTimeTrafficByRinkAndDateTimeQuery = require('shared/Contracts/Queries/GetPlayTimeTrafficByRinkAndDateTimeQuery');


const uuidv1 = require('uuid/v1');
import CommandService from '../CommandService';
import QueryService from '../QueryService';


const PlayTimeServices = {
   addPlayTime: (playTimeDto)=> {
        playTimeDto.id = uuidv1();
        let cmd = new AddPlayTimeCommand(playTimeDto);
        return CommandService.submit(cmd);
        
    },

    editPlayTime: (playTimeDto)=> {
        let cmd = new EditPlayTimeCommand(playTimeDto);
        return CommandService.submit(cmd);

    },

    getPlayTimesByPlayerId: (playerId)=>{
        let query = new GetPlayTimesByPlayerIdQuery(playerId);
        return QueryService.submit(query);
    },

    GetPlayTimeCardInfo:  (playTimeId)=>{
        let query = new GetPlayTimeCardInfoQuery(playTimeId);
        return QueryService.submit(query);
    },

    GetPlayTimeTrafficByRinkAndTime: (rinkId,startDateTime,endDateTime)=>{
        let query = new GetPlayTimeTrafficByRinkAndDateTimeQuery(rinkId,startDateTime,endDateTime);
        return QueryService.submit(query);
        
    },


}


   




module.exports = PlayTimeServices ;