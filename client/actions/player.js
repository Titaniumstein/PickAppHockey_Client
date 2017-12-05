// const AddPlayerCommand = require('shared/Contracts/Commands/AddPlayerCommand');
// const EditPlayerProfileCommand = require('shared/Contracts/Commands/EditPlayerProfileCommand');



export const addPlayer = (payload)=>{
  return ({
    type: 'Add Player',
    payload,
  })
}

export const login = (payload)=>{
  return ({
    type: 'Login',
    payload,
  })
}

export const logout = (payload)=>{
  return ({
    type: 'Logout',
    payload,
  })
}


export const editPlayer = (payload)=>({
  type: 'Edit Player',
  payload,
})

