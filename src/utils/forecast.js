const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/cba4de4061cfcadff8e8a459302c4546/'+ latitude+ ',' + longitude +'?units=si&lang=pt'

    request({ url, json: true}, (error, {body}) =>{
        if(error){
           callback('Não foi possivel connectar ao serviço de coordenada!', undefined)
        } else if(body.error){
           callback('Não foi possivel encontrar essa coordenada, tente outra', undefined)
        } else{        
            callback(undefined, body.daily.data[0].summary + ' Está atualmente ' + body.currently.temperature + ' graus. Tem uma chance de ' + body.currently.precipProbability + '% de chuva.')           
        }
     })
}

module.exports = forecast
