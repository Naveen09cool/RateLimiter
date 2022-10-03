const fetch =  require('node-fetch');
const RateLimiter = require("limiter").RateLimiter;


// Allow 20 requests per minutes
const limiter = new RateLimiter({ tokensPerInterval: 20, interval: "minute", fireImmediately: true });

module.exports.getData = async function (req, res) {
    const remainingRequests = await limiter.removeTokens(1);
    if (remainingRequests < 0) {
        res.end('429 Too Many Requests - your IP is being rate limited');
    } else {
        await getApiData(...arguments);
    }

}

let getApiData = async function(req, res){
    try {
        // let searchText = req.params.item;
        // let api_url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        let api_url = "https://www.themealdb.com/api/json/v1/1/random.php"
        let fetch_response = await fetch(api_url);
        let json = await fetch_response.json();
        return res.status(200).json({
            json
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).end()
        } else {
            res.status(429).send('Too Many Requests');
        }
    }
}
