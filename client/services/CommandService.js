const fetch = require('isomorphic-fetch')
const PATH = process.env.NODE_ENV === 'development' ? "http://localhost:8080/Commands" : "https://pickapp-server.herokuapp.com/Commands";


function CommandService(){
    
    this.submit = (cmd)=>{return fetch(PATH, {
        method: 'POST',
        headers: {'content-type' : 'application/json'},
        body: JSON.stringify(cmd)
        })
        
    }
}
export default new CommandService();