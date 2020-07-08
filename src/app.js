const path = require('path')
const express = require('express')
const hbs = require('hbs')

//Dependencias internas
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000;

// definição de path para o express config
const diretorioPublico = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setando os handlebars eng e as localizacoes da views
// mudando o default da view para a pasta templates
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

// setando diretorio estatico para o servidor
app.use(express.static(diretorioPublico))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Clima App',
        name: 'Thiago Santos'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Sobre mim',
        name: 'Thiago Santos'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Ajuda',
        helpText: 'Caso tenha algum problema por favor informar',
        name: 'Thiago Santos'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address)
        return res.send({ error: 'É necessário informar um endereço!' })    

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error)
            return res.send({ error })
      
        forecast(latitude, longitude, (error, forecastdata) => {      
            if(error)
                return res.send({ error })

            res.send({
                forecast: forecastdata,       
                location,
                address: req.query.address
            })
        })        
    })     
})


app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: '404',
        name: 'Thiago Santos',
        errorText: 'Artigo de ajuda não encontrado'        
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title: '404',
        name: 'Thiago Santos',
        errorText: 'Pagina não encontrada'        
    })
})

app.listen(port, ()=>{
    console.log('Server está no ar na porta ' + port)
})