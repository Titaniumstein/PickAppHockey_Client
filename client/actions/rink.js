// const AddPlayerCommand = require('shared/Contracts/Commands/AddPlayerCommand');
// const EditPlayerProfileCommand = require('shared/Contracts/Commands/EditPlayerProfileCommand');



export const setRinks = (payload)=>{
  return ({
    type: 'Set Rinks',
    payload,
  })
}

