import {push} from 'react-router-redux'


export const goToHome = ()=>{
  return push("/");
}


export const goToLogin = ()=>{
  return push("/login");
}

export const goToRegister = ()=>{
  return push("/register");
}

export const goToAccount = ()=>{
  return push("/account");
}

export const goToEditProfile = ()=>{
  return push("/account/edit-profile");
}


export const goToPlayTimes = (playerId)=>{
  return push("/account/playtimes/"+playerId);
}

export const goToAddPlayTime = (rinkId)=>{
  return push("/rinks/" + rinkId + "/add-playtime");
}

export const goToRinks = ()=>{
  return push("/rinks");
}

export const goToRink = (id)=>{
  return push("/rinks/"+id);
}



// import { createAction } from 'redux-actions'

// export const addTodo = createAction('add todo')
// export const deleteTodo = createAction('delete todo')
// export const editTodo = createAction('edit todo')
// export const completeTodo = createAction('complete todo')
// export const completeAll = createAction('complete all')
// export const clearCompleted = createAction('clear complete')
