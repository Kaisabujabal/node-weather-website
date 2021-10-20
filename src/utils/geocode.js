const request = require('request')
//284804615b16fb480247fe6a9f58733a
//http://api.weatherstack.com/current?access_key=284804615b16fb480247fe6a9f58733a&query=37.8267,-122.4233
const geocode = (address,callback) =>
{
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2Fpc2tpbWFpYSIsImEiOiJja3RyYXI4NWcwczB3MnZucWNqd21rcm05In0.g7hah7XSUMqG4Q9S_uPPCA'
    request({url: mapBoxUrl, json: true}, (error,{body}) => {
        if(error)
        {
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.features.length === 0)
        {
            callback('Unable to find location, try another search', undefined)
        }
        else
        {
            callback(undefined,{
                   latitude: body.features[0].center[1],
                   longitude: body.features[0].center[0],
                   location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode