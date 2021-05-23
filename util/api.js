const fetch = require("node-fetch")
class Request {
    constructor(endpoint, param){
        this.endpoint =  endpoint;
        this.param = param;
    }
    async get(){
        var res = await fetch(`https://apis-cloudyyuw.vercel.app/api/${this.endpoint}?key=${process.env.APIS}&${this.param}`);
        return res.headers.get("content-type") === "application/json" ? await res.json() : await res.buffer();
    }
}

module.exports = Request;