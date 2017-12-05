const fetch = require('isomorphic-fetch')
const Base_PATH = process.env.NODE_ENV === 'development' ? "http://localhost:8080/Queries" : "https://pickapp-server.herokuapp.com/Queries";

function QueryService(){
    
    this.submit = (query)=>{
        let path = buildQueryString(query);
        return fetch(path,  {
        method: 'GET',
        headers: {'content-type' : 'application/json'},
        //body: JSON.stringify(query)
        })
    }
}

function buildQueryString(query){
    let string = Base_PATH + "?";
    for(let prop in query){
        string += prop + "=" +query[prop] + "&";

    }
    return string.substring(0, string.length - 1);
}


export default new QueryService()

