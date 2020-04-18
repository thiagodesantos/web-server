const request = require('request')

const geocode = (endereco, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(endereco) +'.json?access_token=pk.eyJ1IjoidGhpYWdvZGVzYW50b3MiLCJhIjoiY2s4NzcxM2YzMGU0cTNsbmh4djF5YXJzaiJ9.Diur8t9L5WR79IhG_EAllg&limit=1'
    
    request({ url, json: true}, (error, {body}) =>{
       if(error){
          callback('Não foi possivel connectar ao serviço de localização!', undefined)
       } else if(body.features.length === 0){
          callback('Não foi possivel encontrar a localização, tente outra', undefined)
       } else{
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
          })
       }
    })
 }

 module.exports = geocode