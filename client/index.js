
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './components/App'
//import Home from './components/Home'
import Login from './components/player/Login'
import RegisterPlayer from './components/player/RegisterPlayer'
import Account from './components/player/Account'
import Profile from './components/player/Profile'
import EditProfile from './components/player/EditProfile'
import Rinks from './components/rink/Rinks'
import Rink from './components/rink/Rink'
import PlayTimes from './components/playTime/PlayTimes'
import AddPlayTime from './components/playTime/AddPlayTime'
import Traffic from './components/playTime/Traffic'


//import * as playerActions from './actions/player'


import configure from './store'

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)
// let rinks = RinkServices.GetAllRinks()
//             .then(rinks =>{
//             })



ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Rinks}/>
                <Route path="login" component={Login} />
                <Route path="register" component={RegisterPlayer}/>
                <Route path="account" component={Account}>
                    <Route path="/account/edit-profile" component={EditProfile}/>
                    <Route path="/account/playtimes/:playerId" component={PlayTimes}/>
                </Route>
                <Route path="rinks" component={Rinks}/>
                <Route path="rinks/:id" component={Rink}/>
            </Route>
        </Router>
    </Provider>,
  document.getElementById('root')
)
