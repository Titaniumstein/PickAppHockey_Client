//import react from 'react';
//import { connect } from 'react-redux'

const GetAllRinksQuery = require('shared/Contracts/Queries/GetAllRinksQuery');


const fetch = require('isomorphic-fetch')
const uuidv1 = require('uuid/v1');
import QueryService from '../QueryService';

const RinkServices = {
   GetAllRinks: ()=> {
        let query = new GetAllRinksQuery();
        return QueryService.submit(query);
        
    },



}


   




module.exports = RinkServices ;