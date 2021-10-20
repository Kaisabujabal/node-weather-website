const request = require('request')

const forecast = (lattidue,longitude, callback) =>
{
    console.log('latt='+lattidue+' long='+longitude)
    const url = 'http://api.weatherstack.com/current?access_key=284804615b16fb480247fe6a9f58733a&query='+lattidue+','+longitude+'&units=f'
    request({url: url, json: true}, (error,{body}) => {
        if(error)
        {
            callback('Unable to connect to location services', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location, try another search', undefined)
        }
        else
        {
            callback(undefined,body.current.weather_descriptions[0] +'. It is currently '+body.current.temperature + ', it feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast