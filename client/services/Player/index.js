//import react from 'react';
//import { connect } from 'react-redux'
import * as PlayerActions from '../../actions/player'
import * as RouterActions from '../../actions/router'
const RegisterPlayerCommand = require('shared/Contracts/Commands/RegisterPlayerCommand');
const EditPlayerProfileCommand = require('shared/Contracts/Commands/EditPlayerProfileCommand');
const LoginCommand = require('shared/Contracts/Commands/LoginCommand');
const uuidv1 = require('uuid/v1');
import CommandService from '../CommandService';

const PlayerServices = {
   register: (playerDto)=> {
        playerDto.id = uuidv1();
        let cmd = new RegisterPlayerCommand(playerDto);
        return CommandService.submit(cmd);
        
    },

    login: (username,hash)=> {
        let cmd = new LoginCommand(username, hash);
        return CommandService.submit(cmd);

    },

    editPlayerProfile: (playerDto)=> {
        let cmd = new EditPlayerProfileCommand(playerDto);
        return CommandService.submit(cmd);

    }


}


   




module.exports = PlayerServices ;