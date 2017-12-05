
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import player from './player'
import rinks from './rinks'


export default combineReducers({
  routing,
  player,
  rinks,
})
