const request = require('request')

const forecast = (location, callback) =>{
    const url = 'https://api.weatherapi.com/v1/current.json?key=5b0f86315fbe49378e2141805200812&q='+ encodeURIComponent(location)

    request({url,json:true}, (error, { body}) => {
        if(error){
            callback('Unable to connect to Weather Services',undefined)
        }
        else if(body.error){
            callback('Unable to find location try again',undefined)
        }
        else{
            callback(undefined,
                body.current.condition.text + '. It us currently ' + body.current.temp_c + ' degress out. And There is a %' + body.current.precip_mm + ' probability rain.'
            )
        }
    })
}

module.exports = forecast