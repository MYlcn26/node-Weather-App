const request = require('request')

const geocode = (adress, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoibXlsY24iLCJhIjoiY2tpZ2Eya3Z0MDltbDJzcWpuc2tldjFkZiJ9.VXz-BniI2CVTqFbcm50iiA&limit=1'

    request({url,json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to Location Services',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location try again',undefined)
        }
        else{
            callback(undefined,{
                lattitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}
/*
geocode('Sapanca', (error,data)=>{
    console.log('Error',error)
    console.log('Data',data)

})*/
module.exports = geocode