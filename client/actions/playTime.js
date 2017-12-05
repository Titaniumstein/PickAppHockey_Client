// const AddPlayerCommand = require('shared/Contracts/Commands/AddPlayerCommand');
// const EditPlayerProfileCommand = require('shared/Contracts/Commands/EditPlayerProfileCommand');



export const addPlayTime = (payload)=>{
  return ({
    type: 'Add PlayTime',
    payload,
  })
}

export const editPlayTime = (payload)=>({
  type: 'Edit PlayTime',
  payload,
})

export const removePlayTime = (payload)=>{
  return ({
    type: 'Remove PlayTime',
    payload,
  })
}

